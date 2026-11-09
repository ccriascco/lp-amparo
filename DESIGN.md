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

### 2.1 Sites de referência: **estrutura e animações** (seguir fielmente)
O cliente indicou 5 sites para seguir **fielmente na estrutura, na sequência de seções, na tela de abertura e no estilo das animações**:
- https://gaianutri.app/
- https://gardance.framer.website/
- https://eduzz.framer.website/
- https://nextpay.framer.website/
- https://yurifitpay.framer.website/

**Como usar:** abra os 5 no navegador e role devagar. Reproduza os **padrões de estrutura e de movimento** com o conteúdo, as cores e as fontes do Amparo.
- ✅ Copiar: ordem e tipo das seções, composições, ritmo, curvas e durações.
- ❌ Não copiar: código, textos, imagens, ícones, marcas, números ou depoimentos.

**O que foi observado navegando (nov/2026) e onde entra no Amparo:**
| Observado | Site | Onde no Amparo |
|---|---|---|
| **Tela de abertura:** visual em tela cheia e um **contador grande de % no canto inferior direito** (00 → 100, ~2,5s), que some e revela o hero. Em outros dois, só a marca centralizada sobre fundo liso (~1–2s) | Gaia; Gardance e Eduzz | `Preloader` (§6.22, §7.0) |
| **Hero:** título que aparece **palavra por palavra saindo de um desfoque**; botões e chip entrando em seguida | NextPay | Hero (§7.1) |
| **Hero:** texto centralizado com **aparelho subindo da base** e checks dos dois lados | FitPay, Gardance | Hero (já é a composição Task.io) |
| **Hero:** **notificações empilhando** ao lado da figura ("Venda realizada · agora") | Eduzz | `NotificationCard` no hero |
| **Hero ao rolar:** o celular **gira e inclina** enquanto o hero sai da tela | Gardance | §7.9 |
| **Header que se transforma:** começa largo e transparente; ao rolar vira uma **pílula compacta centralizada** com o CTA destacado | Gardance, Eduzz | `Header` (§6.2, §7.11) |
| **Seção "pergunta" fixa:** fundo escuro, **pergunta grande centralizada** e **cartões de UI flutuando em volta em velocidades diferentes** enquanto a seção fica presa na tela | Gardance ("Difícil saber para onde o dinheiro está indo?") | `#dores` (§6.32) |
| **Seção "é sobre pessoas":** frase grande no centro sobre gradiente e **fotos pequenas espalhadas** que se movem em parallax; a foto central diminui ao rolar | Gaia | `#contexto` (§6.26) |
| **Recursos em cartões grandes empilhados:** cada cartão é uma **foto de pessoa usando o celular**, título embaixo à esquerda, **cartão de UI à direita**, e uma **barra de navegação fixa na base** mostrando o recurso atual | Gardance; Eduzz (bento de fotos com notificações) | `#recursos` (§6.27) |
| **Benefícios em 3 fotos verticais** com uma **etiqueta branca** na base de cada foto | Gardance | `#direitos` |
| **Como funciona em palco fixo:** foto em tela cheia que **troca a cada passo**, texto embaixo à esquerda, cartão de UI à direita e **barra de progresso com os passos** na base | Gardance, Gaia | `#comecar` (§6.28) |
| **Grade escura de recursos** com UI e brilho colorido por cartão | Gaia | `#seguranca` |
| **Preço:** cartões de vidro sobre uma foto de paisagem, celular no meio | Gaia | `#acesso` (§6.30) |
| **Galeria de fotos que se juntam num aglomerado** ao rolar, antes do CTA | Eduzz | Abertura do CTA final |
| Contadores, marquee de logos, FAQ com acordeão, rodapé com banner e colunas | Eduzz, FitPay, NextPay | `#numeros`, marquee, `#faq`, rodapé |

**Adaptações obrigatórias:**
- **Depoimentos** viram **Mitos e verdades** (`#mitos`). Nada de depoimento inventado.
- **Preço/planos** viram o **Cartão de acesso gratuito** (`#acesso`).
- **Logos de clientes** no marquee viram **nomes dos recursos** do Amparo.
- **Números de usuários/volume** viram os números do contexto (FBSP), com a fonte.

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
**Gradientes com mais cor** (pedido do cliente: "mais gradiente colorido, não tão branco"), sempre só com as cores do app:
```css
/* Hero: tom rosado de verdade, como o lavanda da Task.io, mas no vinho do app */
--grad-hero:
  radial-gradient(60% 55% at 50% 105%, rgb(149 75 110 / .42) 0%, transparent 70%),
  radial-gradient(45% 50% at 0% 0%,    rgb(149 75 110 / .24) 0%, transparent 70%),
  radial-gradient(45% 50% at 100% 15%, rgb(75 42 63 / .20)  0%, transparent 70%),
  linear-gradient(180deg, #F3EDEF 0%, #FFFFFF 40%, #F3EDEF 100%);
/* Seções claras alternadas */
--grad-secao:
  radial-gradient(50% 60% at 100% 0%, rgb(149 75 110 / .14) 0%, transparent 70%),
  radial-gradient(45% 55% at 0% 100%, rgb(75 42 63 / .08) 0%, transparent 70%),
  #F3EDEF;
/* Painéis de visual das seções (padrão Finexa) */
--grad-painel:
  radial-gradient(80% 80% at 20% 10%, rgb(149 75 110 / .30) 0%, transparent 65%),
  linear-gradient(160deg, #F3EDEF 0%, rgb(149 75 110 / .22) 100%);
```
Opacidades usadas: `vinho/10`, `vinho/14`, `vinho/22`, `vinho/25`, `vinho/30`, `vinho/42`, `vinho-profundo/8`, `vinho-profundo/20`, `vinho-profundo/60`, `vinho-profundo/85`, `white/6`, `white/14`, `white/28`, `white/40`, `white/80`.

Contraste verificado (WCAG AA):
- `texto` sobre `branco`: ≈ 18,9:1 ✓
- `texto-secundario` sobre `branco`: ≈ 6,6:1 ✓
- branco sobre `vinho`: ≈ 6,0:1 ✓ (botões)
- `vinho` sobre `branco`: ≈ 6,0:1 ✓ (links)
- `white/80` sobre `vinho-profundo`: ≈ 9:1 ✓
- `confirma` sobre branco: ≈ 4,9:1 ✓
- branco sobre `sos`: ≈ 5,6:1 ✓

### 3.2 Raios (hierarquia, não um valor único)
Cantos **pouco arredondados** nos cartões e nas fotos, como nas refs. Finexa e Curely. Arredondamento total só em botões, chips e avatares.
| Token | Valor | Uso |
|---|---|---|
| `r-shell` | `32px` (mobile `24px`) | Só os shells de `#disfarce` e do CTA final. **O hero não tem shell** |
| `r-card-lg` | `20px` | Cartões grandes, painéis de visual, fotos, bento |
| `r-card` | `16px` | Cartões comuns, FAQ, FloatCards |
| `r-sm` | `12px` | Quadrados de ícone, inputs dos mini fragmentos de UI |
| `r-chip` | `9999px` | Botões, chips, pílulas, avatares (igual ao app) |
| `r-phone` | `48px` | Moldura do celular |

**Proibido:** topo em pílula ou em arco em cartões e fotos.

### 3.3 Espaçamento
Base 4px. Escala do Tailwind padrão. Ritmo vertical entre seções: `py-20 md:py-28`. Shells (`#disfarce`, CTA final): `mx-3 md:mx-4` das bordas da viewport.

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

  --radius-shell: 2rem; --radius-card-lg: 1.25rem; --radius-card: 1rem; --radius-sm: 0.75rem; --radius-phone: 3rem;

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

**Sem fontes novas.** As referências misturam sans com serifa itálica, mas a tipografia é a do app e não muda. A personalidade vem da **escala**: Quicksand muito grande, com tracking negativo, vira forma. Quando um H2 quebra em duas linhas, as duas usam a mesma fonte, o mesmo peso e a mesma cor.

### Escala (base 18px, razão ~1,25 no texto e saltos maiores no display)
| Token | Família | Tamanho (mobile → desktop) | Altura de linha | Tracking | Peso |
|---|---|---|---|---|---|
| `display-xl` (H1 do hero) | Quicksand | `clamp(1.625rem, 6.6vw, 4.75rem)` (≈76px no desktop) | 1 | -0.03em | 600 |
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
- H1 do hero **sempre em uma linha** (`whitespace-nowrap`). O `clamp` foi calculado para caber em 360px; confira em 360, 390, 768, 1280 e 1440.
- Carregar as fontes com `<link rel="preconnect">` + `display=swap`, ou com `@fontsource` (preferível, sem dependência de rede externa).

---

## 5. Layout e grid

- **Container:** `max-w-[1280px] mx-auto px-5 md:px-8`.
- **Grid:** 12 colunas no desktop, 4 no mobile, gap `24px`.
- **Alinhamento:** **à esquerda** por padrão. Centralizado só no CTA final e nos títulos da seção de recursos.
- **Hero de ponta a ponta**, sem card. **Shells** (container recuado `mx-3 md:mx-4` com `r-shell`) só em `#disfarce` e no CTA final.
- **Densidade:** ver §9.0. Nenhuma seção só de texto.
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

### 6.2 `Header` (ver também a transformação ao rolar no §7.11)
- Pílula flutuante: `fixed top-4`, `max-w-[1200px]`, `rounded-full`, **com mais respiro interno**: `h-[72px] pl-7 pr-3` (o botão fica a 12px da borda direita), links com `gap-10`, logo com 30px de altura. Sempre `.glass-light` com logo vinho (o hero é claro). Sobre as seções escuras (`#disfarce`, rodapé), troca para `.glass` com logo branco, num crossfade de 0.3s via ScrollTrigger.
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

### 6.10 `BentoGrid` (recursos) — **não é mais usado** (substituído pelo `FeatureStack`, §6.27)
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
SVG de círculos concêntricos com `stroke` de 1px e `vector-effect: non-scaling-stroke`.
- **Variante `hero`:** 10 a 12 anéis espaçados ~90px, centrados no celular central e **cobrindo o hero inteiro** (o SVG é `absolute inset-0` com `preserveAspectRatio="xMidYMax slice"`). `stroke` `vinho` com opacidade decrescendo de 18% (centro) a 8% (bordas).
- **Variante `local`:** 5 anéis (1, 1.35, 1.75, 2.2, 2.7 × r) atrás do botão SOS em `#sos`, do celular em `#disfarce` (branco a 6%) e no CTA final (branco a 8%).
- Movimento: parallax leve (§7.9) e uma "pulsação" única ao completar o SOSDemo (os anéis se expandem 4% e voltam, em sequência).

### 6.20 `CircularBadge`
Selo de 128px (mobile 96px) com o texto *"Você não está sozinha • Você não está sozinha •"* em SVG `textPath` ao redor, Nunito Sans 600, 11px, tracking 0.18em, e o **símbolo da gota** no centro. **A gota precisa estar centrada geometricamente:** use um SVG da gota com `viewBox` justo ao desenho (sem margens internas), posicionado com `absolute inset-0 grid place-items-center`, ocupando 38% do diâmetro. O `textPath` gira; a gota **não gira** (fica numa camada separada). Fundo `branco` com borda `borda` sobre fundo claro, ou `.glass` sobre foto. Gira 360° em 24s (`repeat: -1`, `ease: none`); com o scroll, a velocidade acelera um pouco (`ScrollTrigger` `onUpdate` → `timeScale` entre 1 e 3, voltando suavemente). Fica no canto inferior esquerdo do hero e no CTA final. Com movimento reduzido: parado.

### 6.21 `PhotoCard`
- Foto tingida com **raio `r-card-lg` (20px) em todos os cantos**, proporção 3:4, overlay escuro na base, título `display-m` branco, texto curto e um botão-ícone redondo de vidro no canto superior direito. Usado em `#direitos`, `#rede` e `#ajudar`.
- O antigo `PhotoCard` (topo em arco) **foi removido** a pedido do cliente.

### 6.22 `Preloader` (tela de abertura, padrão Gaia + Gardance)
Tela cheia com fundo `--grad-vinho`. No centro, o **logo vertical branco** (gota + "Amparo"), com a gota se desenhando. No **canto inferior direito**, um contador **grande** (`clamp(4rem, 9vw, 8rem)`, Quicksand 500, branco, `tabular-nums`) indo de **0 a 100**, com um "%" pequeno ao lado. No canto inferior esquerdo, a linha do `COPY.md` 3.01 em `small` `white/70`. Ver §7.0.

### 6.23 `NotificationCard` (hero, padrão Eduzz)
Cartão estilo notificação do sistema: `.glass-light`, `r-card`, `shadow-float`, `px-4 py-3`, largura 280px. Ícone do app (gota em quadrado `vinho` 36px, `r-sm`) + título `caption` 700 + linha `small` + horário à direita em `caption` `texto-secundario`. Três no hero (`COPY.md` 3.1), **empilhadas** (a mais nova em cima, as anteriores levemente menores e mais apagadas, como notificações reais).

### 6.24 `StatsBand` (padrão Eduzz/FitPay/NextPay)
Faixa logo após o hero, em container, com 4 colunas separadas por divisórias verticais `borda`. Cada coluna: número grande (`numero`, `vinho`) com contador e rótulo `small`. Título curto à esquerda acima, fonte à direita abaixo. Mobile: 2×2.

### 6.25 `Marquee` (padrão FitPay)
Faixa de 64px, fundo `branco`, bordas superior e inferior `borda`. Itens do `COPY.md` 3.2b em Quicksand 600 `1.25rem` `texto`, separados pelo **símbolo da gota em `vinho`** (18px). Loop infinito (`xPercent`, 35s por volta), velocidade reagindo ao scroll, pausa no hover. Movimento reduzido: parado.

### 6.26 `PeopleScatter` (padrão Gaia, "é sobre pessoas")
Seção de `200vh` com conteúdo `sticky` de `100vh`. Fundo `--grad-secao` mais escuro (`vinho` a 30–40% em manchas grandes e desfocadas, como o gradiente "nuvem" da Gaia). No centro, a **frase grande** (`COPY.md` 3.2c, Quicksand 600 `display-l`, `texto` ou branco conforme o contraste). Em volta, **8 fotos pequenas tingidas** (110–160px, `r-card-lg`) espalhadas pela tela e **uma foto maior** embaixo, no centro. Ao rolar, cada foto sobe numa velocidade diferente (parallax) e a foto central **diminui** de ~340px para ~150px. Fotos: `contexto`, `rede-duas-mulheres`, `ajudar`, `cta-final`, `direitos-1..4` e `sos`. O H2 e o parágrafo do contexto ficam acima, centralizados, antes da parte fixa.

### 6.27 `FeatureStack` (padrão Gardance), substitui o `FeatureTabs`
- **4 cartões grandes empilhados** (largura do container, altura `min(720px, 90vh)`, `r-card-lg`), um para cada recurso: **SOS**, **Cofre**, **Rede**, **Leitura de risco**, com 48px entre eles.
- Cada cartão: **foto em tela cheia** (`TintedPhoto`, mulher usando o celular, ver §8) com escurecimento na base esquerda; **chip do pilar, título (`display-l` branco) e texto curto** embaixo à esquerda; à direita, um **cartão de UI branco** (`r-card-lg`, `shadow-float`, 360px) com a interação do recurso (SOSDemo, HashScramble, rede, RiskLevels). Os bullets do `COPY.md` aparecem dentro do cartão de UI ou como 2–3 chips de vidro sob o texto.
- **Barra de navegação fixa na base** (padrão Gardance): pílula `vinho-profundo/90` com `backdrop-blur`, centralizada a 24px da base da tela, visível **só enquanto a seção está na tela**. Mostra os 4 recursos (ícone + nome no ativo, só ícone nos outros); o ativo ganha fundo `white/15` que **desliza** até ele. Clicar rola até o cartão (Lenis). O ativo muda conforme o cartão no centro da tela.
- **Âncoras:** `#sos`, `#cofre`, `#rede` e `#risco` são os próprios cartões.
- Entrada de cada cartão: `scale 0.94 → 1` e `y 60 → 0` ao entrar; a foto tem parallax interno (§7.9) e o cartão de UI entra 0.2s depois, vindo da direita.
- Mobile: cartões com altura automática, foto em cima (4:5), texto e cartão de UI embaixo. A barra fixa mostra só os ícones.

### 6.28 `PhotoStage` (padrão Gardance/Gaia "como funciona"), usado em `#comecar`
- Seção com altura `100vh + 4 × 90vh`; o palco é `sticky` com `100vh`, dentro de um cartão `r-card-lg` com margens de 16px.
- **Foto em tela cheia que troca a cada passo** (crossfade de 0.8s + leve zoom 1.05 → 1), com escurecimento na base.
- Embaixo à esquerda: título do passo (`display-l` branco) e texto. À direita: um **cartão de UI branco** com o fragmento da tela do cadastro correspondente, que troca junto (sai para cima, entra de baixo).
- Na base: **barra de progresso com os 4 passos** ("1. Crie sua conta", "2. Modo Disfarce", "3. Rede de apoio", "4. Pronto"), cada um com uma linha que se preenche conforme o scroll (§7.6).
- Mobile: sem sticky; 4 blocos empilhados com a foto, o texto e o cartão de UI.

### 6.28b `StepShowcase` (padrão Gaia), usado em `#disfarce`
Lista de passos à esquerda com contador **01/04** e o passo ativo destacado; à direita, celular `sticky` cuja tela troca com crossfade a cada passo. Versão escura.

### 6.29 `MythCarousel` (padrão NextPay, no lugar dos depoimentos)
Carrossel horizontal de cartões `r-card-lg` de 420px (mobile 85vw). Cada cartão tem dois blocos: **Mito** (fundo `superficie`, texto entre aspas em `display-m` menor, `texto-secundario`) e **Verdade** (fundo `branco` ou, no cartão ativo, `--grad-vinho` com texto branco). Setas e contador **1/5** à direita do título. Arrastar com o mouse/dedo (`scroll-snap` nativo + setas). **Não avança sozinho.**

### 6.30 `AccessCard` (padrão Gaia, no lugar do preço)
Seção com a foto `cta-final.jpg` tingida em tela cheia (`r-card-lg`, margens de 16px). Por cima, **dois cartões de vidro** (`.glass-light`, `r-card-lg`) lado a lado e um **celular com a `HomeScreen` no meio**, sobrepondo os dois: à esquerda, chip "Acesso gratuito", título, texto e CTA; à direita, a lista com checks.

### 6.31 `FooterBanner` (padrão NextPay)
Antes das colunas do rodapé: banner `r-card-lg` com `--grad-vinho`, título e linha do `COPY.md` 3.18 à esquerda, 3 selos em pílula de vidro à direita e um celular cortado no canto. As colunas, a `EmergencyBar`, o "Voltar ao topo" e o texto legal vêm abaixo.

### 6.32 `QuestionStage` (padrão Gardance), usado em `#dores`
- Seção de `250vh` com palco `sticky` de `100vh`, fundo **`vinho-profundo`** com um brilho radial `vinho/25` no centro.
- No centro: o H2 do `COPY.md` 3.3 (**"Pedir ajuda não deveria ser mais um risco."**) em Quicksand 600 `display-l`, branco, `max-w-[16ch]`, centralizado.
- Em volta: os **5 cartões de dor** como cartões flutuantes escuros (`vinho-profundo` + borda `white/10` + brilho suave `vinho/20`, `r-card`, 300px): ícone em quadrado `vinho`, título branco e texto `white/70`, mais o link "Como o Amparo ajuda". Espalhados em posições fixas (2 em cima, 1 de cada lado, 1 embaixo) e com **2 a 4 cartões "eco"** menores e mais apagados (só o ícone e o título) para dar profundidade.
- Ao rolar: os cartões sobem em **velocidades diferentes** (`y` de +40vh a −60vh, cada um com seu fator) e os mais distantes ficam com `blur(2px)` e opacidade 0.5. No fim, a pergunta some e aparecem o fecho (`lead`) e o botão "Conheça os recursos", centralizados na base.
- Mobile: sem sticky. H2 no topo e os 5 cartões em lista vertical com `appear`.

---

## 7. Movimento (GSAP)

**Sensação desejada:** igual à dos sites de referência (§2.1): *smooth, clean, sem travar.* Tela de abertura, entrada do hero em sequência, elementos que **aparecem suavemente com desfoque** ao entrar na tela, contadores, marquee, abas e carrossel fluidos, header que ganha vidro ao rolar e um leve parallax nas imagens.

**Hierarquia do movimento:**
1. **Abertura:** preloader (§7.0) seguido do desbloqueio do hero (§7.1).
2. **Aparecer no scroll** (§7.11), no padrão Framer dos sites de referência.
3. **Profundidade:** parallax e revelações por máscara nas fotos (§7.9).
4. **Movimento que explica:** passos com tela trocando, rede, hash, contadores e linha de progresso.
5. **Respostas a ações:** abas, carrossel, SOS, calculadora, FAQ, botões.

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

### 7.0 Preloader (tela de abertura, padrão Gaia + Gardance)
- Só na **primeira visita da sessão** (`sessionStorage`). Nas próximas e com movimento reduzido, a página abre direto.
- Timeline (~2,4s, como a Gaia):
  1. `0s` Fundo já visível. A gota se desenha (DrawSVG 0 → 100%, 1s, `power2.inOut`) e o preenchimento aparece (0.3s); o nome "Amparo" sobe com desfoque (`y 12 → 0`, `blur 8 → 0`, 0.6s).
  2. `0s → 2s` Contador de **0 a 100** no canto inferior direito, com aceleração no começo e desaceleração no fim (`power3.inOut`), números em `tabular-nums`.
  3. `2s` Logo, contador e texto somem juntos (`opacity 0`, `y -12`, 0.35s).
  4. `2.2s` O preloader inteiro some em **fade** (`opacity 1 → 0`, 0.6s, `power2.out`) enquanto o hero começa (§7.1). Sem cortina.
- O preloader nunca segura o carregamento por mais de 3s: se as fontes atrasarem, ele sai mesmo assim.

### 7.1 Hero: "Desbloqueio" (assinatura da página)
Timeline no carregamento (começa quando o preloader inicia o fade), ~3,6s no total. O texto aparece **primeiro**, para a visitante nunca ficar esperando para entender a página:
1. `0.0s` Fundo **branco puro**, sem véu e sem anéis. O chip entra (`y 12 → 0`, desfoque). O **H1 aparece palavra por palavra saindo de um desfoque** (padrão NextPay): `SplitText` por palavras, cada palavra `opacity 0 → 1`, `filter blur(12px) → 0`, `y 10 → 0`, 0.8s, `stagger 0.09`. Depois entram subtítulo, botões e os três checks (0.6s, `y: 16 → 0`, desfoque).
2. `0.4s` Só o **celular central** sobe da base do hero (`yPercent: 40 → 0`, 1s, `expo.out`) mostrando a `CalculatorScreen`.
3. `1.3s` As teclas `1`, `9`, `0`, `7` "acendem" uma a uma (escala 0.92 + clarear, 180ms cada) e o display mostra `1907`.
4. `2.2s` A tecla `=` é pressionada.
5. `2.35s` A partir da posição da tecla "=", a camada do **gradiente do hero** (`--grad-hero`) e os anéis se revelam sobre o branco por `clip-path: circle(0% at X Y) → circle(150% at X Y)` (1s, `expo.inOut`): a cor se espalha em onda a partir do "=". Ao mesmo tempo, a tela do celular faz crossfade da calculadora para a `HomeScreen`, e os `ConcentricRings` se desenham de dentro para fora (stagger 0.08).
6. `2.9s` Os **celulares laterais** sobem de trás do central e abrem em leque (`y: 120 → 0`, `rotate: 0 → ±12`, 0.9s, `expo.out`).
7. `3.2s` Pílulas, círculos de ícone e o `CircularBadge` aparecem a partir do celular central (`scale 0.8 → 1`, stagger 0.1), e as 3 `NotificationCard` chegam uma por uma como notificações (`y -16 → 0`, desfoque 8px → 0, stagger 0.35s).
- Botão discreto "↺ Ver de novo" junto ao celular central (reinicia a parte do celular, passos 3–7).
- `prefers-reduced-motion`: estado final direto, sem timeline.

### 7.2 `#disfarce`: passos com celular sticky (padrão Gaia)
Seção em `vinho-profundo`. No desktop, o celular fica `sticky` (ou `pin` com `end: "+=250%"`, `scrub: 0.6`) enquanto os passos rolam; o contador 01/04 atualiza junto.
- Celular fixo e os 4 passos de `COPY.md` 3.4, com o passo ativo em branco e os inativos em `white/40`.
- O celular muda conforme o passo:
  1. ícone "Calculadora" num **grid de apps** genérico;
  2. calculadora fazendo uma conta (`12 × 3 = 36`);
  3. digitando o código e destravando para a `HomeScreen`;
  4. vista de **multitarefa** (cartões empilhados) mostrando só a calculadora.
- Depois do pin, aparece a **calculadora interativa** (`mode="interactive"`) com a dica "Experimente: digite 1907 e toque em =". Ao destravar, faz uma versão mini do desbloqueio.
- Mobile: sem pin. Os 4 passos viram uma lista vertical com o celular no topo, trocando de tela com `ScrollTrigger` (`onEnter` de cada passo).

### 7.3 Contadores (`#numeros`)
`ScrollTrigger` `once: true`: números de 0 ao valor em 1,6s, `power3.out`, `snap` adequado (inteiros; `64,3` com uma casa e vírgula decimal pt-BR via `Intl.NumberFormat('pt-BR')`). Na `StatsBand`, só o número conta; o rótulo usa o `appear` (§7.11).

### 7.4 `#rede`: rede se desenhando
SVG com o símbolo do Amparo no centro e 5 avatares em órbita. Com `scrub`, as linhas do centro até cada avatar se desenham (`DrawSVGPlugin` ou `stroke-dashoffset`) e cada avatar aparece com um check `confirma` quando sua linha completa. A guardiã principal tem um anel `vinho`.

### 7.5 `#cofre`: hash
`HashScramble` (6.12), disparado uma vez ao entrar na tela.

### 7.6 `#comecar`: passos e linha de progresso
`PhotoStage` (§6.28): a foto troca a cada passo (crossfade 0.8s + zoom 1.05 → 1), o cartão de UI troca junto (sai para cima, entra de baixo, 0.5s) e a linha de cada passo na barra da base se preenche com `scrub`. É a mesma linguagem da barra "Etapa 1/8" do cadastro no app.

### 7.7 Microinterações (respostas a ações)
- Botões e cartões: ver o hover do §7.11.
- Abas: indicador deslizando (§6.27). Carrossel: arrastar com inércia e setas (§6.29).
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
| Celular central do hero | Sobe mais rápido que o fundo e **gira/inclina** ao sair (padrão Gardance) | `yPercent: 0 → -14`, `rotate: 0 → -8deg`, `rotateX: 0 → 12deg` (com `perspective: 1200px` no pai), `scale: 1 → 0.92` |
| Celulares laterais | Abrem mais o leque ao rolar | `rotate: ±12 → ±18`, `x: 0 → ∓40`, `yPercent: 0 → -6` |
| Pílulas e cartões do hero | Velocidades diferentes entre si (profundidade) | `y: 0 → -60 / -110 / -40 / -90` |
| Texto do hero | Some ao sair | `opacity: 1 → 0`, `y: 0 → -40`, só entre 0% e 40% do scroll do hero |
| `ConcentricRings` | Expandem devagar | `scale: 1 → 1.15` |
| H2 de cada seção | Linhas sobem por máscara (`SplitText` `type: "lines", mask: "lines"`) | `yPercent: 100 → 0`, `stagger: 0.08`, `duration: 0.9`, `ease: "expo.out"`, `start: "top 85%"`, **uma vez** |
| `PhotoCard` | Revelação por máscara + imagem interna com parallax | contêiner `clip-path: inset(100% 0 0 0) → inset(0)` (1.1s, `expo.inOut`, uma vez); `img` `yPercent: -10 → 10` com scrub, imagem com `height: 120%` |
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

### 7.11 "Aparecer no scroll" (padrão dos sites de referência)
Efeito padrão de entrada para **títulos, parágrafos, cartões, itens de lista e visuais** ao entrarem na tela:
```ts
// src/lib/appear.ts
gsap.from(targets, {
  opacity: 0, y: 32, filter: "blur(8px)",
  duration: 0.9, ease: "expo.out", stagger: 0.08,
  scrollTrigger: { trigger: section, start: "top 80%", once: true },
});
```
- **H2:** palavra por palavra saindo do desfoque, como o H1 (§7.1), mas disparado pelo scroll.
- Grupos (cartões de uma grade, bullets): `stagger: 0.08`, da esquerda para a direita e de cima para baixo.
- Celulares e painéis de visual: `y: 60`, `scale: 0.96 → 1`, 1.1s.
- Cartões flutuantes e notificações: aparecem **depois** do visual a que pertencem (+0.2s), com `scale 0.9 → 1`, e depois flutuam devagar (`y ±6px`, 4–6s, `yoyo`).
- **Header que se transforma** (padrão Gardance/Eduzz): no topo, ocupa a largura do container, transparente, com todos os links. A partir de 80px de scroll, **encolhe para uma pílula compacta centralizada** (`max-w-[880px]`, `.glass-light`, `shadow-float`, 0.5s `expo.out`): o logo fica só com a gota + "Amparo" menor, os links ficam mais juntos e o botão "Acessar o Amparo" ganha destaque. Ao voltar ao topo, abre de novo. Sobre seções escuras, usa `.glass` com textos brancos.
- Hover: botões `scale 1.03` (0.25s) e `0.98` no clique; cartões-link sobem 4px com sombra; fotos com zoom 1.04 dentro da moldura.
- Movimento reduzido: tudo aparece já no estado final, sem desfoque e sem deslocamento.
- Desempenho: `filter: blur()` só durante a entrada (`clearProps: "filter"` no `onComplete`).

### 7.12 Seções fixas com elementos flutuando (padrão Gardance/Gaia)
Usado no `QuestionStage` (§6.32) e no `PeopleScatter` (§6.26):
```ts
// cada elemento flutuante tem data-speed (ex.: 0.6, 1, 1.4)
gsap.to(el, {
  y: () => -window.innerHeight * 0.6 * Number(el.dataset.speed),
  ease: "none",
  scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: true },
});
```
- O conteúdo central fica parado (`sticky`) e os elementos em volta passam em velocidades diferentes. É isso que dá a sensação de profundidade dos sites de referência.
- Elementos com `speed` alto ficam maiores e nítidos; os com `speed` baixo, menores, com `blur(2px)` e 50% de opacidade.
- Mobile: desligado (lista simples com `appear`).

### 7.13 Galeria que se junta (padrão Eduzz), abertura do CTA final
Antes do CTA final: seção de `200vh` com palco `sticky`. 6 fotos tingidas começam **espalhadas e grandes** pela tela e, com o scroll, **se juntam num aglomerado** no centro (cada uma com seu `x`, `y`, `rotate` e `scale` finais), deixando um espaço no meio onde entra o H2 do CTA final. Usa as mesmas fotos do §6.26. Mobile: desligado.

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
| `sos.jpg` | Cartão SOS em `#recursos` | 16:9 (+ 4:5 mobile) | Mulher de pé numa calçada urbana ao entardecer, segurando o celular com firmeza perto do corpo e olhando para a tela, expressão concentrada e calma; figura no terço esquerdo |
| `cofre.jpg` | Cartão Cofre em `#recursos` | 16:9 (+ 4:5 mobile) | Mulher sentada à mesa da cozinha à noite, luz de luminária, fotografando um documento com o celular; figura no terço esquerdo |
| `risco.jpg` | Cartão Leitura de risco em `#recursos` | 16:9 (+ 4:5 mobile) | Mulher no sofá lendo algo no celular com expressão atenta e serena, luz suave de janela; figura no terço esquerdo |
| `comecar-1.jpg` … `comecar-4.jpg` | `PhotoStage` em `#comecar` | 16:9 | (1) mãos digitando no celular sobre uma mesa; (2) mulher olhando o celular com leve sorriso, close; (3) duas amigas olhando o mesmo celular; (4) mulher caminhando tranquila com o celular no bolso, de costas. Figura sempre no terço esquerdo e centro livre |
| `contexto.jpg` | `StatCard` foto em `#contexto` | 4:5 | Mulher sentada perto de uma janela em casa, segurando uma caneca, olhar pensativo para fora, luz suave de manhã; rosto de perfil, sem tristeza exagerada |
| `rede-duas-mulheres.jpg` | `PhotoCard` em `#rede` | 3:4 | Duas mulheres lado a lado, uma com o braço no ombro da outra, sorrindo de leve, rostos parcialmente cortados |
| `direitos-1.jpg` … `direitos-4.jpg` | `PhotoCard` em `#direitos` | 4:5 | Detalhes, sem rosto: mão segurando um caderno; mão no celular; duas mãos se tocando sobre uma mesa; mulher de costas olhando pela janela |
| `ajudar.jpg` | `PhotoCard` em `#ajudar` | 3:4 | Duas amigas conversando de perto num sofá, luz suave |
| `cta-final.jpg` | Fundo do CTA final (tingido, overlay forte) | 16:9 | Mulher caminhando em uma calçada arborizada ao entardecer, de costas ou de perfil, ao estilo da foto de onboarding do app |
| `og-image.jpg` | Compartilhamento | 1200×630 | Gerada pelo Claude Code: fundo `--grad-suave`, celular com a `HomeScreen`, logo vinho e "Você não está sozinha." |

**Prompt base para IA** (adicionar a descrição de cada slot no início). Exemplo, slot `cta-final.jpg`:
> *editorial portrait photography, [descrição do slot], Brazilian woman, natural window side light, soft shadows, calm and dignified expression, minimal background, generous negative space on the left, shot on 35mm, shallow depth of field, subtle film grain, muted warm tones, no text, no logo*

Enquanto as fotos não chegam: placeholder em `--grad-vinho` com o símbolo da gota em `white/10` e o mesmo overlay do `TintedPhoto`, para o layout já ficar fiel. Não usar imagens de banco aleatórias.

### Ícones
**lucide-react**, `strokeWidth={1.75}`, 20–24px, cor `vinho` (ou branco em fundo escuro), dentro de círculos `superficie` como no app.

---

## 9. Seções: wireframes

### 9.0 Densidade (regra geral, pedido do cliente: "o site está muito vazio")
A página tem que parecer um **produto vivo**, como as refs. Finexa e Curely. Toda seção segue estas regras:
1. **Nenhuma seção só de texto.** Cada seção tem pelo menos **um visual principal** (celular, painel de UI, foto ou diagrama) e **dois ou mais detalhes flutuantes** (FloatCard, chip com ícone, avatar empilhado, selo, mini-gráfico) sobrepostos às bordas desse visual.
2. **Painel de visual (padrão Finexa "Built for individuals"):** o visual principal fica dentro de um **painel** `r-card-lg` com fundo `--grad-painel` (§3.1), com 1 cartão de UI grande dentro e 1 ou 2 cartões menores **saindo pelas bordas** do painel (`shadow-float`, deslocados 24–40px para fora).
3. **Fundos com atmosfera:** as seções claras alternam entre `branco` e `--grad-secao` (§3.1). Nunca duas seções seguidas com o mesmo fundo liso.
4. **Ritmo mais compacto:** `py-20 md:py-28` (no lugar de `py-40`). Os títulos ficam a no máximo 64px do conteúdo.
5. **Cabeçalho de seção em duas colunas** (padrão Finexa): H2 à esquerda (7 col) e um parágrafo curto + botão `ghost` ou chip à direita (5 col), alinhados pela base. Centralizado só em Recursos e no CTA final.
6. **Microdetalhes de produto:** avatares empilhados com "+3", horários ("12:31"), selos de status ("Confirmou", "Verificada"), barrinhas do gráfico dos 7 dias, ícones em círculos vinho. Sempre com dados de exemplo coerentes com o app (Marina, Ana Beatriz, Lúcia, Rafaela).

### Ordem final das seções
Segue o `COPY.md` §3.00 (estrutura dos sites de referência, §2.1):
`Preloader → Header → Hero → Faixa de números → Marquee → Manifesto (pessoas) → Dores (pergunta fixa) → Modo Disfarce → Recursos (cartões com foto) → Seus direitos → Mitos e verdades → Segurança → Como começar (palco com fotos) → Cartão de acesso → Para quem quer ajudar → FAQ → Galeria + CTA final → Rodapé`

Fundos: Hero `--grad-hero` · Números `branco` · Marquee `branco` (com bordas) · Manifesto `--grad-secao` (parte fixa com manchas mais fortes) · Dores `vinho-profundo` · Disfarce shell `vinho-profundo` (separado das Dores por 96px de `branco`) · Recursos `branco` · Direitos `--grad-secao` · Mitos `branco` · Segurança `vinho-profundo` · Como começar `branco` (palco com foto) · Acesso `branco` (cartão com foto) · Ajudar `branco` · FAQ `--grad-secao` · Galeria + CTA `branco` → shell `--grad-vinho` · Rodapé `vinho-profundo`.

### Hero (`#inicio`): sem card, de ponta a ponta
```
fundo --grad-hero em TODA a largura (sem shell), anéis concêntricos cobrindo o hero inteiro
─────────────────────────────────────────────────────────────────────────────────────
   ( logo     Como funciona  Recursos  Segurança  Seus direitos  Dúvidas   Entrar [Acessar o Amparo] )
                          ( 🛡 Proteção discreta para mulheres )
                              Você não está sozinha.          ← UMA linha
              Um app que parece uma calculadora, avisa quem você confia...
                     [Acessar o Amparo]   ( Ver como funciona )
                  ✓ Gratuito   ✓ Funciona no navegador   ✓ LGPD
  (◐ Modo Disfarce)                                                  (◉ SOS silencioso)
  ┌notificação──────────┐ (●)        ┌──────┐        (●) ┌notificação──────────┐
  │▣ Alerta enviado  agora│ ╱‾‾‾╲     │calc →│     ╱‾‾‾╲ │▣ Ana Beatriz  12:31 │
  └─────────────────────┘│alerta│    │ app  │    │prova│└─────────────────────┘
        ┌notificação────────┐        │(SOS) │         ↑ entram em sequência,
        │▣ Prova verificada │        │      │           como notificações (Eduzz)
 (selo)
────────────── celulares cortados pela base do hero ──────────────────────────────────
```
- **Sem card**, de ponta a ponta. Fundo `--grad-hero`, que se revela no desbloqueio. `ConcentricRings` variante `hero` cobrindo tudo.
- **Texto centralizado**, H1 **em uma linha** (§4).
- **Celulares em leque** (Task.io): central com `CalculatorScreen` → `HomeScreen`; laterais inclinados ±12° com "Alerta enviado" e "Prova verificada", todos codados.
- **3 `NotificationCard`** (§6.23, padrão Eduzz) com os textos do `COPY.md` 3.1, **empilhadas** ao lado direito do celular central (no lugar do cartão "Ana Beatriz"), como notificações chegando. Entram um por um, deslizando de cima com `y -16 → 0` e desfoque, como notificações chegando (passo 7 do §7.1, stagger 0.35s).
- Pílulas inclinadas (*Modo Disfarce*, *SOS silencioso*), círculos de ícone sobre os celulares laterais e `CircularBadge` no canto inferior esquerdo.
- Mobile: H1 em uma linha, CTAs empilhados, só o celular central + 1 pílula + 1 notificação.

### Faixa de números (`#numeros`): padrão Eduzz/FitPay
`StatsBand` (§6.24) logo abaixo do hero, `py-16`. Contadores (§7.3).

### Marquee: padrão FitPay/Gaia
`Marquee` (§6.25) logo abaixo dos números.

### Manifesto (`#contexto`): padrão Gaia ("é sobre pessoas")
- Antes da parte fixa: H2 + texto do `COPY.md` 3.2c centralizados (`max-w-[760px]`), com `appear`.
- Depois, o `PeopleScatter` (§6.26): frase de fecho grande no centro, fotos espalhadas em parallax e a foto central diminuindo (§7.12).

### Dores (`#dores`): padrão Gardance (pergunta fixa com cartões flutuando)
`QuestionStage` (§6.32): fundo `vinho-profundo`, a pergunta grande fixa no centro e os 5 cartões de dor passando em volta em velocidades diferentes; no fim, o fecho e o botão "Conheça os recursos".

### Modo Disfarce (`#disfarce`): padrão Gaia (passos 01/04)
Shell `vinho-profundo` (`r-shell`, `mx-3 md:mx-4`), entrando "abrindo" das margens (§7.9). Dentro, um `StepShowcase` (§6.28b) escuro: passos à esquerda com contador **01/04**, celular `sticky` à direita trocando de tela (§7.2). Anéis brancos a 6% atrás do celular e 2 cartões de vidro ("Ícone: Calculadora", "Multitarefa: só a calculadora aparece"). Ao final, a calculadora interativa.

### Recursos (`#recursos`): padrão Gardance (cartões grandes com foto) + Eduzz (notificações sobre a foto)
H2 e sub centralizados + `FeatureStack` (§6.27). Conteúdo de cada cartão:
| Cartão | Foto | Cartão de UI (direita) | Extras sobre a foto |
|---|---|---|---|
| **SOS** (`#sos`) | `sos.jpg` | `SOSDemo` com anéis | Notificação "Localização enviada · há 30s" |
| **Cofre** (`#cofre`) | `cofre.jpg` | "Nova ocorrência" + `HashScramble` + selo "✓ Prova verificada" | Chip "Foto · 2,4 MB" |
| **Rede** (`#rede`) | `rede-duas-mulheres.jpg` | "Sua rede · 3 de 5" com avatares e a rede se desenhando (§7.4) | Notificação "Ana Beatriz confirmou · 12:31" |
| **Leitura de risco** (`#risco`) | `risco.jpg` | `RiskLevels` (sem avanço automático) + "Ver como chegamos nisso" | Chip "Nada disso é enviado para ninguém" |
Barra de navegação fixa na base enquanto a seção está na tela.

### Seus direitos (`#direitos`): padrão Gardance (benefícios em fotos)
Cabeçalho em duas colunas. 4 fotos verticais (`direitos-1..4`, proporção 3:4, `r-card-lg`) em grid de 4 colunas (2 no tablet; rolagem com `snap` no mobile). Na base de cada foto, uma **etiqueta branca** (`r-card`, `px-5 py-4`, 16px das bordas) com o título e, ao passar o mouse ou tocar, o texto do `COPY.md` 3.10 abrindo para cima. Abaixo, os chips das 5 formas de violência.

### Mitos e verdades (`#mitos`): padrão NextPay (carrossel)
Cabeçalho em duas colunas, com setas e contador **1/5** alinhados à direita. `MythCarousel` (§6.29) saindo pela borda direita do container.

### Segurança (`#seguranca`): padrão Gaia (grade escura de recursos)
Fundo `vinho-profundo`. Cabeçalho centralizado (H2 branco, texto `white/70`). Grade 3×2 de cartões escuros (`white/5`, borda `white/10`, `r-card-lg`), cada um com um **brilho radial colorido próprio** (variações de `vinho` e `vinho-profundo`, nunca outra cor), ícone, título branco, 1 linha e um micro-visual de UI claro:
toggle "Localização" desligado · tela bloqueada sem notificação · campo "••••" · chip "HTTPS ✓" · chips "Acessar · Corrigir · Apagar" · botão "Apagar registros".

### Como começar (`#comecar`): padrão Gardance/Gaia (palco fixo com fotos)
`PhotoStage` (§6.28): foto em tela cheia trocando a cada passo (`comecar-1..4`), texto embaixo à esquerda, cartão de UI do cadastro à direita e barra de progresso com os 4 passos na base. CTA logo depois do palco, centralizado.

### Cartão de acesso (`#acesso`): padrão Gaia (preço)
`AccessCard` (§6.30): dois cartões de vidro sobre a foto `cta-final.jpg`, com o celular no meio.

### Para quem quer ajudar (`#ajudar`): padrão Gardance (bloco de suporte)
Bloco centralizado e compacto: foto `ajudar.jpg` em círculo de 96px com dois avatares, H2, texto, botão "Copiar link do Amparo" e dica. Fundo `branco`.

### FAQ (`#faq`): padrão Gaia/FitPay
Duas colunas: à esquerda (4 col) H2, sub e a `EmergencyBar` compacta em cartão `vinho-profundo`; à direita (8 col) o `Accordion`, itens em `superficie` `r-card` e `+` em círculo branco. O primeiro item vem aberto.

### Galeria + CTA final (`#cta`): padrão Eduzz (fotos se juntando) + Gaia (cartão "Hoje")
Primeiro a galeria que se junta (§7.13); no espaço aberto no centro entram o H2, o texto e o botão do `COPY.md` 3.16. Em seguida, o shell `--grad-vinho` com o cartão de vidro "Hoje" (linha do tempo do `COPY.md` 3.16) ao lado de um celular saindo pela base. No mobile, a galeria vira uma grade 2×3 estática acima do shell.

### Rodapé: padrão NextPay
`FooterBanner` (§6.31), depois colunas de links (`COPY.md` 3.18), `EmergencyBar`, "Voltar ao topo" (rola com Lenis até o topo) e o texto legal.

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
- ❌ Animações fora do padrão dos sites de referência (§2.1) e do §7: nada de efeitos chamativos (rotação 3D, glitch, texto embaralhando fora do hash).
- ❌ Fontes ou cores fora do design system do app (§3.1 e §4). As referências valem só para composição, fotografia e movimento.
- ❌ Rótulos em CAIXA-ALTA, fonte monoespaçada para dados, "→" no texto dos botões.
- ❌ Bento com cartões todos iguais e a mesma sombra cinza em tudo.
- ❌ Gradientes com matizes novos (roxo, pêssego, lilás). Só `--grad-vinho`, `--grad-suave`, `--grad-hero`, `--grad-secao`, `--grad-painel` e opacidades das cores do app (declarar os gradientes em `:root`).
- ❌ Seção só de texto, sem visual e sem detalhes flutuantes (§9.0).
- ❌ Hero dentro de card; cartões ou fotos com topo em pílula/arco.
- ❌ Inventar textos, números, depoimentos, avaliações ou "50 mil usuárias". O projeto é um TCC: nada de prova social falsa.
- ❌ Botões de App Store / Google Play. Só "Acessar o Amparo".
