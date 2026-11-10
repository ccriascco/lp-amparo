import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

/**
 * Esfera da IA em partículas 3D (seção 7). Carregada com `React.lazy` pela seção, só perto da tela.
 * - ~7.000 pontos (3.000 no celular) em distribuição de Fibonacci, num ShaderMaterial: deslocamento
 *   por ruído simplex 3D que muda com o tempo ("respira" e faz ondas), tamanho com atenuação pela
 *   distância, cor de vinho (pontos mais externos) a rosé (internos), os de trás mais apagados.
 * - 3 anéis finos em ângulos diferentes, cada um com um "cometa" percorrendo o anel.
 * - Rotação contínua no Y (40s por volta) + inclinação suave seguindo o mouse (máx. 8°).
 * `active=false` pausa o render (frameloop "demand" sem invalidar).
 */

const VINHO = new THREE.Color('#954B6E')
const ROSE = new THREE.Color('#E4D3D9')
const VINHO_VIVO = new THREE.Color('#B8467A')
const TILT = (8 * Math.PI) / 180

// Ruído simplex 3D (Ashima Arts / Stefan Gustavson, MIT).
const SNOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`

const POINTS_VERT = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
attribute float aRandom;
varying float vMix;
varying float vAlpha;
${SNOISE}
void main() {
  vec3 p = position;
  float n = snoise(p * 1.5 + vec3(0.0, 0.0, uTime * 0.22));
  float n2 = snoise(p * 3.4 - vec3(uTime * 0.14));
  float d = n * 0.085 + n2 * 0.03;
  vec4 mv = modelViewMatrix * vec4(p * (1.0 + d), 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPixelRatio * (0.7 + aRandom * 0.6) / -mv.z;
  vMix = smoothstep(-0.07, 0.09, d);
  float center = (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).z;
  vAlpha = mix(0.16, 1.0, smoothstep(-0.95, 0.85, mv.z - center));
}`

const POINTS_FRAG = /* glsl */ `
uniform vec3 uOuter;
uniform vec3 uInner;
varying float vMix;
varying float vAlpha;
void main() {
  float r = length(gl_PointCoord - 0.5);
  if (r > 0.5) discard;
  float a = smoothstep(0.5, 0.18, r) * vAlpha;
  gl_FragColor = vec4(mix(uInner, uOuter, vMix), a);
}`

const RING_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

/** Gradiente ao longo do anel: base vinho suave + cometa (cabeça forte, cauda que some). */
const RING_FRAG = /* glsl */ `
uniform float uTime;
uniform float uSpeed;
uniform float uOffset;
uniform vec3 uBase;
uniform vec3 uGlow;
uniform float uBaseAlpha;
uniform float uGlowAlpha;
varying vec2 vUv;
void main() {
  float t = fract(vUv.x - uTime * uSpeed + uOffset);
  float tail = smoothstep(0.28, 0.0, t) * smoothstep(0.0, 0.006, t);
  float g = pow(tail, 2.2);
  gl_FragColor = vec4(mix(uBase, uGlow, g), uBaseAlpha + g * uGlowAlpha);
}`

function fibonacciSphere(count: number) {
  const pos = new Float32Array(count * 3)
  const rnd = new Float32Array(count)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = golden * i
    pos.set([Math.cos(th) * r, y, Math.sin(th) * r], i * 3)
    rnd[i] = Math.random()
  }
  return { pos, rnd }
}

function Points({ count }: { count: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const dpr = useThree((s) => s.viewport.dpr)
  const geo = useMemo(() => {
    const { pos, rnd } = fibonacciSphere(count)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aRandom', new THREE.BufferAttribute(rnd, 1))
    return g
  }, [count])
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: count > 4000 ? 13 : 15 },
      uPixelRatio: { value: 1 },
      uOuter: { value: VINHO },
      uInner: { value: ROSE },
    }),
    [count],
  )
  useEffect(() => () => geo.dispose(), [geo])
  useFrame((_, dt) => {
    if (!mat.current) return
    mat.current.uniforms.uTime.value += dt
    mat.current.uniforms.uPixelRatio.value = dpr
  })
  return (
    <points geometry={geo}>
      <shaderMaterial
        ref={mat}
        vertexShader={POINTS_VERT}
        fragmentShader={POINTS_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  )
}

class CircleCurve extends THREE.Curve<THREE.Vector3> {
  r: number
  constructor(r: number) {
    super()
    this.r = r
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const a = t * Math.PI * 2
    return target.set(Math.cos(a) * this.r, 0, Math.sin(a) * this.r)
  }
}

const RINGS = [
  { r: 1.24, rot: [1.18, 0, 0.32], speed: 0.11, offset: 0 },
  { r: 1.33, rot: [1.02, 0.55, -0.55], speed: -0.075, offset: 0.4 },
  { r: 1.42, rot: [1.5, -0.35, 0.95], speed: 0.15, offset: 0.7 },
] as const

function Ring({ r, rot, speed, offset }: (typeof RINGS)[number]) {
  const core = useRef<THREE.ShaderMaterial>(null)
  const halo = useRef<THREE.ShaderMaterial>(null)
  const [coreGeo, haloGeo] = useMemo(() => {
    const c = new CircleCurve(r)
    return [
      new THREE.TubeGeometry(c, 320, 0.0055, 6, true),
      new THREE.TubeGeometry(c, 320, 0.026, 8, true),
    ]
  }, [r])
  const mk = (base: THREE.Color, glow: THREE.Color, baseAlpha: number, glowAlpha: number) => ({
    uTime: { value: 0 },
    uSpeed: { value: speed },
    uOffset: { value: offset },
    uBase: { value: base },
    uGlow: { value: glow },
    uBaseAlpha: { value: baseAlpha },
    uGlowAlpha: { value: glowAlpha },
  })
  const coreU = useMemo(() => mk(VINHO, VINHO_VIVO, 0.22, 0.78), []) // eslint-disable-line react-hooks/exhaustive-deps
  const haloU = useMemo(() => mk(ROSE, ROSE, 0, 0.55), []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(
    () => () => {
      coreGeo.dispose()
      haloGeo.dispose()
    },
    [coreGeo, haloGeo],
  )
  useFrame((_, dt) => {
    if (core.current) core.current.uniforms.uTime.value += dt
    if (halo.current) halo.current.uniforms.uTime.value += dt
  })
  return (
    <group rotation={rot as unknown as THREE.Euler}>
      <mesh geometry={haloGeo}>
        <shaderMaterial
          ref={halo}
          vertexShader={RING_VERT}
          fragmentShader={RING_FRAG}
          uniforms={haloU}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={coreGeo}>
        <shaderMaterial
          ref={core}
          vertexShader={RING_VERT}
          fragmentShader={RING_FRAG}
          uniforms={coreU}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function Scene({ count }: { count: number }) {
  const spin = useRef<THREE.Group>(null)
  const tilt = useRef<THREE.Group>(null)
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.y += (dt * Math.PI * 2) / 40
    if (tilt.current) {
      const k = 1 - Math.exp(-dt * 3)
      tilt.current.rotation.x += (target.current.y * TILT - tilt.current.rotation.x) * k
      tilt.current.rotation.y += (target.current.x * TILT - tilt.current.rotation.y) * k
    }
  })

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <Points count={count} />
      </group>
      {RINGS.map((r, i) => (
        <Ring key={i} {...r} />
      ))}
    </group>
  )
}

export default function AiSphere({
  active,
  count,
  className,
}: {
  active: boolean
  count: number
  className?: string
}) {
  return (
    <Canvas
      className={className}
      frameloop={active ? 'always' : 'demand'}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 40 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      aria-hidden
    >
      <Scene count={count} />
    </Canvas>
  )
}
