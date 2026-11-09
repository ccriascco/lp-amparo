# CLAUDE.md — Landing page do Amparo

Você vai preparar o ambiente e construir **toda a parte visual** da landing page do **Amparo**, um app discreto de proteção para mulheres em situação de violência doméstica (TCC de Ciência da Computação, UNIRP). O objetivo da página é levar a visitante a **acessar o app**, que roda como web app na Netlify.

## Fontes de verdade (ler antes de qualquer código)
0. **Sites de referência de estrutura e animação** (`DESIGN.md` §2.1). **Abra os 5 no navegador antes de começar** e estude a tela de abertura, a entrada do hero, o "aparecer" no scroll, os contadores, o marquee, as abas, o carrossel e o FAQ:
   https://nextpay.framer.website/ · https://gardance.framer.website/ · https://eduzz.framer.website/ · https://yurifitpay.framer.website/ · https://gaianutri.app/
   Reproduza fielmente a estrutura e o estilo de movimento, **sem copiar** código, textos, imagens ou marcas deles.
1. **`DESIGN.md`**: design system, tokens, componentes, movimento (GSAP) e wireframes. Siga à risca.
2. **`COPY.md`**: estratégia e **todos** os textos. Não invente textos, números, depoimentos nem funcionalidades.
3. **`assets/`**: logos (`assets/brand/`), telas do protótipo do app (`assets/app-screens/`) e referências visuais (`assets/referencias/`). **Abra as telas** para replicar fielmente a calculadora e a tela inicial, e **abra as referências** para calibrar o acabamento (fotografia tingida, vidro, anéis, parallax). As referências servem só para a parte visual e de composição: **não** tire delas cores nem fontes.

Se algo não estiver definido nesses arquivos, escolha a opção mais simples e coerente com eles e registre a decisão em `NOTES.md`.

---

## Fase 0 — Skills (já instaladas pelo usuário)
Confira se estão instaladas (`npx skills ls`). Se faltar alguma, instale com
`npx -y skills add <fonte> --skill <nome> -y`, um comando por vez.

### Ordem de prioridade (quando duas fontes discordarem)
1. **`DESIGN.md` e `COPY.md`**: são o brief do cliente e **sempre vencem**.
2. **`frontend-design`**: alinhada ao `DESIGN.md`, vale integralmente.
3. **`web-design-guidelines`**: regras de qualidade e acessibilidade. Vale integralmente, exceto onde contradiz o item 1.
4. **`design-taste-frontend`, `copywriting` e `remotion-best-practices`**: só nas partes indicadas abaixo.

### Rotina obrigatória por seção (skills de frontend sempre ativas)
Em **toda** seção (layout, componentes e animação), sem exceção, siga este ciclo. O objetivo é uma **UI avançada e tecnológica, no nível dos sites de referência** (§2.1 do `DESIGN.md`):
1. **Planejar com a `frontend-design`:** antes de codar a seção, escreva no `NOTES.md` um mini-plano: o wireframe do §9, o site de referência correspondente e o que vai tornar a seção memorável. Revise o plano contra o brief: se parecer genérico (cartões iguais, ícone + título + texto repetido, seção só de texto), refaça antes de codar.
2. **Construir com o padrão de acabamento da `design-taste-frontend`:**
   - bordas alinhadas ao container;
   - visual real do produto (UI do app codada, fotos) em vez de ilustração genérica;
   - microinterações de hover e clique;
   - áreas de toque de 44px;
   - nada estourando em 320px.
   Lembre: não usar os comandos de sorteio dessa skill (ver abaixo).
3. **Animar** exatamente como o §7 e o site de referência daquela seção. Abra o site e compare o movimento lado a lado: tempo, curva, desfoque, ordem de entrada.
4. **Criticar com screenshots (`frontend-design`):** tire prints em 1440 e 390 e compare com a referência. Pergunte:
   - Está tão rica e "tecnológica" quanto a referência?
   - Tem densidade suficiente (§9.0)?
   - Algo parece template?
   Ajuste e repita até ficar no nível da referência.
5. **Revisar com a `web-design-guidelines`** só os arquivos da seção (acessibilidade, foco, semântica, desempenho). Depois, commit.

Nenhuma seção é dada como pronta sem passar pelos 5 passos.

### Mapa de uso por fase

**`frontend-design`** (Anthropic): leia antes da Fase 2 e **aplique em toda seção** (rotina acima).
- **Use:** o processo "planejar → revisar contra o brief → construir → criticar com screenshots". Restrição: a ousadia fica concentrada num só lugar (o desbloqueio do hero) e o resto é disciplinado.
- **Já está aplicada no `DESIGN.md`:** sem destacar palavras soltas nos títulos, sem rótulos em caixa-alta, numeração só onde há sequência real.
- **Conflito resolvido a favor do cliente:** a skill desaconselha "aparecer no scroll" em toda seção, mas o cliente pediu explicitamente o padrão dos sites Framer de referência. Siga o `DESIGN.md` §7.11.
- **Não refaça** o plano de cores e fontes: ele já está decidido no `DESIGN.md` §3–§4 e vem do design system do app.

**`web-design-guidelines`** (Vercel): use na Fase 5, como revisão.
- Ela baixa as regras atualizadas de `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md` e audita os arquivos.
- Rode sobre `src/components/**` e `src/sections/**`, corrija os achados e liste no `NOTES.md` os que não foram corrigidos por conflitarem com o `DESIGN.md`, com o motivo.

**`design-taste-frontend`** (tasteskill): **uso parcial e controlado.**
Ela é um sistema completo que sorteia paletas, fontes e layouts e proíbe parallax e marquee. Isso conflita com o brief (cores e fontes do app, parallax pedido pelo cliente). Portanto:
- ❌ **Não rode** `start.mjs deal`, `start.mjs css`, `deal.mjs` nem `moments.mjs pick`. Eles sorteiam paletas, fontes e heróis e **armam o gate**.
- ❌ **Não rode** `gate.mjs --start`. Sem o gate armado, o hook de parada da skill não bloqueia o trabalho. Se `.taste-skill/build.json` aparecer por engano, rode `gate.mjs --done "brief do cliente define o design"`.
- ❌ **Não copie** os assets dela (`system.css`, `starter.html`, `assets/motion`): o projeto é React + Tailwind com tokens próprios.
- ❌ **Ignore** as regras dela que proíbem parallax, marquee, pin, revelação no scroll, carrossel e abas com tempo. O `DESIGN.md` §7 pede esses efeitos explicitamente.
- ✅ **Adote** como padrão de acabamento:
  - bordas esquerda e direita iguais em todas as seções (tudo alinhado ao container);
  - área de toque de 44px e 8px entre alvos;
  - nada estourando a tela em 320px;
  - microinterações de hover: botão "afunda" no clique, sublinhado que se desenha, foto com zoom de 1.02 dentro da moldura e cartão-link subindo 2px;
  - nenhuma legenda explicando imagens;
  - nenhum depoimento, número ou cliente inventado.
- ✅ **Pode rodar** como verificação, na Fase 5 (Node 22+ e Chrome), com `npm run build && npm run preview` ativo:
  ```bash
  node <pasta-da-skill>/assets/layout/check.mjs --url http://localhost:4173/ --sizes 1440x900,1024x768,768x1024,390x844 --shots shots/layout --profile .taste-skill/chrome-check
  node <pasta-da-skill>/scripts/perf.mjs http://localhost:4173/ --profile .taste-skill/chrome-perf
  node <pasta-da-skill>/scripts/shoot.mjs --url http://localhost:4173/ --w 1440 --out shots/1440.png --profile .taste-skill/chrome-shoot
  ```
  Corrija o que for de alinhamento, sobreposição, área de toque, overflow e peso. Ignore os achados ligados a scroll, parallax, pin, marquee ou "uma seção por tela" que conflitem com o `DESIGN.md`, e anote no `NOTES.md`.
- ❌ Não rode o `copy-lint.mjs`: ele é calibrado para inglês e a copy é pt-BR fechada.

**`copywriting`** (marketingskills): **só para edições pontuais** (a situação "C" da skill).
- A copy já está pronta e aprovada no `COPY.md`. Use a skill apenas se faltar algum microtexto (`aria-label`, mensagem de erro, estado vazio) ou se um texto não couber no layout e precisar ser encurtado.
- Mantenha vocabulário e tom do `COPY.md`. Nunca invente números, depoimentos ou resultados. Qualquer texto novo vai para o `NOTES.md`, para o cliente revisar.

**`remotion-best-practices`** (Remotion): **só na Fase 6** (vídeo opcional).
- Siga o roteador da skill: `remotion-create` para criar o projeto em `video/`, e `remotion-markup` para escrever as composições.
- Siga a regra dela de **abrir o Remotion Studio para o cliente ver o preview** antes de renderizar, e só renderize o `.mp4` quando ele aprovar.
- Licença: o Remotion é gratuito para uso individual, acadêmico e por empresas pequenas. Para um TCC está ok; consulte `remotion-license` se houver dúvida.

**`uizze`** (`npx skills add https://uizze.sh/`): não foi possível inspecionar o conteúdo dela antes. Na Fase 0, **leia o SKILL.md instalado** e resuma no `NOTES.md` o que ela faz.
- Use-a só no que não conflitar com o `DESIGN.md`: cores e fontes do app, movimento do §7 e copy do `COPY.md`.
- Se ela pedir conta, chave de API, pagamento ou acesso à rede fora do npm/GitHub, **não use** e avise o cliente.

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
    ui/       Button, Chip, PhoneFrame, FloatCard, NotificationCard, StatsBand, Marquee, PeopleScatter,
              QuestionStage, FeatureStack, PhotoStage, StepShowcase, MythCarousel, AccessCard,
              FooterBanner, Accordion, EmergencyBar,
              CircularBadge, ConcentricRings, TintedPhoto, PhotoCard
    phone/    CalculatorScreen, HomeScreen, AlertScreen, AppGridScreen, MultitaskScreen
    demo/     SOSDemo, HashScramble, RiskLevels, InteractiveCalculator
  sections/   Preloader, Header, Hero, Numeros, MarqueeBand, Contexto, Dores, Disfarce,
              Recursos (FeatureStack: Sos, Cofre, Rede, Risco), Direitos, Mitos, Seguranca,
              Comecar, Acesso, Ajudar, Faq, CtaFinal, Footer
```

## Fase 2 — Fundações
Tokens, fontes, `Button`, `Chip`, `PhoneFrame`, `CalculatorScreen`, `HomeScreen` e `Header`. Monte uma página temporária `/#kit` que mostre todos os componentes. Confira visualmente que `CalculatorScreen` e `HomeScreen` estão fiéis às telas em `assets/app-screens/`.

## Fase 3 — Seções (na ordem do `COPY.md`)
Construa todas as seções de forma estática e responsiva (mobile primeiro, testando em 360px, 768px e 1280px). Só depois parta para o movimento.

## Fase 4 — Movimento (GSAP)
Siga o `DESIGN.md` §7 e **compare sempre lado a lado com os sites de referência** (§2.1), nesta ordem:
0. **Base smooth:** Lenis + ScrollTrigger (bloco `src/lib/gsap.ts`) e o utilitário `appear` (§7.11).
1. **Preloader** (§7.0, padrão Gaia) emendando no **hero** (§7.1): título palavra por palavra saindo do desfoque (NextPay), desbloqueio da calculadora e notificações empilhando (Eduzz).
2. **Header que vira pílula compacta** ao rolar e **celular do hero girando** ao sair (§7.11, §7.9, padrão Gardance).
3. **"Aparecer no scroll"** em todas as seções (§7.11), **contadores** (§7.3) e **marquee** (§6.25).
4. **Seções fixas com elementos flutuando** (§7.12): `PeopleScatter` (Gaia) e `QuestionStage` (Gardance).
5. **`FeatureStack`** com a barra de navegação fixa na base (§6.27, Gardance), incluindo SOSDemo, HashScramble, rede e RiskLevels.
6. **`StepShowcase`** do Modo Disfarce (§7.2) e **`PhotoStage`** do Como começar (§6.28, §7.6).
7. **`MythCarousel`**, **Accordion** do FAQ e **galeria que se junta** antes do CTA (§7.13, Eduzz).
8. **Parallax e revelações por máscara** nas fotos (§7.9) e `CircularBadge`.

Regras: `useGSAP` com `scope`, `gsap.matchMedia()` para desktop, mobile e movimento reduzido, e `ScrollTrigger.refresh()` após o carregamento das fontes e imagens. Antes de encerrar a fase, cheque a performance (§7.10): a página precisa ser *smooth* e não travar, inclusive num celular médio.

## Fase 5 — Revisão e qualidade
- Rode `npm run build` sem erros nem warnings de TypeScript.
- Passe pelos critérios do `DESIGN.md` §10 e pela lista "O que não fazer" (§11).
- Aplique a skill `web-design-guidelines` e corrija o que ela apontar.
- Rode as verificações da `design-taste-frontend` listadas na Fase 0 (layout, performance e screenshots).
- Revise todos os textos contra o `COPY.md`, palavra por palavra, incluindo números (`1.492`, `64,3%`, `8 em 10`, `101.656`).
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
