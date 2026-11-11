# PROGRESSO — Landing page do Amparo

> Leia este arquivo antes de qualquer coisa. Ele diz onde o trabalho parou. Detalhes de cada decisão estão no `NOTES.md`.

Última atualização: 11/11/2026 · Repositório: https://github.com/ccriascco/lp-amparo (branch `main`)

---

## Situação atual
**Fonte da verdade dos textos e da estrutura: `COPY.md` (versão final, §3).** Onde ele contradisser o `DESIGN.md` ou o plano antigo deste arquivo, vale o `COPY.md` — exceto onde houver uma decisão do cliente registrada em "Decisões aprovadas" (essas valem sobre os dois).

### Mapa da página (COPY §3.00)
| # | Seção | Âncora | Status |
|---|---|---|---|
| 0 | Tela de abertura | — | ✅ pronta |
| 1 | Header + Hero | `#inicio` | ✅ pronta |
| 2 | Faixa de recursos (marquee) | — | ✅ pronta |
| 3 | Contexto + números | `#contexto` | ✅ pronta |
| 4 | Manifesto (fotos espalhadas) | `#pessoas` | ✅ pronta |
| 5 | Benefícios | `#beneficios` | ✅ pronta (etiqueta branca, confirmada) |
| 6 | Dores: banner + lista com celular | `#como-funciona` (itens `#dor-disfarce`, `#dor-cofre`, `#dor-rede`, `#dor-risco`, `#dor-direitos`) | ✅ pronta |
| 7 | Leitura de risco com IA | `#leitura-risco` | ✅ pronta — aguardando revisão do cliente (commit `9ef496e`) |
| 8 | Como começar | `#comecar` | ✅ pronta — palco fixo Gardance com 4 passos e cartões animados (aguardando revisão) |
| 9 | FAQ + emergência | `#faq` | ⏳ a construir (versão da rodada 1 no lugar) |
| 10 | CTA final | `#cta` | ⏳ a construir (versão da rodada 1 no lugar) |
| 11 | Rodapé | — | ⏳ a construir (versão da rodada 1, já com os links e textos do COPY 3.11) |

### Fora do plano (não serão construídas)
Removidas do código e do `copy.ts` em 10/11/2026: **Modo Disfarce** como seção própria (`StepShowcase`), **Recursos** (`FeatureStack`/bento), os pilares **SOS, Cofre, Rede e Risco** como seções separadas, as **demos "Experimente"**, **Seus direitos**, **Mitos e verdades**, **Segurança**, **Cartão de acesso**, **Para quem quer ajudar** e a **Galeria antes do CTA**. O que esses recursos mostravam agora vive nos itens das Dores (§3.6) e na Leitura de risco (§3.7).

### Seção 7 — Leitura de risco com IA: estado
O último pedido do cliente para a seção 7 está **todo implementado** (commit `9ef496e`); falta só a revisão do cliente. Pronto:
- [x] Esfera de partículas 3D com three 0.187 + @react-three/fiber 9.8 (`src/components/three/AiSphere.tsx`): 7.000 pontos (3.000 no celular) em Fibonacci, ShaderMaterial com ruído simplex 3D, atenuação por distância, degradê vinho → rosé, opacidade por profundidade; rotação Y de 40s + inclinação de até 8° pelo mouse.
- [x] 3 anéis de luz finos com "cometa" (TubeGeometry + shader de gradiente) e halo rosé/vinho pulsando atrás.
- [x] 7 pílulas de vidro em duas órbitas (28s e 40s, sentidos opostos) com profundidade (atrás: scale 0.85, opacidade 0.35, blur 1px); 5 pílulas numa órbita no celular.
- [x] 12 partículas soltas em órbitas lentas.
- [x] Embaixo, só "Como o app se adapta ao seu risco" (3 cartões iguais, pílula do nível no topo, hover/foco sobe 4px + borda vinho), sem princípios e sem a nota do protótipo (saíram em 11/11; cartões refeitos com ilustração, ver ajustes 5 no NOTES). **Sem** seletor Baixo/Médio/Alto, **sem** "Ver como chegamos nisso", **sem** legenda do FONAR, sem linha de luz e sem absorção no scroll.
- [x] Desempenho: dpr ≤ 1.5, render pausado fora da tela, 3D em `React.lazy` carregado só perto da seção (não entra no carregamento inicial), CPU 4× com mediana de 60fps.
- [x] Fallback sem WebGL / movimento reduzido: `public/images/ai-sphere.png` + pílulas paradas.
- [x] Pílulas não se sobrepõem mais: a de trás esmaece ao cruzar a da frente (medido com `scripts/check-pills.mjs`; prints em `screenshots/leitura-risco-3/`).
- [x] Anéis concêntricos iguais aos do hero atrás da esfera (no lugar da grade de pontos); sem os 3 princípios abaixo dos cartões (pedido do cliente, 11/11) — prints em `screenshots/leitura-risco-4/`.
- [x] Cartões de "Como o app se adapta ao seu risco" refeitos com ilustração montada com peças do app (Baixo: escudo + linha calma; Médio: sino + rede; Alto: 180/190 + pin), medidor por nível, movimento contínuo só na tela, carrossel no celular (`RiskLevelCards.tsx`); nota do protótipo removida (11/11) — prints em `screenshots/leitura-risco-5/`.
- [x] Cartões de volta à versão anterior (borda, pílula, 1 linha do COPY 3.7, painel embaixo; empilhados no celular), agora com as ilustrações novas no painel (11/11) — prints em `screenshots/leitura-risco-6/`.
- [x] "Como o app se adapta ao seu risco" virou uma **linha do tempo** Baixo → Médio → Alto (`RiskTimeline.tsx`): linha que se preenche com o scroll (bloco fixo ~150vh no desktop; vertical sem sticky abaixo de 1024px), marcos que acendem com anéis, medidor por nível, cartão com mini ilustração + título + 1 linha. Princípios e nota continuam fora (aguardando confirmação). Prints em `screenshots/leitura-risco-timeline/`.
- [x] Linha do tempo: a linha vai do marco Baixo ao Alto, tudo em `vinho-profundo`, ilustrações do cliente (`risco-baixo/medio/alto`) no topo dos cartões, acendendo e flutuando por nível (11/11) — prints em `screenshots/leitura-risco-timeline-4/`.
- [x] Setas entre os marcos enchem de cor com animação; a linha volta com o scroll e os níveis apagam na ordem inversa (11/11) — prints em `screenshots/leitura-risco-timeline-5/`.
- [ ] Revisão do cliente.

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
| 3d | Ajustes 4: foto do `#contexto` sem tingimento; `#pessoas` em shell rosado com divisória e 11 fotos — screenshots em `./screenshots/ajustes-4/` | `a192110` |
| 3e | Ajustes 5: fundo de `#pessoas` abrindo até a tela cheia (sem bordas laterais); 2 fotos a menos — screenshots em `./screenshots/ajustes-5/` | `8150b21` |
| 3f | Ajustes 6: fundo de `#pessoas` parado em tela cheia (sem `clip-path` e sem parallax da nuvem); fotos em camada própria — screenshots em `./screenshots/ajustes-6/` | `f62c3b0` |
| 1e/3g | Ajustes 7: central do hero com `inicio-celular`, 3 celulares no celular, `#contexto` texto → cartões → foto, fotos de `#pessoas` naturais e com movimento no celular — screenshots em `./screenshots/ajustes-7/` | `4e143c2` |
| 4b | `#dores` refeita no padrão NextPay (itens à esquerda + painel fixo com o celular trocando de tela) — screenshots em `./screenshots/dores/` | `97acd68` |
| 4c | `#dores` ajustes 2: banner com foto no topo, painel claro, telas Ocorrências e "Como chegamos nesta leitura" — screenshots em `./screenshots/dores-2/` | `3902727` |
| 4d | `#dores` ajustes 3: margem branca do banner, banner sem emenda, painel vinho vivo, leitura de risco na tela inicial rolada — screenshots em `./screenshots/dores-3/` | `ab4d548` |
| 4e | `#dores` ajustes 4: cartão único (banner + lista no mesmo fundo), foto natural dissolvendo, transição NextPay — screenshots em `./screenshots/dores-4/` | `09bb215` |
| 3h | `#pessoas`: foto central em movimento, sem ficar colada na base — screenshots em `./screenshots/pessoas-centro/` | `5725147` |
| 4f | Seção nova `#beneficios` (Gardance + NextPay) e foto no vão acima da frase em `#pessoas` — screenshots em `./screenshots/beneficios/` | `339d31d` |
| 4g | Ajustes 4 (geral): fotos dos Benefícios, Manifesto sem degradê, grid de 1280px, celular das Dores 300px, correção da tela branca — screenshots em `./screenshots/ajustes-4/` | `686d159` |
| 4h | Cartão das Dores com largura máxima de 1216px — screenshots em `./screenshots/ajustes-4b/` | `5495701` |
| 4i | `#beneficios` no padrão Gardance (cartão ativo cresce e abre a etiqueta de vidro) — screenshots em `./screenshots/beneficios-3/` | `f8ba90d` (revogado) |
| 4j | Benefícios na versão anterior sem notificações; cartão das Dores com 1440px — screenshots em `./screenshots/ajustes-5b/` | `3f4d408` |
| 4k | `#dores` ajustes 5: cartão 1440px + margem, título em 3 linhas, subtítulo novo, lista mais compacta — screenshots em `./screenshots/ajustes-6b/` | `31db80d` |
| 4l | Título em uma linha e maior, espaço da lista em telas baixas, fotos novas dos Benefícios, correção do chip errado e da faixa branca no celular — screenshots em `./screenshots/ajustes-7b/` | 597c925 |
| 4m | Grid responsivo: 1280px até 1599px de tela (inclui 1440), 1440px a partir de 1600px (inclui 1920); cartão das Dores acompanha o grid — screenshots em `./screenshots/grid-responsivo/` | 8707d9f |
| 4n | Padding interno do cartão das Dores de 96px em telas a partir de 1600px (grid 1440) — prints `padding-*` em `./screenshots/grid-responsivo/` | e5a33ef |
| 5 | Troca para o `COPY.md` final: mapa novo, seções fora do plano removidas, navegação e âncoras (`#como-funciona`, `#leitura-risco`, `#dor-*`), links dos Benefícios, esqueleto de `#leitura-risco` — prints em `./screenshots/copy-final/` | c21768b |
| 5b | Benefícios no COPY 3.5 (padrão Gardance): etiqueta de vidro, cartão ativo cresce e abre texto + link, fotos enquadradas no rosto — prints em `./screenshots/beneficios-final/` | 37f0740 |
| 7 | Seção 7 — Leitura de risco com IA: orbe em CSS, fontes em órbita absorvidas ao rolar, cartão de resultado com níveis e "Ver como chegamos nisso", cartões de adaptação, princípios e nota — prints em `./screenshots/leitura-risco/` | 61eefc3 |
| 5c | Benefícios de volta à versão anterior (etiqueta branca sempre aberta, hover só levanta) — revoga o item 5b | 9ef496e |
| 7b | Seção 7 — ajustes 2: esfera da IA em partículas 3D (three + R3F, carregada só perto da tela), 7 pílulas em duas órbitas com profundidade, partículas soltas, cartões de adaptação sem seletor; removidos o cartão de resultado, a legenda do FONAR, a linha de luz e a absorção — prints e GIF em `./screenshots/leitura-risco-2/` | 9ef496e |
| 7c | Seção 7 — ajustes 3: oclusão entre pílulas que se cruzam nas órbitas (sobreposição legível de ~55% dos quadros para ~0) — prints em `./screenshots/leitura-risco-3/` | (ver git log) |
| 7d | Seção 7 — ajustes 4: anéis do hero atrás da esfera, sem os 3 princípios — prints em `./screenshots/leitura-risco-4/` | (ver git log) |
| 7e | Seção 7 — ajustes 5: cartões de nível com ilustração em camadas (`RiskLevelCards`), textos novos no `copy.ts`, sem a nota do protótipo — prints em `./screenshots/leitura-risco-5/` | (ver git log) |
| 7f | Seção 7 — ajustes 6: cartões de volta à versão anterior, com as ilustrações novas no painel — prints em `./screenshots/leitura-risco-6/` | (ver git log) |
| 7g | Seção 7 — ajustes 7: linha do tempo de níveis (`RiskTimeline`), substitui os cartões — prints em `./screenshots/leitura-risco-timeline/` | (ver git log) |
| 7h | Seção 7 — ajustes 8: linha do Baixo ao Alto, uma cor só (`vinho-profundo`), ilustrações nos cartões — prints em `./screenshots/leitura-risco-timeline-4/` | (ver git log) |
| 7i | Seção 7 — ajustes 9: setas animadas e linha que acompanha o scroll nos dois sentidos — prints em `./screenshots/leitura-risco-timeline-5/` | (ver git log) |
| 5d/3i/4o | Ajustes de 11/11: Benefícios sem links e H2 todo preto; foto central de `#pessoas` sem encolher; cartão das Dores cresce ao entrar — prints em `./screenshots/ajustes-11-11/` | (ver git log) |
| 4p | Cartão das Dores: entrada por `clip-path` (não escala) — sem faixas brancas nem engasgos ao voltar o scroll; `scripts/check-scroll-perf.mjs` — prints em `./screenshots/dores-entrada-clip/` | (ver git log) |
| 7j | Seção 7 — ajustes 10: ilustrações da linha do tempo preenchendo o cartão (cover), sem flutuar — prints em `./screenshots/leitura-risco-timeline-6/` | (ver git log) |
| 8 | Seção 8 — Como começar: palco fixo (Gardance) com 4 passos, fotos novas, cartões animados por passo, barra de progresso clicável; blocos empilhados no celular; subtítulos de todas as seções padronizados (`lead`) — prints em `./screenshots/comecar/` e `./screenshots/subtitulos/` | (ver git log) |
| 8b | Ajustes: cabeçalho de #comecar centralizado, palco em tela cheia crescendo ao entrar, 750px por passo; foto central do Manifesto com entrada; título da linha do tempo maior — prints em `./screenshots/comecar-2/` | (ver git log) |
| 8c | Header some enquanto o palco de #comecar está em tela cheia e volta ao sair | (ver git log) |
| 8d | Foto nova no passo 4 (mulher saindo de casa); cabeçalho de #comecar mais largo — prints em `./screenshots/comecar-3/` | (ver git log) |
| M1 | Mobile (≤767px): banner das Dores de ponta a ponta (chip no topo, título dividido, pílulas em linhas) e Como começar com o palco em tela cheia só com fotos e barra compacta; scroll horizontal em 360px corrigido — prints em `./screenshots/mobile-1/` | (ver git log) |
| M2 | Como começar no celular com as fotos verticais do cliente (9:16, `<picture>` com `media`, 480/720/941px), rosto no terço superior — prints em `./screenshots/comecar-mobile/` | (ver git log) |
| M3 | Banner das Dores no celular: título a ~72px do chip, "não deveria ser um risco." em uma linha (20px de respiro), rosto acima do título — prints em `./screenshots/mobile-2/` | (ver git log) |
| M4 | Banner das Dores no celular: título no maior tamanho sem quebrar (calc com vw), subtítulo e tópicos descidos ~140px com o rosto inteiro no vão, degradê com contraste AA — prints em `./screenshots/mobile-3/` | (ver git log) |

Rodada 1 (base técnica reaproveitada): `acf5a91` (ambiente), `8d07a22` (fundações), `005fa86` (seções), `b3abcac` (movimento).

## Próximo passo
1. **Revisão do cliente da seção 7** (`screenshots/leitura-risco-2/`, incluindo `esfera-animada.gif`) e ajustes que ela pedir.
2. Depois, na ordem, sempre com os textos do `COPY.md` e a rotina de 5 passos do CLAUDE.md:
   - **9 FAQ + emergência** (`#faq`, COPY §3.9);
   - **10 CTA final** (`#cta`, COPY §3.10);
   - **11 Rodapé** (COPY §3.11).
   Os objetos `comecar`, `faq` e `ctaFinal` do `copy.ts` ainda têm os textos antigos: trocar pelos do COPY ao construir cada seção.
3. Fase 5 (revisão completa: build, `web-design-guidelines`, verificações da `design-taste-frontend`, textos palavra por palavra, 360px, teclado, movimento reduzido).

Pendências conhecidas: aviso "chunk > 500 kB" do pacote principal no build (Fase 5; o 3D já está num pacote separado). Fotos sem uso e placeholders: ver "Fotos" abaixo.

## Decisões aprovadas pelo cliente
### Resumo das decisões vigentes (10/11/2026) — valem sobre o `DESIGN.md` e o `COPY.md`
- **`COPY.md` (versão final) é a fonte da verdade** dos textos e da estrutura; textos novos do cliente ficam no `copy.ts` e no `NOTES.md`.
- **Grid responsivo (confirmado pelo cliente):** `--grid` = **1280px** até 1599px de tela (inclui 1440) e **1440px** a partir de 1600px (inclui 1920). Todo conteúdo e o cartão das Dores usam `max-w-(--grid)`. Padding interno do cartão das Dores: 96px a partir de 1600px.
- **Cartão único das Dores** (padrão NextPay): fundo branco, um cartão com margem de 16px (12px no celular), raio 24px, degradê `#4B2A3F` → `#954B6E`, **foto do banner em cores naturais** dissolvendo por máscara; título "Pedir ajuda / não deveria ser um risco." em duas linhas inteiras (até 108px); lista em vidro claro com o celular sticky.
- **Celular das Dores com ~300px** fixo, cortado pela base de um painel de no máximo 560px.
- **Benefícios (confirmado pelo cliente):** etiqueta **branca** sempre aberta (tópico e texto; os links saíram em 11/11); H2 todo preto (a 2ª linha deixou de ser vinho em 11/11); hover só levanta a etiqueta (zoom leve da foto). A versão com etiqueta de vidro no padrão Gardance (`37f0740`) foi descartada.
- **Seção 7:** esfera de partículas 3D com anéis de luz e pílulas orbitando, anéis concêntricos do hero ao fundo, sem os princípios e sem a nota do protótipo; "Como o app se adapta" em linha do tempo de níveis (Baixo/Médio/Alto) com o scroll, do marco Baixo ao Alto, toda em `vinho-profundo`; cartões com as ilustrações `risco-baixo/medio/alto`, título e 1 linha (textos do cliente); sem seletor de nível, sem "Ver como chegamos nisso", sem legenda do FONAR (detalhes em "Seção 7 — estado").
- **Mobile (≤767px, 11/11):** banner das Dores sem margem, chip no topo sobre a foto, título dividido (esquerda/direita) e pílulas em linhas de largura total; Como começar com o palco em tela cheia, sem os cartões interativos, barra compacta só com o passo atual. Desktop/tablet sem mudança.
- **Navegação:** header e rodapé com Como funciona (`#como-funciona`), Leitura de risco (`#leitura-risco`), Como começar (`#comecar`), Dúvidas (`#faq`); rodapé + "Voltar ao topo". Pílula "SOS silencioso" do hero → `#como-funciona`.

### Decisões anteriores (histórico, na ordem em que foram tomadas)
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
1. **Foto do `#contexto` nas cores originais:** sem o tingimento vinho do §6.18. `TintedPhoto natural`. (Nos Ajustes 7 o mesmo vale para as fotos de `#pessoas`.)
2. **`#pessoas` com fundo próprio e divisória:** fundo rosado com borda clara entre as seções (não esmaece no branco). **Revisto (2×):** o fundo fica em **tela cheia e parado** — sem a abertura por `clip-path` e sem o parallax da nuvem (travavam a rolagem). Só as fotos e o texto se movem.
3. **Fotos de `#pessoas`:** 9 fotos pequenas + a central (eram 8; foram a 11 e o cliente pediu para tirar 2 — saíram `ajudar` e `comecar-3`). As de baixo passam pelas laterais, fora da largura da frase, para nunca cobrir o texto.

### Ajustes 7 — hero, `#contexto` e `#pessoas` (10/11/2026) — têm prioridade sobre o `DESIGN.md`
1. **Celular central do hero = tela `inicio-celular.png`** (a `HomeScreen` em código, fiel a ela: "MA", "Esta semana", Leitura de risco). **Substitui o item 3 dos Ajustes do hero** para o central (`home-sos.png` sai do hero); laterais continuam Rede de apoio e Ocorrências.
2. **Hero no celular com os 3 celulares**, os laterais menores (176px) e cortados pela borda da tela. A pílula "Modo Disfarce" desce para a parte de baixo do celular esquerdo (no topo ela cobria o círculo do celular).
3. **`#contexto` no celular:** texto → cartões → foto (a foto vem depois dos cartões, como no desktop).
4. **`#pessoas`:** todas as fotos nas **cores originais** (sem o tingimento vinho); a foto `sos` usa o recorte 4:5 centrado na mulher; no celular a foto do canto superior esquerdo fica mais para dentro, há fotos desfocadas ao fundo e as fotos se movem (parallax com amplitude menor, sem palco fixo).

### `#dores` refeita no padrão NextPay "Vantagens do App" (10/11/2026) — prioridade sobre o `DESIGN.md` §6.32
- **Sai o `QuestionStage`** (pergunta fixa com cartões flutuando) e o fecho antigo. Fundo `vinho-profundo` com brilho `vinho/25` atrás do painel, emendando na seção de cima.
- **Desktop:** H2 + subtítulo ("Sabemos o que impede tantas mulheres de buscar apoio.") à esquerda no topo; abaixo, os 5 itens em 5 col rolando normalmente e, em 7 col, um painel `sticky` (top 15vh, raio 20px, gradiente vinho → vinho-profundo, linhas diagonais finas num canto) com um celular cortado na base.
- **Itens** (cartão de vidro escuro: chip do recurso, título = a dor, 1 linha = como o Amparo responde, link "Como o Amparo ajuda"): Modo Disfarce → calculadora → `#disfarce`; Cofre de provas → Prova verificada → `#cofre`; Rede de apoio → Rede de apoio → `#rede`; Leitura de risco → tela `home-leitura-risco.png` → `#risco`; Seus direitos → Conteúdo e direitos → `#direitos`. Telas em código, fiéis a `assets/app-screens/`.
- **Movimento:** o item mais próximo do centro fica ativo (opacidade 1, borda `white/20`; os outros 0,4); a tela do celular troca com crossfade de 0,5s e deslize vertical; o chip do recurso aparece num cartão flutuante ao lado do celular. Movimento reduzido: estático, na primeira tela.
- **Celular:** sem sticky; cada item com o cartão e, embaixo, a tela num celular de ~240px. Botão secundário "Conheça os recursos" centralizado no fim (→ `#recursos`).
- **Atenção:** a `home-leitura-risco.png` mostra o card "Tudo por aqui está tranquilo" (nível baixo), não "Médio"; a tela foi feita fiel à imagem.

### `#dores` — ajustes 2 (10/11/2026) — prioridade sobre o `DESIGN.md` e o `COPY.md`
1. **Telas:** Cofre de provas → tela de Ocorrências (`ocorrencias.png`); Leitura de risco → "Como chegamos nesta leitura" (`home-como-chegamos.png`) com o card em **Médio** e os sinais em lista. Nenhuma tela desta seção repete a tela inicial do hero.
2. **Painel atrás do celular claro:** `#F3EDEF`, mancha radial vinho 22% num canto, linhas diagonais vinho 10% no oposto, raio 20px, sombra `0 40px 80px -30px rgb(0 0 0 / .45)`. Cartão flutuante do recurso continua branco com `shadow-float`.
3. **Banner no topo da seção** (NextPay "Uma experiência. Controle total."): cartão com margem igual nos 4 lados (12px celular, 16px desktop), raio 24px, `min(88vh, 820px)` / `80svh`; foto `dores-banner` com vinho a 75% e escurecimento vinho-profundo 85% (base e esquerda) / 35% (resto); chip "Feito para a sua realidade"; título "Pedir ajuda" (`#E4D3D9`, esquerda) / "não deveria ser um risco." (branco, direita; celular à esquerda), Quicksand 500 `clamp(2.75rem, 7vw, 6.5rem)`; subtítulo "Cada recurso do Amparo nasceu de uma barreira real."; pílulas "Parece uma calculadora" · "Provas protegidas" · "Ajuda sem precisar denunciar". Saem o H2 e o subtítulo que ficavam acima da lista.
4. **Animação do banner:** abre das margens (`clip-path` 6% → 0, scrub); foto com zoom 1.12 → 1; linha 1 da esquerda e linha 2 da direita (`x ±80`, desfoque 12px → 0, 1s, `expo.out`, uma vez); chip, subtítulo e pílulas em stagger. Movimento reduzido: estado final.
- Foto do banner: `assets/fotos/dores-banner.png` (era "Retrato em Luz Dourada e Sombras.png").

### `#dores` — ajustes 3 (10/11/2026) — prioridade sobre o `DESIGN.md`
1. **Margem do banner branca:** o banner fica num bloco próprio com fundo `#FFFFFF` (16px desktop, 12px celular); o vinho-profundo da lista começa depois, com uma passagem em degradê branco → vinho, sem linha marcada.
2. **Banner sem emenda:** a foto cobre o cartão inteiro e o escurecimento é em degradê suave com várias paradas (a "risca" vinha do fim linear do degradê, não da foto).
3. **Painel atrás do celular vinho vivo** (substitui o painel claro dos ajustes 2): base `#954B6E`, brilho radial branco 12% no canto superior esquerdo, linhas diagonais brancas 8% no oposto, borda `white/10`, raio 20px, sombra `0 40px 80px -30px rgb(0 0 0 / .5)`.
4. **Leitura de risco = tela inicial já rolada até o card** (`home-leitura-risco.png`): header compacto, Baixo / **Médio** / Alto, link "Ver como chegamos nisso"; o card ganha contorno vinho suave e `scale 1.03` quando o item fica ativo. **Não usar** a tela "Como chegamos nisso" nem o topo da tela inicial igual ao do hero.

### `#dores` — ajustes 4: cartão único (10/11/2026) — prioridade sobre os ajustes anteriores de `#dores`
1. **Um só cartão como na NextPay:** a seção tem fundo branco; dentro, um cartão com margem igual (16px desktop, 12px celular), raio 24px, `overflow: clip`, fundo em degradê vertical `#4B2A3F` (topo) → `#954B6E` (base). Banner e lista no mesmo fundo, sem divisão. **Substitui** o bloco branco separado e a passagem branco → vinho dos ajustes 3.
2. **Foto do banner em cores naturais** (sem `TintedPhoto`), no topo do cartão (~90vh), dissolvendo no fundo por `mask-image` (some nos últimos ~45% da altura e nos primeiros ~35% da largura); só um véu `#4B2A3F` 60% suave atrás do título e do subtítulo. Nenhuma borda ou emenda.
3. Texto do banner igual (chip, título em duas linhas desencontradas, subtítulo, 3 pílulas).
4. **Lista dentro do cartão:** cartões em vidro claro `white/8` + borda `white/15` (ativo `white/14` + `white/25`); painel `#954B6E` com brilho branco 14%, linhas brancas 8%, borda `white/12`, sombra `0 40px 80px -30px rgb(0 0 0 / .45)`. Celular sticky e telas como antes.
5. **Transição ao rolar:** a foto sobe mais devagar (`yPercent 0 → 15`) e escurece no fundo; o título sobe e perde opacidade; cartões e painel entram com `appear` em seguida. Sem abertura por `clip-path` nem zoom. Movimento reduzido: estático.
6. **Celular:** o mesmo cartão (12px); foto no topo dissolvendo para baixo, depois o texto do banner e os itens com o celular menor.

### `#pessoas` — foto central (10/11/2026)
- A foto central também se move (sobe um pouco com o scroll e flutua devagar) e não fica colada na base do palco; o movimento é limitado para nunca cobrir a frase.

### Seção nova: Benefícios `#beneficios` (10/11/2026)
- Entre o Manifesto (`#pessoas`) e o cartão das Dores; padrão Gardance "O que você ganha…" + NextPay "Mais que um banco digital…". Fundo branco, `py-24 md:py-32`; a base do Manifesto se dissolve no branco (~160px).
- Cabeçalho: chip "Benefícios" + H2 "Mais que um app de proteção." (texto) / "Um amparo no seu dia a dia." (vinho) à esquerda; botão "Acessar o Amparo" à direita, alinhado pela base.
- 3 cartões 4:5 com foto natural, etiqueta branca na base e um pedaço da interface em vidro no terço superior: "Mais tranquilidade" (Rede ativa), "Sua história, suas escolhas" (Registro salvo no cofre), "Decida com informação" (Leitura de risco · Baixo). Fotos `beneficio-tranquilidade`, `beneficio-controle`, `beneficio-confianca` são **placeholders** até as fotos chegarem.
- Movimento: H2 palavra por palavra, cartões por máscara de baixo para cima (stagger 0,12), parallax interno, interface entrando depois e flutuando; hover com zoom 1.04 na foto e etiqueta subindo. Celular: carrossel com snap (85vw).
- `#pessoas` ganhou uma foto no vão acima da frase, um pouco à direita.

### Ajustes 4 (geral) — 10/11/2026 — prioridade sobre o `DESIGN.md`
1. **Fotos dos Benefícios** aplicadas: `beneficio-tranquilidade` (sofá), `beneficio-controle` (caderno), `beneficio-confianca` (janela), cores naturais.
2. **Manifesto sem o degradê** na base: termina como antes e os Benefícios começam no branco.
3. **Grid responsivo em todo o site:** todo conteúdo dentro de `max-w-(--grid)` — 1280px até 1599px de tela (inclui 1440) e 1440px a partir de 1600px (inclui 1920) —, `px-5` (celular) / `px-8` (desktop). O cartão das Dores também segue o `--grid` (nunca ocupa a tela toda). Só os fundos vão de ponta a ponta (gradiente do hero, fios do marquee). Verificar com `node scripts/check-grid.mjs <url> 1440,1920`.
4. **Celular da lista das Dores:** 300px fixo, cortado pela base de um painel com no máximo 560px de altura e 7 colunas; mesmo tamanho em 1440/1920/2560.
5. **Tela branca do celular:** proteção contra escala 0 no `PhoneFrame` e estado inicial explícito das telas.
6. ~~Cartão das Dores com 1440px fixo~~ — **substituído** pelo grid responsivo (item 3): o cartão segue o `--grid` (1280px até 1599px de tela, 1440px a partir de 1600px), com padding interno de 96px a partir de 1600px.

### ~~`#beneficios` — cartões no padrão Gardance~~ — **revogado** (10/11/2026): voltou à versão anterior (etiqueta branca), sem os pedaços de notificação sobre as fotos
- Sem selo no topo; etiqueta de vidro na base (ícone vinho 32px + tópico). Aberta: texto + link para `#rede`, `#cofre`, `#risco`.
- Desktop: o cartão ativo cresce (flex-grow 1.6) e abre a etiqueta; os outros ficam fechados. 1º ativo; mouse e Tab ativam; ao sair fica o último. Foto do ativo com zoom 1.04; enquadramento que mantém o rosto visível.
- Celular: carrossel com snap (85vw), etiquetas abertas. Movimento reduzido: larguras iguais e etiquetas abertas.
- Tópicos longos quebram em 2 linhas no cartão estreito (em vez de reticências).

### `#dores` — ajustes 5 (10/11/2026)
- ~~Título em três linhas~~ — **revogado**: "não deveria ser um risco." de volta a uma linha, com fonte maior (até 108px).
- Subtítulo: "Cada recurso do Amparo nasceu de uma barreira real: o medo de ser vista, a falta de provas e a dúvida sobre o que fazer. Aqui, pedir ajuda é discreto, seguro e no seu tempo."
- Espaço entre os cartões da lista: no mínimo 520px por item (o de 1920×1080) em qualquer altura de tela.

### Fotos dos Benefícios (10/11/2026)
- Novas fotos, com luz natural parecida nas três: sofá com celular (tranquilidade), escrevendo na cozinha (controle), na janela com o celular (confiança).

### Fundos das seções (regra dos Ajustes 3, com o mapa novo)
| # | Seção | Fundo |
|---|---|---|
| 1 | Hero | `--grad-hero` (dissolve no branco na base) |
| 2 | Marquee | branco (fios `borda`) |
| 3 | `#contexto` | branco (exceção aprovada pelo cliente) |
| 4 | `#pessoas` (Manifesto) | **rosado** — `--grad-rosa` em tela cheia e parado |
| 5 | `#beneficios` | branco |
| 6 | `#como-funciona` (Dores) | branco, com o cartão único escuro (`#4B2A3F` → `#954B6E`) |
| 7 | `#leitura-risco` | branco (grade de pontos + halo atrás da esfera) |
| 8 | `#comecar` | sugestão: **rosado** (`--grad-rosa`) — a confirmar ao construir |
| 9 | `#faq` | sugestão: branco |
| 10 | `#cta` | sugestão: shell `--grad-vinho` sobre margem branca |
| 11 | Rodapé | `vinho-profundo` |

## Fotos
Originais em `assets/fotos/` e arquivos gerados em `public/images/` (`npm run images` → `<slot>-<largura>.avif|webp` + `.jpg`). **Tudo versionado no git.**

**Definitivas, em uso:** `comecar-1` a `comecar-4` (palco de #comecar a partir de 768px) e `comecar-1-mobile` a `comecar-4-mobile` (fotos verticais 9:16 do cliente, até 767px; a antiga foto do passo 4 ficou em `assets/fotos/comecar-4-alt-caminhando.png`, sem uso), `boas-vindas-foto` (tela codada do passo 1), `risco-baixo`, `risco-medio`, `risco-alto` (ilustrações da linha do tempo, #leitura-risco), `numeros` (#contexto), `contexto` (centro do Manifesto), `pessoas-janela`, `rede-duas-mulheres`, `direitos-1` a `direitos-4` (Manifesto), `beneficio-tranquilidade`, `beneficio-controle`, `beneficio-confianca` (Benefícios), `dores-banner` (Dores), `ai-sphere.png` (fallback da esfera, gerado do próprio canvas).

**Provisórias, em uso** (alternativas de `assets/fotos/` até chegarem as definitivas): `sos-mobile` (espelhada), `risco` e `pessoas-rua` (era `comecar-2`) — as três no Manifesto.

**Da rodada 1, em uso até a seção ser refeita:** `cta-final` e `cta-final-mobile` (CTA final, seção 10).

**Placeholders** (degradê vinho + gota, gerados pelo script): `cofre`, `cofre-mobile`, `comecar-1`, `comecar-4` — **sem uso hoje** (a seção do Cofre saiu; Como começar será refeita). Só vão precisar de foto real se a seção 8 nova usar fotos.

**Sem uso** (podem sair do `process-images.mjs` na Fase 5): `ajudar`, `comecar-3`, `comecar-3-mobile`, `sos` (só no `/#kit`), `risco-mobile` e os originais soltos `mulher-*` em `assets/fotos/`.

Para trocar uma foto: coloque o arquivo em `assets/fotos/` com o nome do slot, ajuste o recorte em `scripts/process-images.mjs` (lista `SLOTS`; se era placeholder, tire da lista `PLACEHOLDERS`) e rode `npm run images`.

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
