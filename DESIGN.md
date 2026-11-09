# Amparo — Design System da Landing Page

> Versão web/marketing do design system do app Amparo (criado no Claude Design). Os tokens de marca são herdados do app; o que é novo aqui existe porque a landing precisa de mais escala, mais atmosfera e de movimento.
>
> Estrutura: **1. README da marca** → **2. Conceito** → **3. Tokens** → **4. Tipografia** → **5. Layout e grid** → **6. Componentes** → **7. Movimento (GSAP)** → **8. Imagens e assets** → **9. Seções (wireframes)** → **10. Acessibilidade e qualidade** → **11. O que não fazer**
>
> Textos: sempre de `COPY.md`. Este arquivo define **como** tudo aparece.

---

## 1. README da marca

**Amparo** é um app discreto de proteção para mulheres em situação de violência doméstica. Lema: **"Você não está sozinha."**

Personalidade: **acolhedora, firme e reservada.** Fala baixo, mas não é frágil. É o abraço de alguém de confiança, não um alarme.

O símbolo é uma **gota** que envolve uma **figura acolhida** (círculo + curva). Ele inspira três recursos da página:
- **Curvas que envolvem.** Containers com raios generosos e formas que abraçam o conteúdo.
- **Camadas.** Coisas que aparecem por trás de outras, como o app por trás da calculadora.
- **Círculo central.** O anel do SOS, o halo atrás do celular e os círculos de linha fina.

---

## 2. Conceito visual: **"Por fora, uma calculadora. Por dentro, amparo."**

A página encena o recurso mais característico do app, o **Modo Disfarce**. Tudo nasce do contraste entre duas camadas:

| Camada | Visual | Onde aparece |
|---|---|---|
| **Por fora** | Neutra, escura, mecânica: o preto e o cinza da calculadora, teclas redondas, números | Início do hero, seção `#disfarce` |
| **Por dentro** | Quente, luminosa e humana: o vinho da marca, fotografia com luz natural, brancos com um leve véu de vinho | Todo o resto |

**O momento memorável (o único lugar onde a página "grita"):** no hero, um celular mostra uma calculadora preta. Ela digita `1907`, toca `=`, e a partir da tecla "=" um brilho vinho suave se espalha em onda pelo fundo branco e os outros celulares se abrem em leque, revelando o app. Todo o resto da página é calmo e disciplinado para que esse momento seja lembrado.

### Direção visual: **fintech moderna, com calor humano**
O cliente escolheu 5 referências, e **só elas orientam a composição** (cores e fontes continuam sendo as do app):

| Ref. | Nome | O que define na landing |
|---|---|---|
| **11** | Task.io | **O hero inteiro:** fundo claro, texto centralizado, 3 celulares em leque saindo da base, pílulas inclinadas, cartões flutuantes, círculos de ícone e anéis concêntricos ao fundo |
| **03** | Finexa | **A linguagem "fintech" das seções:** muito branco, **fragmentos reais da interface do app** como ilustração (cartões de UI flutuando ao redor do celular e dentro dos cartões), bento que mistura foto, número e destaque, passos em cartões com mini-UI dentro, FAQ limpo |
| **01** | Curely | **Organização dos recursos:** bento com um **cartão alto central com o celular** e cartões de recurso ao redor, gradiente suave nos fundos, faixa de CTA em gradiente vinho |
| **08** | BeautyCenter | **Fotografia e acabamento:** fotos tingidas no vinho do app, **vidro** sobre foto, **fotos com topo em arco ou pílula**, selo circular girando |
| **06** | Moonsync | **Tom das fotos:** mulher com celular, luz natural e sombras, serena e digna; espaço negativo generoso |

**O que faz a página parecer "fintech moderna" (regras de acabamento):**
- **Base branca** (`branco`), com respiros grandes. `superficie` só em painéis pontuais. Uma única seção escura (`#disfarce`), que se justifica pelo conceito da calculadora.
- **O produto é a ilustração.** Em cada seção de recurso aparece um pedaço real da interface do app ("Alerta enviado", "Prova verificada", lista de guardiãs, card de leitura de risco), feito em código, nítido, com `shadow-float`. Nada de ícones genéricos gigantes ou ilustrações abstratas.
- **Cartões precisos:** fundo branco, borda 1px `borda`, raio da escala (§3.2). Sem sombra quando estão "no chão"; com `shadow-float` quando "flutuam" sobre outro elemento.
- **Números com cara de produto:** Quicksand com `tabular-nums`, grandes, dentro de cartões (como o "450M+" da Finexa).
- **Fotografia como contraponto humano:** cada foto aparece recortada (arco, pílula ou cartão), tingida e, quando possível, com um fragmento de UI sobreposto, unindo pessoa e produto.

**Saíram da direção** (vinham de referências não escolhidas): faixa marquee, números com fio no topo, wordmark gigante no rodapé, carrossel de cartões com foto e anéis sobre foto escura.

**Como isso conversa com o conceito:** o hero abre limpo, só com o texto e um celular mostrando a calculadora preta (a camada "por fora"). Quando ela destrava no "=", um **brilho vinho suave se espalha em onda pelo fundo branco**, os anéis se desenham e os outros celulares abrem em leque, revelando o app (a camada "por dentro").

---

## 3. Tokens

### 3.1 Cores

> **Regra:** as cores são **exclusivamente as do design system do app** (criado no Claude Design). A landing não cria matizes novos. Variação só por **opacidade** dessas cores e pelo **gradiente vinho → vinho profundo**, que já é o do cabeçalho do app.

**Marca (documentadas no artigo do TCC):**
| Token | Hex | Uso |
|---|---|---|
| `vinho` | `#954B6E` | Cor principal: botões, links, ícones, destaques |
| `vinho-profundo` | `#4B2A3F` | Seções escuras, rodapé, fim do gradiente dos cabeçalhos |
| `sos` | `#C62828` | **Exclusivo do botão SOS e do anel do SOS** |
| `confirma` | `#2E7D6B` | Confirmações: "Prova verificada", "Confirmou", checks |

**Neutros do app** (amostrados das telas do protótipo; se o design system do Claude Design tiver valores oficiais diferentes, **use os oficiais**):
| Token | Hex | Uso no app → na landing |
|---|---|---|
| `branco` | `#FFFFFF` | Fundo das telas → fundo da página e dos cartões |
| `superficie` | `#F3EDEF` | Círculos dos ícones e fundos suaves → os mesmos usos + painéis de seção |
| `borda` | `#E4D3D9` | Contorno de inputs e cartões → bordas e divisórias |
| `texto` | `#111111` | Títulos → títulos e texto principal |
| `texto-secundario` | `#5D5D5D` | Descrições → texto secundário |

**Calculadora do Modo Disfarce** (cores da própria tela de calculadora do app, só dentro dela):
`#000000` (fundo), `#333333` (números), `#A5A5A5` (AC, +/−, %), `#FF9F0A` (operações).

**Gradiente e opacidades permitidas:**
```css
--grad-vinho: linear-gradient(135deg, #954B6E 0%, #4B2A3F 100%);       /* = header do app */
--grad-suave: radial-gradient(70% 90% at 80% 10%, rgb(149 75 110 / .14) 0%, transparent 60%),
              radial-gradient(60% 80% at 10% 90%, rgb(75 42 63 / .08) 0%, transparent 60%),
              #FFFFFF;                                                   /* fundos claros com atmosfera */
```
Opacidades usadas: `vinho/10`, `vinho/25`, `vinho-profundo/60`, `vinho-profundo/85`, `white/14`, `white/28`, `white/40`, `white/80`.

Contraste verificado (WCAG AA):
- `texto` sobre `branco`: ≈ 18,9:1 ✓
- `texto-secundario` sobre `branco`: ≈ 6,6:1 ✓
- branco sobre `vinho`: ≈ 6,0:1 ✓ (botões)
- `vinho` sobre `branco`: ≈ 6,0:1 ✓ (links)
- `white/80` sobre `vinho-profundo`: ≈ 9:1 ✓
- `confirma` sobre branco: ≈ 4,9:1 ✓
- branco sobre `sos`: ≈ 5,6:1 ✓

### 3.2 Raios (hierarquia, não um valor único)
| Token | Valor | Uso |
|---|---|---|
| `r-shell` | `40px` (mobile `28px`) | Containers de seção recuados (hero, disfarce, CTA final) |
| `r-card-lg` | `28px` | Cartões grandes do bento, mockups |
| `r-card` | `20px` | Cartões comuns, FAQ |
| `r-chip` | `9999px` | Botões, chips, pílulas, inputs (igual ao app) |
| `r-phone` | `48px` | Moldura do celular |

### 3.3 Espaçamento
Base 4px. Escala do Tailwind padrão. Ritmo vertical entre seções: `py-24 md:py-32 lg:py-40`. Container recuado: `mx-3 md:mx-4` das bordas da viewport.

### 3.4 Sombras
Poucas e quentes (nunca cinza neutro):
```css
--shadow-float: 0 24px 48px -16px rgb(75 42 63 / 0.22), 0 4px 12px -4px rgb(75 42 63 / 0.10);
--shadow-phone: 0 50px 100px -30px rgb(75 42 63 / 0.45);
--shadow-sos:   0 0 0 12px rgb(198 40 40 / 0.12), 0 0 0 28px rgb(198 40 40 / 0.06);
```
Cartões em fundo claro usam **borda `borda` + sem sombra**. Sombra é reservada para o que **flutua** (cartões ao redor do celular e o próprio celular).

### 3.5 Tailwind v4: bloco `@theme` (colar em `src/index.css`)
```css
@import "tailwindcss";

@theme {
  --font-display: "Quicksand", ui-rounded, system-ui, sans-serif;
  --font-sans: "Nunito Sans", system-ui, sans-serif;

  --color-vinho: #954B6E;
  --color-vinho-profundo: #4B2A3F;
  --color-sos: #C62828;
  --color-confirma: #2E7D6B;

  --color-branco: #FFFFFF;
  --color-superficie: #F3EDEF;
  --color-borda: #E4D3D9;
  --color-texto: #111111;
  --color-texto-secundario: #5D5D5D;

  --color-calc-preto: #000000; --color-calc-cinza: #333333;
  --color-calc-claro: #A5A5A5; --color-calc-laranja: #FF9F0A;

  --radius-shell: 2.5rem; --radius-card-lg: 1.75rem; --radius-card: 1.25rem; --radius-phone: 3rem;

  --shadow-float: 0 24px 48px -16px rgb(75 42 63 / 0.22), 0 4px 12px -4px rgb(75 42 63 / 0.10);
  --shadow-phone: 0 50px 100px -30px rgb(75 42 63 / 0.45);

  --ease-amparo: cubic-bezier(0.22, 1, 0.36, 1);
}
```
Opacidades com a sintaxe do Tailwind: `bg-vinho/10`, `text-white/80`, `bg-vinho-profundo/85`.

---

## 4. Tipografia

Duas famílias, **as mesmas do app**, com papéis bem distintos:

| Família | Papel | Pesos |
|---|---|---|
| **Quicksand** (Google Fonts) | Display: H1, H2, números grandes. A geometria arredondada ecoa o logotipo | 500, 600, 700 |
| **Nunito Sans** (Google Fonts) | Texto, interface, botões, legendas | 400, 600, 700 |

**Sem fontes novas.** As referências misturam sans com serifa itálica, mas a tipografia é a do app e não muda. A personalidade vem da **escala**: Quicksand muito grande, com tracking negativo, vira forma. Quando um título quebra em duas linhas (ex.: `Você não está` / `sozinha.`), as duas linhas usam a mesma fonte, o mesmo peso e a mesma cor.

### Escala (base 18px, razão ~1,25 no texto e saltos maiores no display)
| Token | Família | Tamanho (mobile → desktop) | Altura de linha | Tracking | Peso |
|---|---|---|---|---|---|
| `display-xl` (H1 do hero) | Quicksand | `clamp(3rem, 8vw, 7.5rem)` | 0.95 | -0.035em | 600 |
| `display-l` (H2) | Quicksand | `clamp(2.25rem, 4.5vw, 4rem)` | 1.02 | -0.03em | 600 |
| `display-m` (H3, títulos de cartão grande) | Quicksand | `clamp(1.5rem, 2.2vw, 2rem)` | 1.1 | -0.02em | 600 |
| `numero` (estatísticas) | Quicksand | `clamp(3rem, 6vw, 5.5rem)` | 1 | -0.04em | 500, tabular-nums |
| `lead` | Nunito Sans | `clamp(1.125rem, 1.4vw, 1.3125rem)` | 1.55 | 0 | 400 |
| `body` | Nunito Sans | `1.0625rem` (17px) | 1.6 | 0 | 400 |
| `small` | Nunito Sans | `0.9375rem` | 1.5 | 0 | 400 |
| `caption` | Nunito Sans | `0.8125rem` | 1.45 | 0.01em | 600 |
| `botao` | Nunito Sans | `1rem` | 1 | 0 | 700 |

Regras:
- Títulos em **sentence case**. Nada de caixa-alta em rótulos.
- **Não destacar palavras** do título com outra cor, outro peso ou itálico.
- Largura de leitura: parágrafos com `max-w-[62ch]`, lead com `max-w-[52ch]`.
- H1 do hero quebra em duas linhas controladas: `Você não está` / `sozinha.`
- Carregar as fontes com `<link rel="preconnect">` + `display=swap`, ou com `@fontsource` (preferível, sem dependência de rede externa).

---

## 5. Layout e grid

- **Container:** `max-w-[1280px] mx-auto px-5 md:px-8`.
- **Grid:** 12 colunas no desktop, 4 no mobile, gap `24px`.
- **Alinhamento:** **à esquerda** por padrão. Centralizado só no CTA final e nos títulos da seção de recursos.
- **Shells:** hero, `#disfarce` e o CTA final ficam dentro de um container **recuado das bordas** (`mx-3 md:mx-4`) com `r-shell`. É assim que a página "abraça" o conteúdo.
- **Breakpoints:** `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Tudo precisa funcionar em **360px de largura**: o público acessa principalmente pelo celular.
- Ordem das seções: igual à de `COPY.md`.

---

## 6. Componentes

### 6.1 `Button`
| Variante | Visual |
|---|---|
| `primary` | Fundo `vinho`, texto branco, `rounded-full`, `h-14 px-7` (mobile `h-12`). Hover: `vinho-profundo`. Active: `scale(0.98)` |
| `secondary` | Borda 1.5px `vinho`, texto `vinho`, fundo transparente. Hover: fundo `superficie` |
| `on-dark` | Fundo branco, texto `vinho-profundo`. Para a seção escura e o CTA final |
| `ghost` | Só texto `vinho` com sublinhado de 1px que cresce no hover |

- Área de toque mínima de **44×44px** (regra do app).
- Ícone opcional **à esquerda** (ex.: celular). **Não** anexar "→" no texto.
- O CTA principal é sempre `primary` com o texto **"Acessar o Amparo"**, `href={APP_URL}`, `target="_blank" rel="noopener"`.

### 6.2 `Header`
- Pílula flutuante: `fixed top-4`, `max-w-[1180px]`, `rounded-full`. Sempre `.glass-light` com logo vinho (o hero é claro). Sobre as seções escuras (`#disfarce`, rodapé), troca para `.glass` com logo branco, num crossfade de 0.3s via ScrollTrigger.
- Esquerda: logo horizontal vinho, altura 28px. Centro: links (desktop). Direita: `Button primary` compacto.
- Ao rolar para baixo some (`yPercent: -150`); ao rolar para cima volta. Sobre a seção escura, inverte para fundo `vinho-profundo/60` com logo branco.
- Mobile: logo + botão de menu (pílula 44px), abrindo uma folha de tela cheia com os links em `display-m`.

### 6.3 `PhoneFrame`
- Moldura em CSS: `r-phone`, borda 10px `#1A1016`, ilha dinâmica, `shadow-phone`, proporção 9:19,5.
- Recebe `children` (uma tela codada) **ou** `src` (uma imagem de `assets/app-screens/`).
- **Telas codadas em JSX (obrigatório):** `CalculatorScreen` e `HomeScreen`, porque precisam animar. As demais podem ser imagens.

### 6.4 `CalculatorScreen`
Réplica fiel da calculadora do app (ver `assets/app-screens/modo-disfarce-calculadora.png`): fundo preto, display à direita em fonte fina e grande, teclas circulares (`AC`, `+/−`, `%` em cinza claro; números em cinza escuro; operações em laranja). Tem dois modos:
- `mode="auto"`: no hero, a timeline do GSAP "pressiona" as teclas.
- `mode="interactive"`: em `#disfarce`, funciona de verdade (soma, subtração, multiplicação e divisão). Digitar `1907` e `=` dispara `onUnlock()`.

### 6.5 `HomeScreen`
Réplica da tela inicial do app: header com gradiente `--grad-vinho`, "Olá, Marina", "Como podemos te ajudar hoje?", barras dos últimos 7 dias, "Está precisando de ajuda?", botão SOS vermelho com halo e ações rápidas (Registrar prova, Adicionar guardião, Ver minhas ocorrências, Delegacias próximas). Ícones: **lucide-react** (`Camera`, `UserPlus`, `FolderLock`, `MapPin`, `TriangleAlert`).

### 6.6 `FloatCard`
Cartão flutuante ao redor do celular: fundo branco, `r-card`, `shadow-float`, `p-4`, ícone num círculo de 36px com fundo `superficie` (ou `confirma` a 12% para confirmações). Conteúdo real, exemplos:
- ✓ **Alerta enviado** · Sua localização foi compartilhada
- 🛡 **Prova verificada** · Arquivo sem alterações desde 14/03, 21:47
- **Ana Beatriz** · Confirmou · 12:31 (avatar)

No desktop, flutuação lenta (`y ±6px`, 4–6s, `yoyo`). Com movimento reduzido: estático. No mobile: no máximo 2 cartões, menores.

### 6.7 `Chip` / `Pill`
`rounded-full`, `px-3.5 py-1.5`, `caption`. Variantes: `soft` (fundo `superficie`, texto `vinho-profundo`), `glass` (fundo `white/50`, `backdrop-blur`, borda `white/60`, sobre foto ou gradiente) e `outline`. Os rótulos dos pilares ("Proteger", "Documentar", "Conectar", "Transformar") usam `soft` com um ponto de 6px `vinho` à esquerda.

### 6.8 `StatCard`
Cartão de número (ref. Finexa): fundo `branco`, borda `borda`, `r-card-lg`, `p-6 md:p-8`, altura mínima de 220px. Número em `numero` (Quicksand 500, `tabular-nums`, cor `texto`) no topo e rótulo em `small` `texto-secundario` com `max-w-[24ch]` na base, nas pontas opostas do cartão.
- **Variante `destaque`:** fundo `--grad-vinho`, texto branco. Só uma por grupo.
- **Variante `foto`:** `TintedPhoto` de fundo, número e rótulo em branco na base.

### 6.9 `PainCard` (dores)
**Não** é um cartão com sombra. É uma linha de lista: ícone lucide num círculo 44px `superficie`, título `display-m` menor (`1.375rem`) e texto `body`, separados por divisória `borda`. Layout em 2 colunas no desktop, com a primeira dor ocupando a largura toda.

### 6.10 `BentoGrid` (recursos)
Estrutura da ref. Curely: **um cartão alto central com o celular** e os recursos ao redor.
```
desktop (12 col)
┌────────────────┬──────────────────┬────────────────┐
│ SOS silencioso │                  │ Cofre de provas│
│ [mini SOS+anel]│   CARTÃO ALTO    │ [selo + hash]  │
├────────────────┤  (4 col, 2 lin)  ├────────────────┤
│ Rede de apoio  │  fundo superficie│ Leitura de     │
│ [3 avatares ✓] │  + PhoneFrame    │ risco [card]   │
│                │  com HomeScreen  │                │
├────────────────┴────────┬─────────┴────────────────┤
│ Seus direitos (6 col)   │ Modo Disfarce (6) preto  │
└─────────────────────────┴──────────────────────────┘
mobile: cartão do celular primeiro, depois os 6 recursos em 1 coluna
```
- Cartões em `branco` com borda `borda` e `r-card-lg`. O cartão central tem fundo `superficie`, com o celular saindo pela base (cortado, como na Curely).
- O cartão do **Modo Disfarce** é **preto**, como a calculadora: as duas camadas aparecem até aqui.
- Cada cartão traz: ícone num círculo `vinho` de 40px (ícone branco), título `display-m` menor (`1.375rem`), uma linha de texto e um **mini fragmento de UI codado** (não imagem). O cartão inteiro é um link âncora para a seção detalhada.

### 6.11 `SOSDemo`
- Botão circular de 160px, `sos-600`, ícone `TriangleAlert` + "SOS" em Quicksand 700 branco, com `--shadow-sos`.
- Anel SVG ao redor (`stroke-dasharray`) que se preenche em **2,5s** enquanto o botão é segurado (`pointerdown`/`pointerup`/`pointerleave`; teclado: `Space`/`Enter` segurado). Soltou antes, o anel volta.
- Completo: o anel fica `confirma-600`, aparece um check e o texto *"Demonstração concluída — nada foi enviado."* (`aria-live="polite"`).
- Vibração `navigator.vibrate?.(30)` ao completar, se existir.

### 6.12 `HashScramble`
Texto `a3f9c2e7 · 8b41d05a · 6ec73912` em **Nunito Sans com `tabular-nums`** (não usar monospace). Ao entrar na tela, os caracteres embaralham (hex aleatório) e fixam da esquerda para a direita em 1,2s. Abaixo, o selo "✓ Prova verificada" em `confirma-600` aparece no final.

### 6.13 `RiskLevels`
Três estados em segmented control (pílula com 3 opções: Baixo / Médio / Alto). O conteúdo da direita troca com crossfade de 250ms e mostra o cartão correspondente da tela do app. Cores dos níveis: **todas em tons vinho** (`vinho/25`, `vinho`, `vinho-profundo`), **nunca semáforo verde/amarelo/vermelho**, porque o vermelho é do SOS e um semáforo assusta. Por padrão o estado avança sozinho a cada 4s até a primeira interação.

### 6.14 `Accordion` (FAQ)
Itens com divisória `borda`, pergunta em `display-m` menor (`1.25rem`) e ícone `+` que gira 45° ao abrir. Altura animada com GSAP (`height: auto`). Usar `<button aria-expanded>` e `aria-controls`.

### 6.15 `EmergencyBar`
Faixa `vinho-profundo`, texto `white/80`, com **190** e **180** em Quicksand 700 branco, como links `tel:`. Aparece acima do rodapé e, em versão compacta, no topo do FAQ.

### 6.16 `Footer`
Fundo `vinho-profundo`, em 3 faixas: (1) logo branco + lema à esquerda, colunas de links à direita; (2) `EmergencyBar`; (3) texto legal + © em `small` `white/60`, separado por uma divisória `white/10`.

### 6.17 `Glass` (superfície de vidro)
Para tudo que fica **sobre fotografia**: header, chips, pílulas e FloatCards sobre a foto, e botões secundários sobre a foto.
```css
.glass      { background: rgb(255 255 255 / .14); border: 1px solid rgb(255 255 255 / .28);
              backdrop-filter: blur(18px) saturate(140%); -webkit-backdrop-filter: blur(18px) saturate(140%); }
.glass-light{ background: rgb(255 255 255 / .72); border: 1px solid rgb(255 255 255 / .6);
              backdrop-filter: blur(20px); }   /* cartões com texto escuro */
.glass-vinho{ background: rgb(75 42 63 / .35); border: 1px solid rgb(255 255 255 / .16);
              backdrop-filter: blur(18px); }   /* menu mobile aberto e EmergencyBar sobre foto */
```
- Texto sobre `.glass`: branco. Sobre `.glass-light`: `texto`.
- Fallback sem `backdrop-filter` (`@supports not`): fundo sólido `vinho-profundo/85`.
- No máximo 4 elementos de vidro visíveis ao mesmo tempo (o blur é caro no mobile).

### 6.18 `TintedPhoto` (tratamento fotográfico)
Toda fotografia da página (seções internas e CTA final) passa pelo **tingimento monocromático no vinho do app**, como na ref. BeautyCenter:
```css
.tinted        { position: relative; isolation: isolate; }
.tinted img    { filter: grayscale(1) contrast(1.05) brightness(1.02); }
.tinted::before{ content:""; position:absolute; inset:0; z-index:1; mix-blend-mode: color;
                 background: linear-gradient(160deg, rgb(149 75 110 / .7) 0%, #954B6E 55%, #4B2A3F 100%); }
.tinted::after { content:""; position:absolute; inset:0; z-index:2; /* legibilidade do texto */
                 background: linear-gradient(90deg, rgb(75 42 63 / .78) 0%, rgb(75 42 63 / .3) 55%, transparent 100%); }
```
- Usado nas fotos das seções internas e do CTA final (o hero não tem foto).
- O gradiente `::after` muda de direção conforme o lado do texto. No mobile ele é vertical (de baixo para cima).
- Mesmo com a foto já tingida na origem, manter o `::before` para garantir uma paleta idêntica entre todas as fotos.

### 6.19 `ConcentricRings`
SVG com 5 círculos concêntricos, `stroke` branco a 12% (sobre foto) ou `vinho` a 25% (sobre fundo claro), espessura 1px, raios crescendo em progressão (1, 1.35, 1.75, 2.2, 2.7 × r). Centro atrás do celular central no hero (ref. Task.io), atrás do botão SOS em `#sos` e atrás do título do CTA final. Movimento: parallax leve (§7.9) e uma "pulsação" única ao completar o SOSDemo (os anéis se expandem 4% e voltam, em sequência).

### 6.20 `CircularBadge`
Selo de 128px (mobile 96px) com o texto *"Você não está sozinha • Você não está sozinha •"* em SVG `textPath` ao redor, Nunito Sans 600, 11px, tracking 0.18em, e o **símbolo da gota** no centro. Fundo `branco` com borda `borda` sobre fundo claro, ou `.glass` sobre foto. Gira 360° em 24s (`repeat: -1`, `ease: none`); com o scroll, a velocidade acelera um pouco (`ScrollTrigger` `onUpdate` → `timeScale` entre 1 e 3, voltando suavemente). Fica no canto inferior esquerdo do hero e no CTA final. Com movimento reduzido: parado.

### 6.21 `PhotoCard` e `ArchPhoto`
- **`PhotoCard`** (ref. BeautyCenter): foto tingida, **topo em pílula** (`border-radius: 999px 999px 28px 28px`), proporção 3:5, overlay escuro na base, título em `display-m` branco, texto curto e um botão-ícone redondo de vidro no canto. Usado em `#direitos`.
- **`ArchPhoto`** (ref. BeautyCenter): foto com o topo em arco (`border-radius: 999px 999px 28px 28px`). Usado em `#rede` (duas mulheres) e `#ajudar`.

---

## 7. Movimento (GSAP)

**Sensação desejada:** *smooth, clean, sem travar.* Scroll amanteigado, parallax em camadas, fotos que se revelam por máscara e textos que sobem por linha. Nada pula, nada pisca, nada atrasa o clique.

**Hierarquia do movimento:**
1. **O momento:** o desbloqueio do hero (§7.1).
2. **A camada de profundidade:** parallax e revelações por máscara durante o scroll (§7.9). É contínuo e sutil, para dar a sensação de "smooth".
3. **Movimento que explica:** pin do disfarce, rede, hash, contadores e linha de progresso.
4. **Respostas a ações:** SOS, calculadora, FAQ, botões.

**Proibido:** o combo genérico "fade + slide-up de 40px em todo cartão". Revelações usam **máscara** (`clip-path` ou `overflow: hidden` + `yPercent`), não opacidade sozinha.

**Stack:** `gsap` + `@gsap/react` (`useGSAP`), plugins `ScrollTrigger`, `SplitText` e `DrawSVGPlugin` (todos gratuitos desde a 3.13). Scroll suave com **Lenis** integrado ao ticker do GSAP:
```ts
// src/lib/gsap.ts
import gsap from "gsap"; import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

export const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
// Âncoras do menu: lenis.scrollTo("#secao", { offset: -96, duration: 1.4 })
// prefers-reduced-motion: não instanciar o Lenis.
```

**Easing e tempos:**
| Nome | Valor | Uso |
|---|---|---|
| `amparo` | `cubic-bezier(0.22,1,0.36,1)` / `"expo.out"` | Entradas e reveals |
| `suave` | `"power2.inOut"` | Pins, crossfades |
| Rápido | 0.25s | Hover, estados |
| Médio | 0.6s | Reveals |
| Longo | 1.2s | Momento do hero |

### 7.1 Hero: "Desbloqueio" (assinatura da página)
Timeline no carregamento, ~3,6s no total. O texto aparece **primeiro**, para a visitante nunca ficar esperando para entender a página:
1. `0.0s` Fundo **branco puro**, sem véu e sem anéis. Chip e H1 entram por linhas com `SplitText` (`yPercent: 110 → 0`, máscara, stagger 0.08, `expo.out`). Logo depois entram subtítulo, botões e os três checks (0.6s, `y: 16 → 0` + opacity).
2. `0.4s` Só o **celular central** sobe da base do shell (`yPercent: 40 → 0`, 1s, `expo.out`) mostrando a `CalculatorScreen`.
3. `1.3s` As teclas `1`, `9`, `0`, `7` "acendem" uma a uma (escala 0.92 + clarear, 180ms cada) e o display mostra `1907`.
4. `2.2s` A tecla `=` é pressionada.
5. `2.35s` A partir da posição da tecla "=", a camada do **véu vinho** (`--grad-suave`) se revela sobre o branco por `clip-path: circle(0% at X Y) → circle(150% at X Y)` (1s, `expo.inOut`): a cor se espalha em onda a partir do "=". Ao mesmo tempo, a tela do celular faz crossfade da calculadora para a `HomeScreen`, e os `ConcentricRings` se desenham de dentro para fora (stagger 0.08).
6. `2.9s` Os **celulares laterais** sobem de trás do central e abrem em leque (`y: 120 → 0`, `rotate: 0 → ±12`, 0.9s, `expo.out`).
7. `3.2s` Pílulas, cartões flutuantes, círculos de ícone e o `CircularBadge` aparecem a partir do celular central (`scale 0.8 → 1`, stagger 0.1).
- Botão discreto "↺ Ver de novo" junto ao celular central (reinicia a parte do celular, passos 3–7).
- `prefers-reduced-motion`: estado final direto, sem timeline.

### 7.2 `#disfarce`: pin com scroll
Seção em `vinho-profundo`, `pin: true`, `end: "+=250%"`, `scrub: 0.6`.
- Esquerda: celular fixo. Direita: os 4 passos de `COPY.md` 3.4, com o passo ativo em branco e os inativos em `white/40`.
- O celular muda conforme o passo:
  1. ícone "Calculadora" num **grid de apps** genérico;
  2. calculadora fazendo uma conta (`12 × 3 = 36`);
  3. digitando o código e destravando para a `HomeScreen`;
  4. vista de **multitarefa** (cartões empilhados) mostrando só a calculadora.
- Depois do pin, aparece a **calculadora interativa** (`mode="interactive"`) com a dica "Experimente: digite 1907 e toque em =". Ao destravar, faz uma versão mini do desbloqueio.
- Mobile: sem pin. Os 4 passos viram uma lista vertical com o celular no topo, trocando de tela com `ScrollTrigger` (`onEnter` de cada passo).

### 7.3 Contadores (`#contexto`)
`ScrollTrigger` `once: true`: números de 0 ao valor em 1,6s, `power3.out`, `snap` adequado (inteiros; `64,3` com uma casa e vírgula decimal pt-BR via `Intl.NumberFormat('pt-BR')`). Os `StatCard` não se movem: só o número conta.

### 7.4 `#rede`: rede se desenhando
SVG com o símbolo do Amparo no centro e 5 avatares em órbita. Com `scrub`, as linhas do centro até cada avatar se desenham (`DrawSVGPlugin` ou `stroke-dashoffset`) e cada avatar aparece com um check `confirma` quando sua linha completa. A guardiã principal tem um anel `vinho`.

### 7.5 `#cofre`: hash
`HashScramble` (6.12), disparado uma vez ao entrar na tela.

### 7.6 `#comecar`: linha de progresso
Linha vertical (mobile) ou horizontal (desktop) que se preenche com `scrub` conforme os 4 passos passam. É a mesma linguagem da barra "Etapa 1/8" do cadastro no app.

### 7.7 Microinterações (respostas a ações)
- Botões: `scale(0.98)` no active; hover só muda a cor.
- Cartões do bento: no hover, só a mini-ilustração interna reage (ex.: o anel do SOS pulsa uma vez). O cartão inteiro não sobe.
- FAQ: altura animada.
- "Copiar link": o texto do botão vira "Link copiado" com check por 2s.

### 7.8 Regras técnicas
- Toda animação dentro de `useGSAP(() => {...}, { scope: ref })` para limpar sozinha.
- Usar `gsap.matchMedia()` para separar desktop, mobile e `(prefers-reduced-motion: reduce)`.
- Animar só `transform`, `opacity` e `clip-path`. Nunca `top`, `left`, `width` ou `height` (exceto o accordion).
- `ScrollTrigger.refresh()` depois que fontes e imagens carregarem.

### 7.9 Parallax e revelações (a camada "smooth")
Aplicar **exatamente** nestes lugares, com estes valores (todos com `scrub: true` sobre o Lenis, que já suaviza; não somar `scrub` numérico alto):
| Elemento | Efeito | Valores |
|---|---|---|
| Véu vinho e anéis do hero | Ficam para trás (mais lentos) | `yPercent: 0 → 15`, anéis `scale: 1 → 1.15`, `start: "top top"`, `end: "bottom top"` |
| Celular central do hero | Sobe mais rápido que o fundo | `yPercent: 0 → -14` |
| Celulares laterais | Abrem mais o leque ao rolar | `rotate: ±12 → ±18`, `x: 0 → ∓40`, `yPercent: 0 → -6` |
| Pílulas e cartões do hero | Velocidades diferentes entre si (profundidade) | `y: 0 → -60 / -110 / -40 / -90` |
| Texto do hero | Some ao sair | `opacity: 1 → 0`, `y: 0 → -40`, só entre 0% e 40% do scroll do hero |
| `ConcentricRings` | Expandem devagar | `scale: 1 → 1.15` |
| H2 de cada seção | Linhas sobem por máscara (`SplitText` `type: "lines", mask: "lines"`) | `yPercent: 100 → 0`, `stagger: 0.08`, `duration: 0.9`, `ease: "expo.out"`, `start: "top 85%"`, **uma vez** |
| `PhotoCard` / `ArchPhoto` | Revelação por máscara + imagem interna com parallax | contêiner `clip-path: inset(100% 0 0 0) → inset(0)` (1.1s, `expo.inOut`, uma vez); `img` `yPercent: -10 → 10` com scrub, imagem com `height: 120%` |
| Shells (`#disfarce`, CTA final) | Entram "abrindo" das margens | `clip-path: inset(6% 4% round 40px) → inset(0% 0% round 40px)`, scrub entre `top bottom` e `top 30%` |

Não animar parágrafos, cartões de texto, ícones nem listas: eles simplesmente estão lá. A sensação de fluidez vem das fotos e dos títulos.

### 7.10 Performance (o que garante o "não travado")
- Animar só `transform`, `opacity` e `clip-path`.
- `will-change: transform` **apenas** nos elementos com parallax ativo (aplicar no `onEnter` e remover no `onLeave` dos triggers longos).
- Fotos: AVIF/WebP com `srcset` (640/1080/1600/2200), a primeira foto visível com `fetchpriority="high"` e o restante `loading="lazy"`. Nenhuma foto acima de 300 KB. No hero, as telas do celular são **codadas** (sem imagem pesada acima da dobra).
- `backdrop-filter` em no máximo 4 elementos visíveis ao mesmo tempo. Em telas < 768px, blur reduzido para 12px.
- Nenhum listener de `scroll` próprio: tudo via ScrollTrigger e Lenis.
- `ScrollTrigger.config({ ignoreMobileResize: true })` e `normalizeScroll` desligado (o Lenis já cuida).
- Mobile (`gsap.matchMedia`): parallax com metade das amplitudes, sem pin no `#disfarce`, sem SplitText em textos com mais de 3 linhas.
- Testar no Chrome DevTools com CPU throttling 4×: nenhum frame longo (> 50ms) durante o scroll.

---

## 8. Imagens e assets

### Já no kit
| Arquivo | Uso |
|---|---|
| `assets/brand/amparo-logo-horizontal-vinho.png` | Header, fundos claros |
| `assets/brand/amparo-logo-horizontal-branco.png` | Seções escuras, rodapé |
| `assets/brand/amparo-logo-vertical-vinho.png` | Favicon grande, OG image |
| `assets/brand/amparo-simbolo-vinho.png` | Favicon, centro da rede, selo circular |
| `assets/app-screens/*.png` | 16 telas do protótipo (≈450px de largura; usar só em tamanhos ≤ 300px de largura de tela ou trocar por exports em alta) |

**Recomendado:** vetorizar o símbolo em **SVG** (`assets/brand/amparo-simbolo.svg`) para usá-lo no selo circular, no SVG da rede e como favicon. O Claude Code pode traçar o símbolo à mão em SVG a partir do PNG (gota + círculo + curva).

### Fotografia (a providenciar)
A fotografia agora é **protagonista** (refs. BeautyCenter e Moonsync).

**Direção:**
- Mulheres brasileiras reais e diversas (idades e tons de pele variados), **serenas, dignas e em movimento**: olhando para longe, segurando o celular junto ao corpo, caminhando. Força tranquila, não fragilidade.
- Luz natural lateral, sombras suaves, fundo simples (parede, janela, cortina). Espaço negativo do lado onde vai o texto.
- Todas recebem o `TintedPhoto` (§6.18), então a cor original importa pouco. O que importa é **luz e contraste**.
- **Nunca:** hematomas, choro, mãos cobrindo o rosto, sombras ameaçadoras de homem, olhar de medo, ou qualquer imagem de violência.

**Slots (`public/images/`):**
| Arquivo | Onde | Proporção / tamanho | Descrição |
|---|---|---|---|
| `contexto.jpg` | `StatCard` foto em `#contexto` | 4:5 | Mulher sentada perto de uma janela em casa, segurando uma caneca, olhar pensativo para fora, luz suave de manhã; rosto de perfil, sem tristeza exagerada |
| `rede-duas-mulheres.jpg` | `ArchPhoto` em `#rede` | 3:4 | Duas mulheres lado a lado, uma com o braço no ombro da outra, sorrindo de leve, rostos parcialmente cortados |
| `direitos-1.jpg` … `direitos-4.jpg` | `PhotoCard` em `#direitos` | 4:5 | Detalhes, sem rosto: mão segurando um caderno; mão no celular; duas mãos se tocando sobre uma mesa; mulher de costas olhando pela janela |
| `ajudar.jpg` | `ArchPhoto` em `#ajudar` | 3:4 | Duas amigas conversando de perto num sofá, luz suave |
| `cta-final.jpg` | Fundo do CTA final (tingido, overlay forte) | 16:9 | Mulher caminhando em uma calçada arborizada ao entardecer, de costas ou de perfil, ao estilo da foto de onboarding do app |
| `og-image.jpg` | Compartilhamento | 1200×630 | Gerada pelo Claude Code: fundo `--grad-suave`, celular com a `HomeScreen`, logo vinho e "Você não está sozinha." |

**Prompt base para IA** (adicionar a descrição de cada slot no início). Exemplo, slot `cta-final.jpg`:
> *editorial portrait photography, [descrição do slot], Brazilian woman, natural window side light, soft shadows, calm and dignified expression, minimal background, generous negative space on the left, shot on 35mm, shallow depth of field, subtle film grain, muted warm tones, no text, no logo*

Enquanto as fotos não chegam: placeholder em `--grad-vinho` com o símbolo da gota em `white/10` e o mesmo overlay do `TintedPhoto`, para o layout já ficar fiel. Não usar imagens de banco aleatórias.

### Ícones
**lucide-react**, `strokeWidth={1.75}`, 20–24px, cor `vinho` (ou branco em fundo escuro), dentro de círculos `superficie` como no app.

---

## 9. Seções: wireframes

### Hero (`#inicio`)
```
┌─ shell r-shell · fundo branco → véu --grad-suave após o desbloqueio ─────────────┐
│ ( logo     Como funciona  Recursos  Segurança  Direitos    [Acessar o Amparo] )  │ ← header glass-light
│                                                                                   │
│                   ( 🛡 Proteção discreta para mulheres )   ← chip soft            │
│                                                                                   │
│                          Você não está sozinha.            ← H1 texto, centro     │
│            Um app que parece uma calculadora, avisa quem você confia...           │
│                 [Acessar o Amparo]   ( Ver como funciona )                        │
│              ✓ Gratuito   ✓ Funciona no navegador   ✓ LGPD                        │
│                                                                                   │
│  (◐ Modo Disfarce)   ◯ ◯ ◯ anéis concêntricos vinho claro ◯ ◯ ◯ (◉ SOS silencioso)│
│  ┌card─────────┐  (●)               ┌──────┐            (●)  ┌card──────────────┐ │
│  │✓ Alerta     │  ╱‾‾‾‾╲            │calc →│           ╱‾‾‾‾╲ │ Ana Beatriz      │ │
│  │ enviado     │ │alerta│           │ app  │          │ prova│ │ Confirmou · 12:31│ │
│  └─────────────┘ │enviad│           │(SOS) │          │verif.│ └──────────────────┘ │
│ (selo)          ╱       ╲           │      │          ╱      ╲                    │
└───────────────────────── celulares cortados pela base do shell ──────────────────┘
```
**Composição:**
- **Fundo:** branco (`branco`) no carregamento; depois do desbloqueio, `--grad-suave` (véu de vinho em baixa opacidade). Nada de foto.
- **Texto centralizado** no topo, `max-w-[820px] mx-auto text-center`, cor `texto`. H1 em `display-xl` numa linha só no desktop (`Você não está sozinha.`) e em duas no mobile. Chip no estilo `soft`. Subtítulo em `lead` `texto-secundario`.
- **Celulares em leque** (ref. Task.io), saindo da base do shell e cortados por ela (`overflow-hidden` no shell). Usam `shadow-phone`, que se destaca bem no branco:
  - **Central** (`PhoneFrame` maior, ~320px de largura no desktop): a `CalculatorScreen` que vira `HomeScreen` no desbloqueio (§7.1). Telas **codadas**, nítidas em qualquer tamanho.
  - **Esquerdo** (rotate `-12deg`, 85% do tamanho, mais baixo, atrás do central): tela **"Alerta enviado"** (`AlertScreen`, de preferência codada).
  - **Direito** (rotate `12deg`, 85%, mais baixo): tela **"Prova verificada"** (de preferência codada).
- **Pílulas inclinadas** (`Chip` grande, fundo `branco`, borda `borda`, `shadow-float`, rotate ±6°, ícone num círculo `vinho` com ícone branco): *Modo Disfarce* (esquerda alta) e *SOS silencioso* (direita alta). São links âncora.
- **Cartões flutuantes** (`FloatCard` branco com `shadow-float`): *✓ Alerta enviado · Sua rede foi avisada* (esquerda) e *Ana Beatriz · Confirmou · 12:31*, com avatar (direita).
- **Círculos de ícone sobre os celulares laterais** (ref. Task.io): círculo `vinho` de 56px com borda branca de 4px e um ícone (`MapPin` no esquerdo, `ShieldCheck` no direito), com uma pequena seta de cursor ao lado.
- **Anéis concêntricos** (`ConcentricRings`, `vinho` a 12–25%) centrados atrás do celular central, com raio máximo maior que a largura do shell.
- `CircularBadge` (em `branco` com borda `borda`) no canto inferior esquerdo do shell.
- Altura: `min-h-[100svh]` (desktop `min-h-[880px]`), com os celulares ocupando ~45% inferiores.

**Mobile (360–767px):**
- Texto centralizado, CTAs empilhados em largura total.
- Só o **celular central** (~260px), 1 pílula (*Modo Disfarce*) e 1 cartão (*Alerta enviado*). Os celulares laterais e o selo somem.

### Contexto e dores
**`#contexto`** (bento ao estilo Finexa):
```
┌──────────────────────────────────────────────────────────────┐
│ H2 (7 col, à esquerda)                 texto (5 col)          │
├──────────────────┬──────────────┬─────────────┬──────────────┤
│ StatCard foto    │ StatCard     │ StatCard    │ StatCard     │
│ (TintedPhoto     │ 64,3%        │ 8 em 10     │ destaque     │
│  contexto.jpg)   │ dentro de    │ companheiros│ 101.656      │
│ 1.492            │ casa         │ ou ex       │ medidas      │
│ feminicídios     │              │             │ descumpridas │
└──────────────────┴──────────────┴─────────────┴──────────────┘
fonte em small, abaixo à direita · mobile: 2×2
```
**`#dores`:** fundo `branco`, lista de `PainCard` em 2 colunas (a primeira dor ocupa a largura toda), fecho em `lead` e link `ghost`.

### Modo Disfarce
A única seção escura da página. Shell `vinho-profundo` (é a "camada de fora"). Texto em `white/80`, H2 branco. Ver 7.2.

### Recursos
H2 centralizado + `BentoGrid`.

### SOS · Cofre · Rede · Risco (as 4 seções de pilar)
Layout alternado, com texto e visual mudando de lado:
```
SOS:    [texto 5col] [SOSDemo + tela alerta 7col]
Cofre:  [visual hash/prova 7col] [texto 5col]
Rede:   [texto 5col] [SVG rede sobre ArchPhoto rede-duas-mulheres 7col]
Risco:  [RiskLevels: controle + cartão 7col] [texto 5col]
```
Chip do pilar acima de cada H2. O fundo das quatro é `branco`; só a seção de Risco recebe um painel `superficie` arredondado para variar o ritmo.

### Direitos
4 `PhotoCard` com topo em pílula (ref. BeautyCenter), em **grid de 4 colunas** no desktop, 2 no tablet e rolagem horizontal com `snap` no mobile. Sem setas e sem avanço automático. Cada cartão: foto tingida + título + texto do `COPY.md` 3.10. Abaixo, a faixa de chips com as 5 formas de violência.

### Segurança
Fundo `superficie`. H2 + texto à esquerda (sticky no desktop) e grade 2×3 de itens à direita (ícone + título + 1 linha, **sem cartão**, só espaçamento).

### Como começar
4 **cartões de passo** (ref. Finexa, "Simple Steps"). No topo de cada cartão fica um **mini fragmento codado da tela correspondente do cadastro do app**: campo de e-mail; seleção do Modo Disfarce com o teclado de código; card "Adicionar guardiã"; selo ✓ "Tudo pronto". Embaixo, "Etapa 1"…"Etapa 4" em `caption` `vinho`, depois título e texto. Uma linha fina `borda` liga os cartões e se preenche em `vinho` com o scroll (7.6). Aqui a numeração faz sentido, porque é uma sequência real. CTA centralizado ao final.

### Para quem quer ajudar
`ArchPhoto` (`ajudar.jpg`) à esquerda (5 col) e texto + botão "Copiar link do Amparo" à direita (7 col), sobre `superficie`.

### O projeto
Texto + stats da IA (em `StatCard`, o de 99% de recall como `destaque`) + ressalva logo abaixo em `small` + chips da stack + equipe em lista simples (nome, e a orientadora destacada no fim).

### FAQ
`EmergencyBar` compacta no topo + `Accordion`.

### CTA final
Shell com `cta-final.jpg` em `TintedPhoto` (overlay mais forte, 80%), texto branco **centralizado**, `Button on-dark`, `ConcentricRings` atrás do título e `CircularBadge` no canto. Entra "abrindo" das margens (§7.9).

### Rodapé
`EmergencyBar` + `Footer` (6.16).

---

## 10. Acessibilidade e qualidade (critérios de aceite)
- [ ] Contraste AA em todo texto (ver 3.1)
- [ ] Foco visível: `outline 2px vinho, offset 3px` (em fundo escuro, `white`)
- [ ] Todo controle operável por teclado, incluindo SOSDemo, calculadora interativa e RiskLevels
- [ ] `prefers-reduced-motion` respeitado em **todas** as animações (sem Lenis, sem parallax, estados finais diretos)
- [ ] Scroll sem engasgos: CPU throttling 4× sem frames longos (§7.10)
- [ ] Texto sobre foto com contraste AA garantido pelo overlay do `TintedPhoto`
- [ ] Funciona em 360px de largura, sem scroll horizontal
- [ ] Imagens com `alt` (ver `COPY.md` §4), `loading="lazy"` abaixo da dobra, `width`/`height` definidos
- [ ] Lighthouse mobile: Performance ≥ 85, Acessibilidade ≥ 95, SEO ≥ 95
- [ ] Um único `<h1>`, landmarks (`header`, `main`, `section[aria-labelledby]`, `footer`)
- [ ] `lang="pt-BR"`, metadados e OG de `COPY.md` §2
- [ ] Números formatados em pt-BR (`1.492`, `64,3%`)

---

## 11. O que não fazer
- ❌ Usar o vermelho `sos` fora do SOS, inclusive em alertas, níveis de risco ou hover.
- ❌ Usar semáforo (verde/amarelo/vermelho) para os níveis de risco.
- ❌ Fotos ou ilustrações de violência, vítimas machucadas ou figuras ameaçadoras.
- ❌ Fade-up em toda seção ou cartão. Movimento só onde está especificado.
- ❌ Fontes ou cores fora do design system do app (§3.1 e §4). As referências valem só para composição, fotografia e movimento.
- ❌ Rótulos em CAIXA-ALTA, fonte monoespaçada para dados, "→" no texto dos botões.
- ❌ Bento com cartões todos iguais e a mesma sombra cinza em tudo.
- ❌ Gradientes com matizes novos (roxo, pêssego, lilás). Só `--grad-vinho`, `--grad-suave` e opacidades das cores do app.
- ❌ Inventar textos, números, depoimentos, avaliações ou "50 mil usuárias". O projeto é um TCC: nada de prova social falsa.
- ❌ Botões de App Store / Google Play. Só "Acessar o Amparo".
