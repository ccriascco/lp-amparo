# NOTES — decisões de implementação

Registro das escolhas feitas onde `CLAUDE.md`, `DESIGN.md` e `COPY.md` não definiam algo, ou divergiam entre si.

## Fase 0 — Skills
- Todas as skills foram instaladas antes do início (`.agents/skills/`, com links em `.claude/skills/`): frontend-design, web-design-guidelines, design-taste-frontend, copywriting, remotion-best-practices, ui-taste e ios-design (uizze).
- As pastas das skills (~41 MB) ficam **fora do git**. O `skills-lock.json` é versionado e permite reinstalá-las.

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
O hero **não tem foto** (DESIGN.md atualizado: fundo branco + véu vinho). As 7 fotos enviadas foram distribuídas assim:

| Slot | Seção | Foto | Recorte |
|---|---|---|---|
| `rede-duas-mulheres` | `#rede` (ArchPhoto) | Três amigas no banco, mão no ombro | 3:4 |
| `ajudar` | `#ajudar` (ArchPhoto) | Mulher mostrando o celular a uma senhora | 3:4, **cortada acima do crachá** com a marca grafada errado ("Ampore") |
| `direitos-1` | Lei Maria da Penha, explicada | Mulher na janela, sorrindo, com o celular | 4:5 |
| `direitos-2` | Como pedir uma medida protetiva | Mulher no sofá lendo o celular | 4:5 |
| `direitos-3` | Monitoramento eletrônico do agressor | Mulher na rua sorrindo para o celular | 4:5 |
| `direitos-4` | Sinais de relacionamento abusivo | Mulher de costas olhando o mar | 4:5 |
| `cta-final` (+ `cta-final-mobile` 4:5) | CTA final | Mulher caminhando na calçada arborizada (mesma cena da foto de boas-vindas do app) | 16:9 |

- O nome `rede-duas-mulheres` foi mantido (slot do DESIGN.md §8), embora a foto tenha três mulheres, para a troca continuar sendo só substituir o arquivo.
- As fotos de `#direitos` mostram rosto (o §8 pedia detalhes sem rosto). Nenhuma foto enviada era de detalhe; as expressões são serenas e seguem a direção de arte.
- Saídas: AVIF + WebP nas larguras do srcset até o tamanho do original (as fotos têm 1024 px; só `cta-final` tem 2048 px) e um `.jpg` de fallback com o nome do slot. Maior arquivo: 156 KB (limite de 300 KB). As dimensões ficam em `src/content/images.json` para o `srcset` e o `width`/`height`.
- **Pendente:** `og-image.jpg` (1200×630). Pelo DESIGN.md §8 ela é gerada com o celular mostrando a `HomeScreen`, que só existe a partir da Fase 2; será gerada na Fase 5. Até lá, a meta `og:image` aponta para um arquivo que ainda não existe.
