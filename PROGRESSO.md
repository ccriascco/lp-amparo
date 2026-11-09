# PROGRESSO — Landing page do Amparo

> Leia este arquivo antes de qualquer coisa. Ele diz onde o trabalho parou. Detalhes de cada decisão estão no `NOTES.md`.

Última atualização: 09/11/2026 · Repositório: https://github.com/ccriascco/lp-amparo (branch `main`)

---

## Situação atual
Estamos na **rodada 2**: a página está sendo refeita seção por seção, de cima para baixo, seguindo o `DESIGN.md` (§2.1 e §9) e o `COPY.md` revisados, com base nos 5 sites de referência (Gaia, Gardance, Eduzz, NextPay, FitPay).

As seções abaixo do hero ainda são as da rodada 1 (bento, pilares separados etc.) e serão substituídas uma a uma.

## Itens concluídos
| Item | O que é | Commit |
|---|---|---|
| 0 | Base: tokens novos (raios, `--grad-hero/secao/painel`, `display-xl` em uma linha), `lib/appear.ts` (aparecer no scroll e títulos palavra por palavra), `copy.ts` do COPY novo, remoção de "O projeto", fotos novas/provisórias | `bc56f50` |
| 1 | Preloader + Header + Hero (abertura, desbloqueio, notificações empilhadas, celular girando ao sair, header que vira pílula) | `9f9f0f8` |

Rodada 1 (base técnica reaproveitada): `acf5a91` (ambiente), `8d07a22` (fundações), `005fa86` (seções), `b3abcac` (movimento).

## Próximo passo
Fazer os **itens 2, 3 e 4**, nesta ordem, e **parar ao final do item 4 para revisão do cliente**:
1. **Item 2 — Números + Marquee** (`StatsBand` §6.24 + `Marquee` §6.25; contadores §7.3).
2. **Item 3 — Manifesto** (`PeopleScatter` §6.26 + §7.12, padrão Gaia "é sobre pessoas").
3. **Item 4 — Dores** (`QuestionStage` §6.32 + §7.12, padrão Gardance "pergunta fixa").

Antes do item 2, aplicar a decisão aprovada do **H1 com ~32px no celular** (ver abaixo).

Depois (itens 5–16): Modo Disfarce, Recursos (`FeatureStack`), Seus direitos, Mitos e verdades, Segurança, Como começar (`PhotoStage`), Cartão de acesso, Para quem quer ajudar, FAQ, Galeria + CTA final, Rodapé e passada final (parallax, performance com CPU 4×, movimento reduzido). Depois, Fase 5 (revisão completa).

## Decisões aprovadas pelo cliente
- **Pílula do header com 920px** (o §7.11 diz 880px; com 880 "Como funciona" e "Seus direitos" quebravam em duas linhas).
- **Header sempre visível** (não some ao rolar; vira pílula compacta a partir de 80px, como na Gardance).
- **H1 do hero com ~32px no celular**, mantendo uma linha até 360px. **Ainda não aplicado** — hoje está com o `clamp(1.625rem, 6.6vw, 4.75rem)` do §4 (26px em 390px). Sugestão: `clamp(1.75rem, 8.2vw, 4.75rem)` e conferir em 320/360/390.
- **Fotos provisórias** (alternativas de `assets/fotos/`): `sos` (espelhada), `risco`, `comecar-2`, `comecar-3` (recortada acima do crachá "Ampore", que não existe nos arquivos gerados).
- **Placeholders** (`--grad-vinho` + gota): `cofre`, `comecar-1`, `comecar-4`. Para trocar: coloque a foto em `assets/fotos/` com o nome do slot, ajuste o recorte em `scripts/process-images.mjs` (lista `SLOTS`, removendo da lista `PLACEHOLDERS`) e rode `npm run images`.
- **Inclinação 3D do celular do hero** (§7.9) liberada pelo cliente, apesar do §11 genérico.

## Ajustes pendentes no hero
- [ESCREVA AQUI O QUE VOCÊ QUER AJUSTAR]

## Regra de trabalho (obrigatória)
- **Toda seção passa pela rotina de 5 passos do `CLAUDE.md`** (Fase 0, "Rotina obrigatória por seção"):
  1. mini-plano no `NOTES.md` (wireframe do §9, site de referência, o que a torna memorável, revisão contra o brief);
  2. construir com o acabamento da `design-taste-frontend`;
  3. animar comparando lado a lado com o site de referência;
  4. criticar com screenshots em **1440 e 390**;
  5. revisar os arquivos da seção com a `web-design-guidelines`; depois, **um commit por seção** e push.
- **Screenshots vão para `./screenshots/rodada-N/`** (ex.: `./screenshots/rodada-2/item-2/`). Os do item 1 já estão em `./screenshots/rodada-2/item-1/`.
- Scripts úteis: `node scripts/shoot.mjs <url> <pasta> [larguras] [--full]`, `node scripts/shoot-sections.mjs <url> <pasta> [larguras]` (usam o Chrome instalado via `playwright-core`; em outro sistema, defina `CHROME_PATH`). `?intro` na URL força o preloader.

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
