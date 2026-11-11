# Amparo — Estratégia e Copy da Landing Page

> Fonte de verdade para **todo texto** da landing. O Claude Code não deve inventar textos, números ou funcionalidades fora deste arquivo. Números vêm do artigo do TCC (Entrega 1, set/2026) e das fontes citadas nele.

---

## 1. Estratégia

### Objetivo
Levar a visitante a **abrir o Amparo** (web app hospedado na Netlify) e criar a conta. Não há loja de apps: todo CTA aponta para `import.meta.env.VITE_APP_URL`.

### Públicos (em ordem de prioridade)
1. **Mulher em situação de violência doméstica**, ou que suspeita estar. Precisa sentir em segundos: *isso é para mim, é seguro, é discreto, é fácil*.
2. **Quem quer ajudar** (amiga, irmã, mãe, colega). Vai indicar o app ou virar guardiã.
3. **Banca, professores, congresso e imprensa.** Querem contexto e transparência sobre o estágio do projeto (rodapé).

### Mensagem central
**Você não está sozinha.** O Amparo é ajuda que cabe no seu celular *sem chamar atenção*: parece uma calculadora, avisa quem você confia com um toque e guarda suas provas num cofre que só você abre.

### Os 4 pilares (do artigo) → estrutura da página
| Pilar | Dor | Resposta do Amparo | Seção |
|---|---|---|---|
| **Proteger** | O agressor convive com ela e mexe no celular | Modo Disfarce + SOS silencioso | `#disfarce`, `#sos` |
| **Documentar** | Provas se perdem, são apagadas ou contestadas | Cofre de ocorrências com hash de integridade | `#cofre` |
| **Conectar** | Pedir ajuda parece exigir denúncia formal | Rede de até 5 guardiãs, sem denúncia prévia | `#rede` |
| **Transformar** | Falta informação e a violência é subnotificada | Leitura de risco com IA + conteúdo sobre direitos | `#risco`, `#direitos` |

### Tom de voz
- Acolhedor, direto, adulto. Fala com **"você"**, no feminino.
- Frases curtas. Linguagem simples, sem juridiquês e sem jargão técnico.
- **Nunca** culpa, sensacionaliza ou usa imagem de violência explícita. Os números aparecem com respeito, sem tom de alarme.
- Sempre deixa claro que **a decisão é dela** ("apoia, não decide por você").
- Termos fixos: *Modo Disfarce*, *SOS*, *guardiãs*, *rede de apoio*, *cofre*, *ocorrência*, *leitura de risco*. Guardiãs podem ser qualquer pessoa de confiança; quando precisar ser inclusivo, use "pessoas de confiança".

### Honestidade (obrigatório)
- O Amparo é um **projeto de TCC** em desenvolvimento. A página mostra isso no rodapé e na nota da seção de IA.
- O app **não substitui** a polícia nem os canais oficiais. O 190 e o 180 aparecem na página.

---

## 2. SEO e metadados

```
<title>Amparo — Você não está sozinha</title>
description: Amparo é um app discreto de proteção para mulheres em situação de violência doméstica. Parece uma calculadora, aciona sua rede de apoio com um toque e guarda suas provas com segurança.
og:title: Amparo — Você não está sozinha
og:description: Ajuda que cabe no seu celular sem chamar atenção.
lang: pt-BR
```

---

## 3. Copy por seção (versão final — reflete a página construída)

### 3.00 Mapa da página
| # | Seção | Âncora | Status |
|---|---|---|---|
| 0 | Tela de abertura | — | pronta |
| 1 | Header + Hero | `#inicio` | pronta |
| 2 | Faixa de recursos (marquee) | — | pronta |
| 3 | Contexto + números | `#contexto` | pronta |
| 4 | Manifesto (fotos espalhadas) | — | pronta |
| 5 | Benefícios | `#beneficios` | pronta |
| 6 | Dores: banner + lista com celular | `#como-funciona` (itens: `#dor-disfarce`, `#dor-cofre`, `#dor-rede`, `#dor-risco`, `#dor-direitos`) | pronta |
| 7 | Leitura de risco com IA | `#leitura-risco` | a construir |
| 8 | Como começar | `#comecar` | pronta |
| 8.5 | Seus direitos (bento) | `#direitos` | pronta |
| 8.6 | O que sua guardiã recebe (banner) | `#guardia` | pronta |
| 9 | FAQ + emergência | `#faq` | a construir |
| 10 | CTA final | `#cta` | a construir |
| 11 | Rodapé | — | a construir |

**Fora da página** (não construir): Recursos/FeatureStack, demos "Experimente", Mitos e verdades, Segurança (substituída por "Seus direitos" em 11/11/2026), Cartão de acesso, Para quem quer ajudar, Galeria antes do CTA.

**Regras de texto:** título com no máximo 8 palavras, apoio com no máximo 3 linhas, nada de listas com mais de 3 itens dentro de um cartão.

---

### 3.01 Tela de abertura
- Logo vertical branco no centro + contador grande **0 → 100** no canto inferior direito.
- Linha pequena no canto inferior esquerdo: **Preparando um lugar seguro para você**

### 3.0 Header
- Links: **Como funciona** (`#como-funciona`) · **Leitura de risco** (`#leitura-risco`) · **Como começar** (`#comecar`) · **Dúvidas** (`#faq`)
- Link de texto: **Entrar** (abre `VITE_APP_URL`)
- CTA: **Acessar o Amparo**

### 3.1 Hero (`#inicio`)
- Chip: **Proteção discreta para mulheres**
- H1: **Você não está sozinha.**
- Subtítulo: Um app que parece uma calculadora, avisa quem você confia com um toque e guarda suas provas num cofre que só você abre.
- CTAs: **Acessar o Amparo** · **Ver como funciona** ↓
- Checks: Gratuito / Funciona no navegador do celular / Seus dados protegidos pela LGPD
- Pílulas: **Modo Disfarce** · **SOS silencioso**
- Notificações: **Alerta enviado** · Sua rede foi avisada · agora / **Ana Beatriz confirmou** · Está a caminho · 12:31 / **Prova verificada** · Arquivo sem alterações · 21:47
- Celulares: tela inicial (centro), Rede de apoio (esquerda), Ocorrências (direita)

### 3.2 Faixa de recursos (marquee)
**Modo Disfarce** · **SOS silencioso** · **Cofre de provas** · **Rede de apoio** · **Leitura de risco** · **Seus direitos** · **Feito para o celular** · **Protegido pela LGPD**

### 3.3 Contexto + números (`#contexto`)
- H2: **Na maioria dos casos, o perigo está dentro de casa.**
- Subtítulo: A violência doméstica cresce em silêncio. Muitas mulheres convivem com quem as agride, dividem o mesmo teto e, muitas vezes, o mesmo celular. Pedir ajuda pode ser arriscado.
- Cartões:
  - **1.492** · feminicídios em 2024, o maior número já registrado no Brasil
  - **64,3%** · das vítimas foram mortas dentro da própria casa
  - **8 em 10** · autores eram companheiros ou ex-companheiros
  - **101.656** · medidas protetivas descumpridas pelo agressor em 2024
- Na foto: **Ligue 180** · Gratuito, sigiloso, 24 horas (`tel:180`) e a notificação **Alerta enviado** · Sua rede foi avisada · agora
- Fonte dos números: só no rodapé.

### 3.4 Manifesto
- Frase: **Por trás de cada número, existe uma mulher. O Amparo foi feito para ela.**

### 3.5 Benefícios (`#beneficios`)
- Chip: **Benefícios**
- H2 (2 linhas): **Mais que um app de proteção.** / **Um amparo no seu dia a dia.** (2ª linha em vinho)
- Botão: **Acessar o Amparo**
- Cartões (etiqueta de vidro: tópico sempre visível; texto e link aparecem no cartão ativo):
  1. **Mais tranquilidade** · Sua rede de apoio fica a um toque, mesmo em silêncio. · **Conheça a rede de apoio** → `#dor-rede`
  2. **Sua história, suas escolhas** · Registre agora e decida depois o que fazer, sem pressão. · **Conheça o cofre de provas** → `#dor-cofre`
  3. **Decida com informação** · Entenda seus direitos e acompanhe como está o seu risco. · **Conheça a leitura de risco** → `#leitura-risco`

### 3.6 Dores (`#como-funciona`)
**Banner (dentro do cartão vinho):**
- Chip: **Feito para a sua realidade**
- Título: **Pedir ajuda** / **não deveria ser um risco.**
- Subtítulo: Cada recurso do Amparo nasceu de uma barreira real: o medo de ser vista, a falta de provas e a dúvida sobre o que fazer. Aqui, pedir ajuda é discreto, seguro e no seu tempo.
- Pílulas: **Parece uma calculadora** · **Provas protegidas** · **Ajuda sem precisar denunciar**

**Lista com celular** (chip / título / resposta / tela):
1. `#dor-disfarce` · **Modo Disfarce** / Ele pode ver o seu celular. / Por fora, o Amparo é uma calculadora. A área protegida só abre com o seu código. / Calculadora
2. `#dor-cofre` · **Cofre de provas** / Medo de não ter provas. / Cada registro guarda data, hora, local e um código que mostra que nada foi alterado. / Ocorrências
3. `#dor-rede` · **Rede de apoio** / Denunciar parece um passo grande demais. / Você pode pedir ajuda a quem confia, sem boletim de ocorrência e sem medida protetiva. / Rede de apoio
4. `#dor-risco` · **Leitura de risco** / Não saber se é grave. / A IA mostra se o risco está baixo, médio ou alto, e você sempre vê o porquê. / Tela inicial focada na leitura de risco · link **Como o Amparo ajuda** → `#leitura-risco`
5. `#dor-direitos` · **Seus direitos** / Não saber quais são seus direitos. / A Lei Maria da Penha explicada em linguagem simples, dentro do app. / Central de direitos
- Só o item 4 tem link. Botão ao final da seção: **Conheça a leitura de risco** → `#leitura-risco`

### 3.7 Leitura de risco com IA (`#leitura-risco`)
- Chip: **Inteligência artificial**
- H2: **Uma IA que apoia, sem decidir por você.**
- Subtítulo: A partir dos seus registros e dos acionamentos do SOS, o Amparo faz uma leitura do seu risco e adapta o que mostra para você. Você sempre pode ver o porquê.
- Pílulas que orbitam a IA: **Seus registros** · **Acionamentos do SOS** · **Sinais de risco oficiais**
  - Legenda pequena: Sinais inspirados no Formulário Nacional de Avaliação de Risco (Lei nº 14.149/2021).
- Resultado: **Leitura de risco** · Baixo / Médio / Alto
- Como o app se adapta:
  - **Baixo** · Tudo tranquilo. O acompanhamento discreto segue ativo.
  - **Médio** · O app prepara um aviso discreto para a sua rede, enviado só se você confirmar.
  - **Alto** · Os caminhos de ajuda aparecem primeiro: Ligue 180, 190 e a delegacia mais próxima.
- **Ver como chegamos nisso** (sinais de exemplo, marcados como exemplo): Ameaças registradas nas últimas semanas / Aumento na frequência de registros / SOS acionado recentemente · *Nada disso é enviado para ninguém.*
- Princípios:
  - **Apoia, não decide** · A sugestão é sua para seguir ou ignorar.
  - **Transparente** · Você sempre vê quais sinais levaram à leitura.
  - **Privada** · A leitura fica só com você, no seu aparelho e na sua conta.
- Nota pequena: Protótipo acadêmico: o modelo foi treinado com dados sintéticos. A validação com dados reais é a próxima etapa.

### 3.8 Como começar (`#comecar`)
- H2: **Comece em poucos minutos.**
- Barra de progresso: **1. Crie sua conta** · **2. Modo Disfarce** · **3. Rede de apoio** · **4. Pronto**
- Passos (título + 1 linha + cartão do app):
  1. **Crie sua conta** · Use um e-mail ao qual só você tenha acesso. · campo de e-mail
  2. **Ative o Modo Disfarce** · Escolha um código de 4 números que só você sabe. · teclado de código
  3. **Adicione sua rede** · Convide pelo menos uma pessoa de confiança. · "Adicionar guardiã"
  4. **Pronto** · O Amparo fica com você, discreto, até você precisar. · selo "Tudo pronto"
- CTA depois do palco: **Acessar o Amparo**

### 3.85 Seus direitos (`#direitos`)
- Chip: **Seus direitos**
- H2: **O que a lei garante, sem juridiquês.**
- Subtítulo: No app, a Central de Direitos explica cada passo em linguagem simples. Aqui vai um pouco do que você encontra lá.
- Cartão central: ícone + **Central de Direitos** · Tudo o que a lei garante, explicado em linguagem simples dentro do app. · celular com a tela "Conteúdo e direitos" do app.
- **Violência não é só agressão física** · A Lei Maria da Penha reconhece diferentes formas de violência. · Física, Psicológica, Sexual, Patrimonial, Moral
- **Sinais de um relacionamento abusivo** · Controlar o celular, isolar das amigas, ameaçar e humilhar também são sinais de alerta. · Controla o seu celular / Afasta você das amigas / Ameaça e humilha
- **Medida protetiva sem boletim** · Desde 2023 (Lei 14.550), a medida protetiva pode ser concedida sem boletim de ocorrência, inquérito ou processo.
- **Monitoramento do agressor** · Desde 2026 (Lei 15.383), o monitoramento eletrônico do agressor é uma medida protetiva própria.
- **Pedido sem advogado e sem custo** · Você pode pedir a medida protetiva na delegacia, sem precisar de advogado e sem pagar nada. · Delegacia → Pedido → Proteção
- Microtextos das ilustrações: forma de violência · Pedido de medida protetiva (Pedido enviado → Em análise → Concedida) · Boletim de ocorrência · Não exigido · Sinais de alerta · Nível de atenção · Você · Alerta de aproximação · agora · Custo · R$ 0,00 · Advogado · Não precisa
- Dores, item 5: link **Conheça seus direitos** → `#direitos`.

### 3.86 O que sua guardiã recebe (`#guardia`)
- Chip: **Rede de apoio**
- H2: **O que sua guardiã recebe quando você pede ajuda.**
- Subtítulo: Você escolhe até 5 pessoas de confiança. Elas só são avisadas quando você aciona o SOS.
- **Um alerta na hora** · Um toque longo no SOS e ela recebe o aviso, sem barulho no seu celular.
- **Onde você está** · A localização vai junto com o alerta, e só quando você aciona o SOS.
- **A confirmação** · Ela confirma que recebeu, e você vê quem já foi avisada.
- **Só o necessário** · Seus registros, o cofre e a leitura de risco continuam só com você.

### 3.9 FAQ (`#faq`)
- Chip: **Dúvidas**
- H2: **Perguntas que você pode estar se fazendo.**
- Subtítulo: Toque numa pergunta e o Amparo responde.
- Card de conversa: perguntas à esquerda, respostas do Amparo à direita com "agora"
- Faixa de emergência: **Em perigo agora? Ligue 190.** · **Precisa de orientação? Ligue 180**: gratuito, sigiloso, 24 horas.
1. **O Amparo é gratuito? Preciso baixar em alguma loja?** É gratuito e funciona direto no navegador do celular. É só acessar.
2. **Preciso ter feito denúncia ou ter medida protetiva?** Não. Você pode usar o Amparo a qualquer momento, inclusive antes de decidir denunciar.
3. **E se ele pegar o meu celular?** Ele vai ver uma calculadora que funciona normalmente. A área protegida só abre com o seu código.
4. **Meus dados estão seguros?** Senhas e código são guardados com criptografia, a conexão é segura e a localização só é usada quando você aciona o SOS. Você pode apagar seus registros quando quiser, como garante a LGPD.
5. **O app explica os meus direitos?** Sim. A Central de Direitos explica a Lei Maria da Penha, as medidas protetivas e os sinais de um relacionamento abusivo em linguagem simples.
6. **Conheço alguém que pode precisar. Como indico?** Compartilhe o link com cuidado, numa conversa a sós e num momento seguro, de preferência num celular que só ela usa.
7. **O Amparo substitui a polícia?** Não. Em perigo imediato, ligue **190**. Para orientação, ligue **180**.

### 3.10 CTA final (`#cta`)
- Chip: **O primeiro passo**
- H2: **Você merece se sentir segura.**
- Texto: Gratuito, discreto e direto no navegador do celular. O primeiro passo pode ser pequeno.
- CTA: **Acessar o Amparo**
- Micro-itens: Gratuito · Funciona no navegador · Modo disfarce
- Notificações ao lado do celular: **Alerta enviado à sua rede** · Sua rede foi avisada / **Localização compartilhada** · Só com as suas guardiãs
- Cartão "Hoje" (fora do uso desde 11/11/2026): 09:12 · **Registro salvo no cofre** / 18:40 · **Alerta enviado à sua rede** / 18:41 · **Ana Beatriz confirmou**

### 3.11 Rodapé
- Logo branco + **Você não está sozinha.** · Ajuda que cabe no seu celular sem chamar atenção.
- Pílulas: Discreto · Com IA · Gratuito
- Colunas: **Navegação** (Como funciona · Leitura de risco · Como começar · Dúvidas · Voltar ao topo) · **Seus direitos** (Central de direitos · Ligue 180 · Central da Mulher · Emergência · 190) · **Projeto** (Acessar o Amparo · Sobre o TCC)
- Links: Como funciona · Leitura de risco · Como começar · Dúvidas · **Voltar ao topo**
- Emergência: **Ligue 190** · **Ligue 180**
- Texto legal: Amparo é um projeto acadêmico (TCC — Ciência da Computação, UNIRP, 2026) em desenvolvimento. Não substitui os serviços oficiais de segurança e atendimento à mulher.
- Dados: 19º Anuário Brasileiro de Segurança Pública (FBSP, 2025).
- © 2026 Amparo · Projeto de TCC em Ciência da Computação, UNIRP

---

## 4. Microcopy e acessibilidade
- Todo CTA principal: **Acessar o Amparo** (não variar).
- `aria-label` do SOS demo: "Demonstração do botão SOS. Segure para testar. Nada será enviado."
- Alt dos mockups: descreva a tela, por exemplo "Tela inicial do Amparo com o botão SOS e atalhos rápidos".
- Estado de foco visível em todos os links e botões.
- Com `prefers-reduced-motion`, os contadores mostram o número final e as animações viram fade simples.
