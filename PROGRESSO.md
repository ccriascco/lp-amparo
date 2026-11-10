# PROGRESSO — Landing page do Amparo

> Leia este arquivo antes de qualquer coisa. Ele diz onde o trabalho parou. Detalhes de cada decisão estão no `NOTES.md`.

Última atualização: 10/11/2026 · Repositório: https://github.com/ccriascco/lp-amparo (branch `main`)

---

## Situação atual
Estamos na **rodada 2**: a página está sendo refeita seção por seção, de cima para baixo, seguindo o `DESIGN.md` (§2.1 e §9) e o `COPY.md` revisados, com base nos 5 sites de referência (Gaia, Gardance, Eduzz, NextPay, FitPay).

Do preloader até `#dores` já está tudo na rodada 2. Da seção `#disfarce` para baixo ainda são as seções da rodada 1 (bento, pilares separados etc.), que serão substituídas uma a uma.

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
| 1d/2b | Ajustes 2: logo oficial (PNG recortado), círculos por cima da moldura, marquee antes dos números e sem pausa, números em cartões, fonte no rodapé — screenshots em `./screenshots/ajustes-2/` | (este commit) |

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
4. **Faixa de números em cartões** (substitui as colunas com divisória do §6.24): 4 cartões lado a lado (2×2 no celular), fundo branco, borda 1px `borda`, raio 20px, padding 28–32px (20px abaixo de 640px, para caber em 320px), mesma altura; ícone lucide num círculo vinho de 40px com ícone branco no topo; número grande Quicksand `tabular-nums` com contador e rótulo embaixo; **101.656 em destaque** (`--grad-vinho`, textos brancos); hover sobe 4px com `shadow-float`; entrada com `appear` em stagger. Título "Por que o Amparo existe" à esquerda, acima.
5. **Fonte dos números no rodapé:** "Dados: 19º Anuário Brasileiro de Segurança Pública, FBSP, 2025", em texto pequeno junto do texto legal. Saiu da faixa de números.

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
