# NOTES — decisões de implementação

Registro das escolhas feitas onde `CLAUDE.md`, `DESIGN.md` e `COPY.md` não definiam algo, ou divergiam entre si.

## Fase 0 — Skills
- Todas as skills foram instaladas antes do início (`.agents/skills/`, com links em `.claude/skills/`). Conferido com `npx skills ls`: copywriting, design-taste-frontend, frontend-design, ios-design, remotion-best-practices, ui-taste e web-design-guidelines.
- As pastas das skills (~41 MB) ficam **fora do git**. O `skills-lock.json` é versionado e permite reinstalá-las.
- Prioridade em caso de conflito (CLAUDE.md): `DESIGN.md`/`COPY.md` → `frontend-design` → `web-design-guidelines` → `design-taste-frontend`, `copywriting` e `remotion-best-practices` só nas partes autorizadas. Da `design-taste-frontend` **não** serão rodados `start.mjs`, `deal.mjs`, `moments.mjs pick`, `gate.mjs --start` nem `copy-lint.mjs`; só os verificadores de layout, performance e screenshot, na Fase 5.

### Resumo da skill uizze (`npx skills add https://uizze.sh/`)
Instalou **duas** skills da Uizze, ambas com licença Apache-2.0, derivadas do projeto open source *impeccable*:
- **`ui-taste`**: fluxo "anti-UI-slop" para web e iOS. Ler o brief e o sistema existente antes de desenhar; pesquisar referências; aplicar um checklist de acabamento (hierarquia, consistência visual, navegação, movimento); e, quando houver gerador de imagem, criar primeiro uma imagem-alvo da tela e então implementar 1:1, comparando screenshots. Diz explicitamente que o pedido do usuário e as restrições do projeto (o `DESIGN.md`) vêm antes dela.
- **`ios-design`**: o mesmo fluxo aplicado a apps iPhone (SwiftUI/UIKit/React Native), com as Human Interface Guidelines. Não se aplica à landing; pode ser útil só como referência de fidelidade das telas do app nos mockups.
- **Restrição:** a parte gratuita funciona sem conta. As referências reais, fontes e ícones vêm do **MCP da Uizze, que é pago e exige conexão**. Pela regra do CLAUDE.md, ele **não será usado**. Também não será usado o passo de "gerar imagem-alvo", porque o alvo já está definido pelos wireframes do `DESIGN.md` e pelas referências do cliente.
- **Uso no projeto:** o checklist de acabamento e de crítica com screenshots (`reference/anti-slop-craft.md`, `reference/polish.md`, `reference/audit.md`) nas Fases 3 e 5, sem mudar cores, fontes, movimento ou copy.

## Direção visual preferida pelo cliente
O cliente destacou as referências **01 (Curely), 03 (Finexa), 06 (Moonsync), 08 (BeautyCenter) e 11 (Task.io)**, "algo mais para **fintech moderna**". Isso guia o acabamento a partir da Fase 2, sempre dentro das cores e fontes do app:
- base **clara e arejada**: branco + aura `--grad-suave`, muito espaço em branco e containers arredondados recuados das bordas (01, 11);
- **o app como protagonista**: celulares nítidos com telas codadas, **cartões de UI flutuando** ao redor com sombra quente e suave, e números/estados reais (01, 03, 11);
- **bento limpo**, com cartões de borda fina e mini-ilustrações codadas (01, 03);
- **fotografia calma**, com luz natural e mulheres serenas com o celular, usada nas seções internas (06, 08);
- **vidro** em chips e header, e **selo circular** (08);
- tipografia grande e firme, com tracking negativo, e números grandes (03).
- As seções escuras exigidas pelo `DESIGN.md` (`#disfarce`, rodapé) e o marquee continuam, mas com acabamento sóbrio, para não puxar a página para o lado "editorial escuro" (refs. 07 e 10).

## Fase 1 — Ambiente
- **Scaffold:** `npm create vite` não roda numa pasta não vazia sem prompt. O template `react-ts` foi gerado numa pasta temporária e copiado para cá, sem os arquivos de demonstração (logos do Vite/React, `App.css`).
- **Versões:** Vite 8, React 19, TypeScript 7, Tailwind 4.3, GSAP 3.15 (SplitText e DrawSVGPlugin inclusos no pacote `gsap`), Lenis 1.3.
- **Lint:** mantido o `oxlint` que vem no template atual do Vite (`npm run lint`).
- **`sharp`** (devDependency) adicionado para processar as fotos e gerar favicons: `npm run images` (`scripts/process-images.mjs`).
- **Prettier** com `prettier-plugin-tailwindcss` (`npm run format`). Markdown fica de fora para não reformatar os documentos do kit.
- **`.env`**: só `.env.example` é versionado. Sem `VITE_APP_URL` definido, os CTAs vão usar o valor do exemplo (a tratar na Fase 2).
- **`netlify.toml`**: além do build, cache longo para `/assets/*` (arquivos com hash) e de 7 dias para `/images/*`.

### Marca
- `assets/brand/` → `src/assets/brand/` e `assets/app-screens/` → `src/assets/app-screens/` (via `git mv`). `assets/referencias/` e `assets/fotos/` (originais) continuam onde estão.
- **SVGs da marca** gerados por `npm run logos` (`scripts/build-logos.mjs`) a partir do vetor enviado, `LogoAmparo1.svg` (logo vertical). O original foi mantido como fonte. Ajustes feitos no script:
  - cor `#9F5773` → token `vinho` `#954B6E` (DESIGN.md §3.1);
  - fundo `#F6F2F0` removido (não é cor do app);
  - os furos das letras (A, p, a, o) estavam pintados com a cor do fundo; viraram vazados (`fill-rule="evenodd"`), para o logo funcionar sobre qualquer fundo;
  - o filete rosa-claro `#F1D7E0` entre a gota e a curva inferior foi removido (a fenda passa a mostrar o fundo).
- Arquivos gerados: `amparo-simbolo.svg` / `-branco.svg`, `amparo-logo-vertical.svg` e `amparo-logo-horizontal.svg` / `-branco.svg`. A versão **horizontal** não existia em vetor: foi montada com o símbolo e o "Amparo" do vertical, nas proporções medidas no PNG horizontal do kit (símbolo ≈ 2,42× a altura do "A"; espaço e descida da base ≈ 0,32× o "A"). Conferida lado a lado com o PNG.
- Os PNGs do kit continuam em `src/assets/brand/` como referência; o código usa os SVGs.
- Uma primeira versão do símbolo foi vetorizada do PNG com potrace e descartada quando o vetor oficial chegou.
- Favicons gerados do símbolo vetorial: `favicon.svg`, `favicon-32.png` (transparente), `apple-touch-icon.png` (180, fundo branco) e `icon-512.png`.

### Fotos (`assets/fotos/` → `public/images/`)
O hero **não tem foto** (DESIGN.md atualizado: fundo branco + véu vinho). Todos os originais ficam numa pasta só, `assets/fotos/`: os que estão em uso têm o nome do slot; os demais têm nomes descritivos e servem de alternativa.

| Slot | Seção | Foto | Recorte |
|---|---|---|---|
| `contexto` | `#contexto` (StatCard foto, do DESIGN.md revisado) | Mulher na janela segurando uma caneca, de perfil, serena | 4:5 (original) |
| `rede-duas-mulheres` | `#rede` (ArchPhoto) | Três amigas no banco, mão no ombro | 3:4 |
| `ajudar` | `#ajudar` (ArchPhoto) | Duas amigas conversando de perto no sofá, uma com a mão no braço da outra | 3:4 (original) |
| `direitos-1` | Lei Maria da Penha, explicada | Mão escrevendo num caderno, luz natural | 3:5 (PhotoCard com topo em pílula) |
| `direitos-2` | Como pedir uma medida protetiva | Mão segurando o celular | 3:5 |
| `direitos-3` | Monitoramento eletrônico do agressor | Duas mãos se tocando sobre a mesa, com xícaras | 3:5 |
| `direitos-4` | Sinais de relacionamento abusivo | Mulher de costas olhando a cidade pela janela | 3:5 |
| `cta-final` (+ `cta-final-mobile` 4:5) | CTA final | Mulher de costas caminhando na calçada arborizada ao entardecer | 16:9 (original); mobile centrado na figura |

- A segunda leva de fotos corresponde exatamente às descrições do DESIGN.md §8 (detalhes sem rosto em `#direitos`, amigas no sofá em `#ajudar`, caminhada de costas no CTA) e substituiu a primeira nesses slots.
- O nome `rede-duas-mulheres` foi mantido (slot do DESIGN.md §8), embora a foto tenha três mulheres, para a troca continuar sendo só substituir o arquivo.
- **Alternativas** (em `assets/fotos/`, sem slot no DESIGN.md): `mulher-celular-janela-16x9` e `mulher-celular-poltrona-4x5` (mesma mulher, com o celular, no estilo da ref. 06 Moonsync), `mulher-caminhando-calcada-frente` (a antiga do CTA), `mulher-janela-sorrindo-celular`, `mulher-sofa-lendo-celular`, `mulher-rua-sorrindo-celular`, `mulher-costas-olhando-mar` e `mulher-mostrando-celular-a-senhora` (**atenção:** esta tem um crachá com a marca grafada errado, "Ampore"; se for usada, recortar acima dele).
- Saídas: AVIF + WebP nas larguras do srcset até o tamanho do original e um `.jpg` de fallback com o nome do slot. Maior arquivo: 177 KB (limite de 300 KB). O script apaga as saídas antigas de cada slot antes de gerar. As dimensões ficam em `src/content/images.json` para o `srcset` e o `width`/`height`.
- **Pendente:** `og-image.jpg` (1200×630). Pelo DESIGN.md §8 ela é gerada com o celular mostrando a `HomeScreen`, que só existe a partir da Fase 2; será gerada na Fase 5. Até lá, a meta `og:image` aponta para um arquivo que ainda não existe.

## Fase 2 — Fundações
- **Skill `frontend-design`** lida antes da fase. Como o `DESIGN.md` já fixa cores, fontes, layout e movimento (e vence em conflito), dela foram usados o processo (construir → criticar com screenshots) e a regra de concentrar a ousadia num só lugar (o desbloqueio do hero).
- **`src/content/copy.ts`**: todos os textos do `COPY.md`, transcritos palavra por palavra e tipados. Ênfases do COPY (`**`/`*`) viram `Rich`/`Lead` e são renderizadas por `RichText`/`LeadText`. Os textos que aparecem **dentro** das telas do app (`app.home`) vêm das telas do protótipo; os dos cartões flutuantes (`ui`), do DESIGN.md §6.6/§9.
- **Telas codadas em 390×845 px "do app"** (9:19,5), com medidas tiradas de `home-sos.png` e `modo-disfarce-calculadora.png` (fator 390/452). O `PhoneFrame` escala a tela com `ResizeObserver` + `transform: scale`, então as telas usam px fixos sem acumular unidades relativas, e o GSAP poderá animar teclas e elementos internos na Fase 4. A moldura (bezel, raio, ilha) é proporcional à largura via container queries (`cqw`).
- **`PhoneFrame` e acessibilidade:** `label` → `role="img"` com descrição (telas não interativas, ex.: `a11y.altHome`); `decorative` → `aria-hidden`; sem nenhum dos dois, o conteúdo fica acessível (calculadora interativa).
- **Calculadora:** lógica em `useCalculator` (soma, subtração, multiplicação, divisão, %, ±, vírgula; divisão por zero → "Erro"; até 9 dígitos com fonte que encolhe). O código **só desbloqueia quando digitado sozinho** seguido de "=" (ex.: `5 + 1907 =` faz a conta). Aceita teclado físico (dígitos, `+ - * /`, `Enter`/`=`, `,`/`.`, `Esc`). Expõe `press()`/`reset()` por `ref` para a timeline do hero (`mode="auto"`). As teclas seguem a proporção em pílula da tela do app (81×72,5 px), e não círculos perfeitos.
- **Fonte da calculadora:** a tela do app usa a fonte do sistema; aqui é Nunito Sans 400 (só as duas fontes do app são permitidas e não há peso mais fino instalado).
- **Avatar da "Marina"** recortado da própria `home-sos.png` (`avatar-marina.webp`, 48 px de origem). Fica levemente suave em celulares grandes; trocar por um export em alta do protótipo quando houver.
- **Ícones da HomeScreen:** lucide-react (regra do DESIGN.md). O app usa ícones preenchidos; onde fazia sentido, os do cabeçalho e da barra inferior usam `fill`.
- **Header:** `.glass-light` com sombra quente leve; a variante `tone="dark"` já existe para a troca da Fase 4. No mobile (< 640 px) só logo + menu; entre 640 e 1023 px, logo + "Acessar o Amparo" + menu; ≥ 1024 px, links completos. A folha do menu usa `vinho-profundo/95` + blur (não o `.glass-vinho` de 35%), porque com 35% de opacidade sobre a página clara o texto branco não teria contraste AA. Com a folha aberta, a pílula passa para a versão escura. A folha trava o scroll, foca o primeiro link e fecha com Esc (foco volta ao botão).
- **Fallback sem `backdrop-filter`:** `.glass`/`.glass-vinho` → `vinho-profundo/85` (DESIGN.md); `.glass-light` → branco a 96%, porque sobre ele o texto é escuro.
- **Para a Fase 4:** o hide/show do header deve animar a pílula interna, não o `<header>` — um `transform` no `<header>` tornaria ele o contêiner do menu `fixed`.
- **Ferramentas de verificação:** `playwright-core` (devDependency) com o Chrome instalado; `node scripts/shoot.mjs <url> <pasta> [larguras] [--full] [--selector=css]` tira screenshots e informa scroll horizontal e erros de console.
- Página de componentes: **`/#kit`** (telas codadas lado a lado com as originais; a calculadora funciona).

## Fase 3 — Seções (estáticas e responsivas)
- **Tela inicial do app atualizada:** o cliente enviou `inicio-celular.png` (1170×2532, a versão atual). A `HomeScreen` foi refeita a partir dela: iniciais "MA" no lugar da foto, "Esta semana" sem ocorrências marcadas, cartão "Leitura de risco" (IA) e ações rápidas novas. O DESIGN.md §6.5 descreve a versão antiga; vale a imagem nova. `home-sos.png` fica como referência histórica.
- **Ordem e estrutura:** as 16 seções seguem a ordem do COPY.md (o marquee saiu no DESIGN.md revisado). `Sos`, `Cofre`, `Rede` e `Risco` ficam juntas em `sections/Pilares.tsx`.
- **"O produto é a ilustração":** cada seção de recurso mostra um fragmento real do app, codado a partir das telas do protótipo (`AlertScreen`, `ProofScreen`, cartão "Quem foi avisada", "Prova verificada" com hash, guardiãs da tela `rede-de-apoio.png`, cartão de leitura de risco, mini-telas do cadastro). Os textos desses fragmentos estão em `copy.ts` → `app`/`ui`, copiados das telas.
- **Rede de apoio:** 3 guardiãs são as da tela do app (Ana Beatriz — principal, Rafaela, Lúcia); as outras 2 posições aparecem como vagas livres ("até 5"), para não inventar pessoas.
- **Cartões de direitos** são links para o app (`VITE_APP_URL`), já que o conteúdo completo está na Central de Conteúdo e Direitos; o botão redondo de vidro indica isso.
- **Calculadora interativa:** ao destravar, a tela inicial abre em círculo a partir da tecla "=" (transição de `clip-path` em CSS, sem GSAP; com movimento reduzido abre direto).
- **Modo Disfarce no mobile:** sem pin; o celular fica "grudado" (sticky) numa coluna estreita ao lado dos passos, para continuar visível enquanto eles rolam.
- **Hero em 360px:** o H1 usa `clamp(2.5rem, 12.4vw, 3rem)` abaixo de 768px (≈45px em 360px), porque com 48px "Você não está" quebrava em 3 linhas; assim mantém as 2 linhas pedidas no DESIGN.md §4. O selo circular aparece só a partir de 1024px (em 768px cobria o celular lateral).
- **CSS em camadas:** os estilos de `TintedPhoto` (`.tinted`) ficam em `@layer components`; fora de camada eles venciam as utilidades do Tailwind (`absolute`) e as fotos ficavam com altura zero.
- **Microtexto novo** (não está no COPY.md — para o cliente revisar):
  - "Perguntas frequentes" — H2 do FAQ (a seção não tinha título, e cada seção precisa de um para acessibilidade); também no rodapé.
  - "Ver de novo" (hero, DESIGN.md §7.1), "Testar de novo" (SOSDemo concluído), "Voltar à calculadora" (calculadora interativa).
  - "Pular para o conteúdo" (link de acessibilidade) e "— Ler no Amparo" (só para leitores de tela, nos cartões de direitos).
  - Mini-telas de "Como começar": "E-mail", "Digite seu e-mail", "Seu código" (as demais — "Etapa 1…4", "Adicionar guardiã", "Tudo pronto", "Guardiã principal" — vêm do DESIGN.md e das telas do app).
  - Legenda da rede "Guardiã principal: Ana Beatriz" e os textos alternativos dos celulares e da rede.
  - "Stack" e "Equipe" (rótulos que já aparecem no COPY.md 3.14).
- **Scripts de verificação:** `node scripts/shoot-sections.mjs <url> <pasta> [larguras]` tira um screenshot por seção e informa scroll horizontal e erros. Conferido em 360, 768 e 1280px: sem scroll horizontal e sem erros de console.
