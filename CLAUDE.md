# CLAUDE.md — Landing page do Amparo

Você vai preparar o ambiente e construir **toda a parte visual** da landing page do **Amparo**, um app discreto de proteção para mulheres em situação de violência doméstica (TCC de Ciência da Computação, UNIRP). O objetivo da página é levar a visitante a **acessar o app**, que roda como web app na Netlify.

## Fontes de verdade (ler antes de qualquer código)
1. **`DESIGN.md`**: design system, tokens, componentes, movimento (GSAP) e wireframes. Siga à risca.
2. **`COPY.md`**: estratégia e **todos** os textos. Não invente textos, números, depoimentos nem funcionalidades.
3. **`assets/`**: logos (`assets/brand/`), telas do protótipo do app (`assets/app-screens/`) e referências visuais (`assets/referencias/`). **Abra as telas** para replicar fielmente a calculadora e a tela inicial, e **abra as referências** para calibrar o acabamento (fotografia tingida, vidro, anéis, parallax). As referências servem só para a parte visual e de composição: **não** tire delas cores nem fontes.

Se algo não estiver definido nesses arquivos, escolha a opção mais simples e coerente com eles e registre a decisão em `NOTES.md`.

---

## Fase 0 — Skills
Instale as skills e **leia** as que forem relevantes antes de começar cada fase:
```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
npx skills add https://github.com/leonxlnx/taste-skill --skill design-taste-frontend
npx skills add https://github.com/coreyhaines31/marketingskills --skill copywriting
npx skills add https://github.com/remotion-dev/skills --skill remotion-best-practices
npx skills add https://uizze.sh/
```
- Use `frontend-design` e `design-taste-frontend` para o acabamento visual, **sem contrariar o `DESIGN.md`**. Se houver conflito, o `DESIGN.md` vence.
- Use `web-design-guidelines` na revisão final (Fase 5).
- Use `copywriting` só para microcopy que faltar. Os textos de `COPY.md` não devem ser reescritos.
- Se alguma instalação falhar, siga sem ela e anote em `NOTES.md`.

## Fase 1 — Ambiente
A pasta do projeto já existe. **Primeiro inspecione o que há nela** (`ls -la`, `package.json`).
- Se estiver vazia (ou só com os arquivos deste kit): crie o projeto **no próprio diretório**, com `npm create vite@latest . -- --template react-ts`.
- Se já houver um projeto React, aproveite-o e só adicione o que faltar.

Dependências:
```bash
npm i gsap @gsap/react lenis lucide-react clsx
npm i @fontsource/quicksand @fontsource/nunito-sans
npm i -D tailwindcss @tailwindcss/vite prettier prettier-plugin-tailwindcss
```
- Tailwind **v4** via plugin do Vite (`@tailwindcss/vite` em `vite.config.ts`). Cole o bloco `@theme` do `DESIGN.md` §3.5 em `src/index.css`.
- Importe as fontes com `@fontsource` (Quicksand 500/600/700 e Nunito Sans 400/600/700). **Só essas duas**, que são as do app.
- Crie `public/images/` com os slots do `DESIGN.md` §8. Se as fotos ainda não existirem, use os placeholders descritos lá, com os mesmos nomes de arquivo, para a troca ser só substituir os arquivos.
- `.env.example` com `VITE_APP_URL=https://SEU-APP.netlify.app`. Todo CTA "Acessar o Amparo" usa `import.meta.env.VITE_APP_URL`.
- `netlify.toml` para publicar a própria landing (`command = "npm run build"`, `publish = "dist"`).
- Mova `assets/brand/*` para `src/assets/brand/` e `assets/app-screens/*` para `src/assets/app-screens/`.
- Crie o favicon a partir de `amparo-simbolo-vinho.png` e, se possível, vetorize o símbolo em `src/assets/brand/amparo-simbolo.svg` (gota + círculo + curva, cor `#954B6E`).

## Estrutura sugerida
```
src/
  main.tsx, App.tsx, index.css
  lib/        gsap.ts (registro de plugins + Lenis), useReducedMotion.ts, format.ts (pt-BR)
  content/    copy.ts  ← textos de COPY.md tipados (uma única fonte no código)
  components/
    ui/       Button, Chip, PhoneFrame, FloatCard, StatItem, Accordion, Marquee, EmergencyBar
    phone/    CalculatorScreen, HomeScreen, AlertScreen, AppGridScreen, MultitaskScreen
    demo/     SOSDemo, HashScramble, RiskLevels, InteractiveCalculator
  sections/   Header, Hero, Contexto, Dores, MarqueeBand, Disfarce, Recursos, Sos, Cofre,
              Rede, Risco, Direitos, Seguranca, Comecar, Ajudar, Projeto, Faq, CtaFinal, Footer
```

## Fase 2 — Fundações
Tokens, fontes, `Button`, `Chip`, `PhoneFrame`, `CalculatorScreen`, `HomeScreen` e `Header`. Monte uma página temporária `/#kit` que mostre todos os componentes. Confira visualmente que `CalculatorScreen` e `HomeScreen` estão fiéis às telas em `assets/app-screens/`.

## Fase 3 — Seções (na ordem do `COPY.md`)
Construa todas as seções de forma estática e responsiva (mobile primeiro, testando em 360px, 768px e 1280px). Só depois parta para o movimento.

## Fase 4 — Movimento (GSAP)
Siga o `DESIGN.md` §7, nesta ordem de prioridade:
0. **Base smooth:** Lenis + ScrollTrigger (§7, bloco `src/lib/gsap.ts`) e `TintedPhoto`.
1. **Hero "Desbloqueio"** (§7.1). É a assinatura da página e precisa estar impecável.
2. Pin do `#disfarce` + calculadora interativa (§7.2).
3. **Parallax e revelações por máscara** (§7.9), exatamente nos elementos da tabela.
4. `SOSDemo` (§6.11), `HashScramble`, `RiskLevels`, contadores, rede se desenhando, linha de progresso, marquee e `CircularBadge`.
5. Header que some e volta ao rolar.

Antes de encerrar a fase, cheque a performance (§7.10). A página precisa ser *smooth* e não travar, inclusive num celular médio.

Regras: `useGSAP` com `scope`, `gsap.matchMedia()` para desktop, mobile e movimento reduzido, e `ScrollTrigger.refresh()` após o carregamento das fontes. **Não** adicione animações que não estejam no `DESIGN.md`.

## Fase 5 — Revisão e qualidade
- Rode `npm run build` sem erros nem warnings de TypeScript.
- Passe pelos critérios do `DESIGN.md` §10 e pela lista "O que não fazer" (§11).
- Aplique a skill `web-design-guidelines` e corrija o que ela apontar.
- Revise todos os textos contra o `COPY.md`, palavra por palavra, incluindo números (`1.492`, `64,3%`, `8 em 10`, `101.656`, `97%`, `99%`, `10.000`) e a ressalva sobre dados sintéticos.
- Se possível, tire screenshots (desktop e mobile) de cada seção, compare com os wireframes e ajuste.

## Fase 6 (opcional) — Vídeo com Remotion
Só depois da landing pronta, e usando a skill `remotion-best-practices`:
- Projeto separado em `video/` (não misturar dependências com a landing).
- Composição **1080×1920, 30fps, ~25s**: "O Amparo em 25 segundos".
  1. Calculadora preta, digita `1907` e `=` (com o mesmo desbloqueio do hero).
  2. "Um toque longo. Nenhum barulho.": SOS com o anel enchendo, depois "Alerta enviado".
  3. "O que você guarda continua sendo verdade.": card "Prova verificada" com o hash.
  4. "Quem cuida de você, por perto quando precisar.": rede de guardiãs.
  5. Fecho: logo + "Você não está sozinha."
- Reaproveite os tokens e, se der, os componentes de `src/components/phone`.
- Renderize em `public/video/amparo-25s.mp4` (+ poster `.jpg`) e insira na seção `#recursos`, abaixo do H2, como vídeo `muted playsinline` com botão de play (sem autoplay com som).

## Não negociáveis
- **Cores e tipografia são as do design system do app** (`DESIGN.md` §3.1 e §4). Não criar cores nem usar outras fontes. As referências visuais valem só para composição, fotografia, vidro e movimento.
- Vermelho `#C62828` **só** no SOS.
- Nenhuma imagem de violência. Nenhuma prova social inventada. Nenhum botão de App Store ou Google Play.
- O 190 e o 180 sempre visíveis no FAQ e no rodapé.
- Funciona em 360px, com teclado e com `prefers-reduced-motion`.
- Textos só do `COPY.md`.

## Comandos
```bash
npm run dev      # desenvolvimento
npm run build    # build de produção
npm run preview  # testar o build
```
