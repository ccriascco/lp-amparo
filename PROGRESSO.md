# PROGRESSO — Landing page do Amparo

> Leia este arquivo antes de qualquer coisa. Ele diz onde o trabalho parou. Detalhes de cada decisão estão no `NOTES.md`.

Última atualização: 10/11/2026 · Repositório: https://github.com/ccriascco/lp-amparo (branch `main`)

---

## Situação atual
Estamos na **rodada 2**: a página está sendo refeita seção por seção, de cima para baixo, seguindo o `DESIGN.md` (§2.1 e §9) e o `COPY.md` revisados, com base nos 5 sites de referência (Gaia, Gardance, Eduzz, NextPay, FitPay).

Do preloader até `#dores` já está tudo na rodada 2 (ordem atual: hero → marquee → `#contexto` → `#pessoas` → `#dores`). Da seção `#disfarce` para baixo ainda são as seções da rodada 1 (bento, pilares separados etc.), que serão substituídas uma a uma.

**Parado para revisão do cliente ao final do item 4.**

## Itens concluídos
| Item | O que é | Commit |
|---|---|---|
| 0 | Base: tokens novos (raios, `--grad-hero/secao/painel`, `display-xl` em uma linha), `lib/appear.ts` (aparecer no scroll e títulos palavra por palavra), `copy.ts` do COPY novo, remoção de "O projeto", fotos novas/provisórias | `bc56f50` |
| 1 | Preloader + Header + Hero (abertura, desbloqueio, notificações empilhadas, celular girando ao sair, header que vira pílula) | `9f9f0f8` |
| 1b | H1 do hero com ~32px no celular (`clamp(1.625rem, 8.4vw, 4.75rem)`) | `81288e3` |
| 2 | Números + Marquee (`StatsBand`, `Marquee`) — revisados nos Ajustes 2 | `a1d140c` |
| 3 | Manifesto (`PeopleScatter`, padrão Gaia) | `e1447b7` |
| 4 | Dores (`QuestionStage`, padrão Gardance) | `c481b47` |
| 1c | Ajustes do hero e do header (logo alinhado, central reto, telas Rede/Ocorrências/home-sos, sem onda, celulares inteiros flutuando, base dissolvendo) — screenshots em `./screenshots/ajustes-hero/` | `5ee052a` |
| 1d/2b | Ajustes 2: logo oficial (PNG recortado), círculos por cima da moldura, marquee antes dos números e sem pausa, números em cartões, fonte no rodapé — screenshots em `./screenshots/ajustes-2/` | `911c220` |
| 2c/3b | Ajustes 3: números + contexto numa seção `#contexto` (shell rosado, bento com foto e flutuantes); fotos espalhadas viram `#pessoas`; token `--grad-rosa`; regra de fundos — screenshots em `./screenshots/ajustes-3/` | `adb7e93` |
| 3c | Ajustes 3b: `#contexto` com fundo branco (sem shell) e foto definitiva `numeros` — screenshots em `./screenshots/ajustes-3b/` | `be4cb8e` |
| 3d | Ajustes 4: foto do `#contexto` sem tingimento; `#pessoas` em shell rosado com divisória e 11 fotos — screenshots em `./screenshots/ajustes-4/` | (este commit) |

Rodada 1 (base técnica reaproveitada): `acf5a91` (ambiente), `8d07a22` (fundações), `005fa86` (seções), `b3abcac` (movimento).

## Próximo passo
1. **Revisão do cliente** dos itens 2, 3 e 4 (screenshots em `./screenshots/rodada-2/item-2/`, `item-3/` e `item-4/`, incluindo `reduce/` com movimento reduzido). Aplicar os ajustes pedidos antes de seguir.
2. **Item 5 — Modo Disfarce** (`StepShowcase` §6.28b + §7.2, padrão Gaia 01/04).

Pendências conhecidas: em 320px a página tem 23px de scroll horizontal vindo do bento de Recursos da rodada 1 (some no item 6, com o `FeatureStack`); aviso "chunk > 500 kB" no build (Fase 5).

Depois (itens 5–16): Modo Disfarce, Recursos (`FeatureStack`), Seus direitos, Mitos e verdades, Segurança, Como começar (`PhotoStage`), Cartão de acesso, Para quem quer ajudar, FAQ, Galeria + CTA final, Rodapé e passada final (parallax, performance com CPU 4×, movimento reduzido). Depois, Fase 5 (revisão completa).

## Decisões aprovadas pelo cliente
- **Pílula do header com 920px** (o §7.11 diz 880px; com 880 "Como funciona" e "Seus direitos" quebravam em duas linhas).
- **Header sempre visível** (não some ao rolar; vira pílula compacta a partir de 80px, como na Gardance).
- **H1 do hero com ~32px no celular**, mantendo uma linha. **Aplicado:** `clamp(1.625rem, 8.4vw, 4.75rem)` → 32,8px em 390, 30,2px em 360, 26,9px em 320 (o `8.2vw` com mínimo de 1.75rem estourava em 320px).
- **Fotos provisórias** (alternativas de `assets/fotos/`): `sos` (espelhada), `risco`, `comecar-2`, `comecar-3` (recortada acima do crachá "Ampore", que não existe nos arquivos gerados).
- **Placeholders** (`--grad-vinho` + gota): `cofre`, `comecar-1`, `comecar-4`. Para trocar: coloque a foto em `assets/fotos/` com o nome do slot, ajuste o recorte em `scripts/process-images.mjs` (lista `SLOTS`, removendo da lista `PLACEHOLDERS`) e rode `npm run images`.
- ~~Inclinação 3D do celular do hero~~ — **revogada** pelos ajustes de 10/11/2026 abaixo.

### Ajustes do hero e do header (10/11/2026) — têm prioridade sobre o `DESIGN.md`
1. ~~Logo do header alinhado no SVG gerado~~ — **substituído** pelo item 1 dos "Ajustes 2" abaixo (logo oficial em PNG).
2. **Celular central reto e centralizado o tempo todo:** sem rotação nem inclinação 3D. Ao rolar, só sobe um pouco (`yPercent 0 → −6`). **Substitui a linha "Celular central do hero" do §7.9.** Os laterais continuam abrindo o leque.
3. **Telas dos celulares do hero, todas em código e fiéis a `assets/app-screens/`:** central = calculadora → tela inicial (`home-sos.png`); esquerdo = Rede de apoio (`rede-de-apoio.png`); direito = Ocorrências (`ocorrencias.png`). Saem as telas "Alerta enviado" e "Prova verificada" dos celulares; as notificações flutuantes continuam.
4. **Desbloqueio sem a onda:** o fundo rosa (`--grad-hero`) e os anéis ficam visíveis desde o carregamento. Removida a revelação em onda com `clip-path` do §7.1. No "=", só a tela do celular muda (crossfade para a tela inicial) com um pulso suave de luz dentro da tela, saindo da tecla "=".
5. **Base do hero sem corte:** os 3 celulares aparecem inteiros (sem `overflow-hidden` cortando); depois de abertos flutuam devagar (`y ±10px`, 5–7s, `sine.inOut`, `yoyo`, cada um num ritmo); o fundo do hero se dissolve no branco da seção seguinte num degradê de 200px, sem linha ou borda; o hero ficou mais alto para caber os celulares.

### Ajustes 2 — header, hero, marquee e números (10/11/2026) — têm prioridade sobre o `DESIGN.md`
1. **Logo do header = arquivo oficial:** `src/assets/brand/amparo-logo-horizontal-vinho.png` (e `-branco.png` sobre fundo escuro), com as margens transparentes recortadas (`*-recortado.png`, 112px de altura). **Nunca** recriar o logo com texto em Quicksand. Altura de 28px no header normal e 24px no compacto.
2. **Círculos rosa com ícone dos celulares laterais por cima de tudo** (acima do `PhoneFrame`), sobrepondo a borda superior do celular, como na Task.io.
3. **Marquee logo depois do hero, antes da faixa de números**, passando infinito e contínuo: **sem botão de pausa e sem pausar no hover**. Parado só com `prefers-reduced-motion`. Itens e gotas mantidos.
4. **Faixa de números em cartões** (substitui as colunas com divisória do §6.24; **layout revisto nos Ajustes 3**): 4 cartões lado a lado (2×2 no celular), fundo branco, borda 1px `borda`, raio 20px, padding 28–32px (20px abaixo de 640px, para caber em 320px), mesma altura; ícone lucide num círculo vinho de 40px com ícone branco no topo; número grande Quicksand `tabular-nums` com contador e rótulo embaixo; **101.656 em destaque** (`--grad-vinho`, textos brancos); hover sobe 4px com `shadow-float`; entrada com `appear` em stagger. Título "Por que o Amparo existe" à esquerda, acima.
5. **Fonte dos números no rodapé:** "Dados: 19º Anuário Brasileiro de Segurança Pública, FBSP, 2025", em texto pequeno junto do texto legal. Saiu da faixa de números.

### Ajustes 3 — números + contexto e cor da home (10/11/2026) — têm prioridade sobre o `DESIGN.md`
1. **Uma seção só, `#contexto`:** junta a faixa de números e o cabeçalho do contexto. **Sem** o título "Por que o Amparo existe"; usa o H2 e o texto do COPY 3.2c. A parte das fotos espalhadas (`PeopleScatter`, frase "Por trás de cada número…") vem logo depois, como seção própria (`#pessoas`).
2. **Layout (Finexa "About" + bento, ref-03):** cabeçalho em duas colunas (H2 em 7 col, no máximo 2 linhas a 1440; texto em 5 col; alinhados pela base). Abaixo, grid 12 col: cartões de número 2×2 em 7 col (ícone, número, rótulo; 101.656 em `--grad-vinho`; padding 32px; número maior; rótulo até 2 linhas) e foto vertical `numeros.jpg` (`TintedPhoto`, raio 20px) em 5 col, com a altura do 2×2. Sobre a foto, saindo levemente pelas bordas, com `shadow-float`: cartão de vidro "Ligue 180 · Gratuito, sigiloso, 24 horas" (link `tel:180`) no canto inferior esquerdo e `NotificationCard` "Alerta enviado · Sua rede foi avisada · agora" no superior direito. Celular: cabeçalho empilhado, foto 4:5 primeiro (flutuantes por dentro), depois o 2×2. Foto: `assets/fotos/numeros.png` (mulher concentrada no celular, no sofá), recorte 4:5.
3. ~~Shell colorido rosado~~ — **revogado** (10/11/2026): a pedido do cliente, `#contexto` fica com **fundo branco**, sem shell. Cartões brancos com borda 1px `borda` + sombra suave `--shadow-card` (só a sombra não separava o cartão do fundo branco). O token `--grad-rosa` continua disponível para as seções rosadas da tabela abaixo.
4. **Regra de fundos:** nenhuma seção clara em branco puro seguida de outra branca. As claras alternam entre **branco** e **rosado** (`--grad-rosa`, com manchas de vinho visíveis). Vale para todas as seções que ainda vão ser construídas (mapa abaixo).
5. **Animação:** H2 palavra por palavra saindo do desfoque; cartões com `appear` em stagger e contador; foto com revelação por máscara de baixo para cima e parallax interno leve; os dois flutuantes entram 0,2s depois da foto e depois flutuam devagar (`y ±6px`).

### Ajustes 4 — foto natural e seção das fotos espalhadas (10/11/2026) — têm prioridade sobre o `DESIGN.md`
1. **Foto do `#contexto` nas cores originais:** sem o tingimento vinho do §6.18 (exceção; as outras fotos continuam tingidas). `TintedPhoto natural`.
2. **`#pessoas` com fundo próprio e divisória:** shell rosado recuado (`mx-3 md:mx-4`, raio 32px), com borda clara entre as seções; o fundo não esmaece mais no branco.
3. **Mais fotos em `#pessoas`:** 11 fotos pequenas (eram 8) + a central. As de baixo passam pelas laterais, fora da largura da frase, para nunca cobrir o texto.

### Fundos das seções (regra dos Ajustes 3)
| # | Seção | Fundo |
|---|---|---|
| 1 | Hero | `--grad-hero` (dissolve no branco na base) |
| 2 | Marquee | branco (fios `borda`) |
| 3 | `#contexto` | branco (pedido do cliente; ver nota abaixo da tabela) |
| 4 | `#pessoas` | **rosado** — shell `--grad-rosa` (mx-3 md:mx-4, raio 32px) com a nuvem do palco; divisória clara, sem esmaecer no branco |
| 5 | `#dores` | `vinho-profundo` (escura) |
| 6 | `#disfarce` | shell `vinho-profundo` (escura) sobre margem branca |
| 7 | `#recursos` | branco |
| 8 | `#direitos` | **rosado** (`--grad-rosa`) |
| 9 | `#mitos` | branco |
| 10 | `#seguranca` | `vinho-profundo` (escura) |
| 11 | `#comecar` | branco (palco com foto) |
| 12 | `#acesso` | **rosado** (`--grad-rosa`) — no DESIGN era branco; muda para não ficar branco + branco depois de `#comecar` |
| 13 | `#ajudar` | branco |
| 14 | `#faq` | **rosado** (`--grad-rosa`) |
| 15 | Galeria + CTA | branco → shell `--grad-vinho` |
| 16 | Rodapé | `vinho-profundo` |
As seções 6 a 16 ainda são da rodada 1; o fundo da tabela entra quando cada uma for refeita.
**Exceção aprovada:** marquee e `#contexto` ficam brancos em sequência, por decisão do cliente (o fundo rosado do `#contexto` foi retirado). A alternância vale do `#pessoas` (shell rosado) em diante.

## Ajustes pendentes (escreva aqui o que quer mudar nos itens 1–4)
- [ESCREVA AQUI O QUE VOCÊ QUER AJUSTAR]

## Regra de trabalho (obrigatória)
- **Toda seção passa pela rotina de 5 passos do `CLAUDE.md`** (Fase 0, "Rotina obrigatória por seção"):
  1. mini-plano no `NOTES.md` (wireframe do §9, site de referência, o que a torna memorável, revisão contra o brief);
  2. construir com o acabamento da `design-taste-frontend`;
  3. animar comparando lado a lado com o site de referência;
  4. criticar com screenshots em **1440 e 390**;
  5. revisar os arquivos da seção com a `web-design-guidelines`; depois, **um commit por seção** e push.
- **Screenshots vão para `./screenshots/rodada-N/`** (ex.: `./screenshots/rodada-2/item-2/`). Os do item 1 já estão em `./screenshots/rodada-2/item-1/`.
- Scripts úteis: `node scripts/shoot.mjs <url> <pasta> [larguras] [--full]`, `node scripts/shoot-sections.mjs <url> <pasta> [larguras]` (usam o Chrome instalado via `playwright-core`; em outro sistema, defina `CHROME_PATH`). `?intro` na URL força o preloader. Para seções fixas: `node scripts/shoot-scroll.mjs <url> <pasta> --sel=#secao --w=1440,390 --at=0,0.5,1 [--reduce]` (pula o preloader e fotografa em pontos do scroll).

## Como retomar em outro computador
```bash
git clone https://github.com/ccriascco/lp-amparo.git
cd lp-amparo
npm install
cp .env.example .env        # e preencha VITE_APP_URL
npm run dev                  # http://localhost:5173  (e /#kit para os componentes)
```

### Skills (não estão no git — `.agents/` e `.claude/skills/` estão no `.gitignore`)
Reinstale com um comando por vez (versões registradas no `skills-lock.json`):
```bash
npx -y skills add https://github.com/anthropics/skills --skill frontend-design -y
npx -y skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines -y
npx -y skills add https://github.com/leonxlnx/taste-skill --skill design-taste-frontend -y
npx -y skills add https://github.com/coreyhaines31/marketingskills --skill copywriting -y
npx -y skills add https://github.com/remotion-dev/skills --skill remotion-best-practices -y
npx -y skills add https://uizze.sh/ -y
npx skills ls
```

### Variáveis de ambiente
- O arquivo `.env` **não** está no git (ignorado pelo `.gitignore`); só o `.env.example` é versionado.
- Variável necessária: **`VITE_APP_URL`** — endereço do web app do Amparo na Netlify (ex.: `https://SEU-APP.netlify.app`). Todos os botões "Acessar o Amparo" e "Entrar" usam ela. Sem ela, os botões apontam para o endereço de exemplo.

### O que está no git
- Fotos originais em `assets/fotos/` (16) e otimizadas em `public/images/` (AVIF/WebP/JPG) — versionadas.
- Telas do app e marca em `src/assets/`, referências em `assets/referencias/`, screenshots em `screenshots/`.
