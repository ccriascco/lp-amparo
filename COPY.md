# Amparo — Estratégia e Copy da Landing Page

> Fonte de verdade para **todo texto** da landing. O Claude Code não deve inventar textos, números ou funcionalidades fora deste arquivo. Números vêm do artigo do TCC (Entrega 1, set/2026) e das fontes citadas nele.

---

## 1. Estratégia

### Objetivo
Levar a visitante a **abrir o Amparo** (web app hospedado na Netlify) e criar a conta. Não há loja de apps: todo CTA aponta para `import.meta.env.VITE_APP_URL`.

### Públicos (em ordem de prioridade)
1. **Mulher em situação de violência doméstica**, ou que suspeita estar. Precisa sentir em segundos: *isso é para mim, é seguro, é discreto, é fácil*.
2. **Quem quer ajudar** (amiga, irmã, mãe, colega). Vai indicar o app ou virar guardiã.
3. **Banca, professores, congresso e imprensa.** Querem contexto, rigor técnico e transparência sobre o estágio do projeto.

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
- Frases curtas. Linguagem simples, sem juridiquês e sem jargão técnico fora da seção "Sobre o projeto".
- **Nunca** culpa, sensacionaliza ou usa imagem de violência explícita. Os números aparecem com respeito, sem tom de alarme.
- Sempre deixa claro que **a decisão é dela** ("apoia, não decide por você").
- Termos fixos: *Modo Disfarce*, *SOS*, *guardiãs*, *rede de apoio*, *cofre*, *ocorrência*, *leitura de risco*. Guardiãs podem ser qualquer pessoa de confiança; quando precisar ser inclusivo, use "pessoas de confiança".

### Honestidade (obrigatório)
- O Amparo é um **projeto de TCC** em desenvolvimento. A página mostra isso no rodapé e na seção `#projeto`.
- As métricas da IA são em **dados sintéticos**; sempre vêm acompanhadas dessa ressalva.
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

## 3. Copy por seção (na ordem da página)

### 3.0 Navegação (`<Header>`)
- Logo (horizontal vinho; versão branca sobre fundos escuros)
- Links: **Como funciona** (`#disfarce`) · **Recursos** (`#recursos`) · **Segurança** (`#seguranca`) · **Seus direitos** (`#direitos`) · **O projeto** (`#projeto`)
- CTA: **Acessar o Amparo**

---

### 3.1 Hero (`#inicio`)
- Chip (glass) acima do H1: **Proteção discreta para mulheres**
- H1: **Você não está sozinha.**
- Subtítulo: Um app que parece uma calculadora, avisa quem você confia com um toque e guarda suas provas num cofre que só você abre.
- CTA primário: **Acessar o Amparo**
- CTA secundário: **Ver como funciona** ↓
- Microcopy abaixo dos botões (3 itens, cada um com ícone de check, não separar com "·"): Gratuito / Funciona no navegador do celular / Seus dados protegidos pela LGPD
- Visual: celular mostrando a **calculadora**. Animação: digita `1 9 0 7`, toca `=`, a calculadora se dissolve e revela a tela inicial do Amparo ("Olá, Marina").
- Legenda discreta do visual: *Por fora, uma calculadora. Por dentro, o Amparo.*

---

### 3.2 Contexto (`#contexto`)
- H2: **Na maioria dos casos, o perigo está dentro de casa.**
- Texto: A violência doméstica cresce em silêncio. Muitas mulheres convivem com quem as agride, dividem o mesmo teto e, muitas vezes, o mesmo celular. Pedir ajuda pode ser arriscado.

Números (contadores animados):
| Número | Rótulo |
|---|---|
| **1.492** | feminicídios em 2024, o maior número já registrado no Brasil |
| **64,3%** | das vítimas foram mortas dentro da própria casa |
| **8 em 10** | autores eram companheiros ou ex-companheiros |
| **101.656** | medidas protetivas descumpridas pelo agressor em 2024 |

- Fonte (texto pequeno): Fonte: 19º Anuário Brasileiro de Segurança Pública (FBSP, 2025).

---

### 3.3 Dores (`#dores`)
- H2: **Pedir ajuda não deveria ser mais um risco.**
- Intro: Sabemos o que impede tantas mulheres de buscar apoio:

Cards (ícone + título + texto):
1. **Ele pode ver o seu celular.** Um app de proteção visível na tela pode virar motivo de briga ou de ameaça.
2. **Medo de não ter provas.** Fotos e áudios se perdem, são apagados ou têm a veracidade questionada.
3. **Denunciar parece um passo grande demais.** Nem toda mulher está pronta para ir à delegacia, e tudo bem.
4. **Não saber se é grave.** Quando a violência vira rotina, fica difícil perceber que o risco está aumentando.
5. **Não saber quais são seus direitos.** A lei protege, mas a informação nem sempre chega em linguagem simples.

- Fecho: **O Amparo foi desenhado a partir de cada uma dessas barreiras.** (link ghost: Conheça os recursos)

---

### 3.4 Modo Disfarce (`#disfarce`) — seção fixada com scroll (pin)
- H2: **Para todo mundo, é só uma calculadora.**
- Texto: Com o Modo Disfarce, o Amparo ganha o ícone e o nome de uma calculadora, e ela funciona de verdade. Só quando você digita o seu código secreto e toca em **=**, a sua área protegida se abre.

Passos revelados no scroll:
1. **Ícone e nome de calculadora** na tela do celular.
2. **Faz contas de verdade.** Qualquer outra sequência é só um cálculo.
3. **Seu código, seu acesso.** 4 números que só você sabe, seguidos de "=".
4. **Nem a tela de apps abertos entrega.** Na multitarefa aparece apenas a calculadora.

- Interação opcional: mini calculadora funcional na página. Dica abaixo dela: *Experimente: digite 1907 e toque em =* (código de demonstração).
- Nota: Você pode ligar ou desligar o disfarce e trocar o código quando quiser.

---

### 3.5 Recursos — visão geral (`#recursos`)
- H2: **Tudo o que você precisa, num só lugar.**
- Sub: Quatro recursos pensados para proteger, documentar, conectar e informar.

Grade bento (cada card leva à seção detalhada):
- **SOS silencioso** · Toque e segure. Sua localização vai para quem você confia.
- **Cofre de provas** · Registros com data, hora e local que não podem ser alterados.
- **Rede de apoio** · Até 5 pessoas de confiança, avisadas só quando você pedir.
- **Leitura de risco** · Uma IA que ajuda você a enxergar quando o risco aumenta.
- **Seus direitos** · A Lei Maria da Penha explicada em linguagem simples.
- **Modo Disfarce** · Por fora, uma calculadora comum.

---

### 3.6 SOS silencioso (`#sos`)
- Chip do pilar: **Proteger**
- H2: **Um toque longo. Nenhum barulho.**
- Texto: Toque e segure o botão SOS por alguns segundos. Sem som e sem alarde, o Amparo envia a sua localização em tempo real para a sua rede de apoio e continua atualizando enquanto o alerta estiver ativo.

Bullets:
- **Localização a cada 30 segundos** enquanto o aviso estiver ativo
- **Veja quem já confirmou** que recebeu o seu pedido
- **Segurar evita disparos sem querer**
- **Cancele quando quiser**, com um toque

- Interação: botão SOS demonstrativo. Label: **Segure para testar**. Ao completar o anel: *Demonstração concluída — nada foi enviado.*
- Visual lateral: tela "Alerta enviado" com a lista *Quem foi avisada* (Ana Beatriz — Confirmou · 12:31 / Lúcia — Aguardando / Rafaela — Aguardando).

---

### 3.7 Cofre de provas (`#cofre`)
- Chip do pilar: **Documentar**
- H2: **O que você guarda continua sendo verdade.**
- Texto: Registre o que aconteceu do seu jeito, com texto, foto, áudio ou vídeo. Data, hora e local entram sozinhos e não podem ser alterados. Cada prova recebe uma assinatura digital que mostra que o arquivo não foi modificado desde o registro.

Bullets:
- **Escolha o tipo de violência:** física, psicológica, sexual ou patrimonial
- **Só você abre o cofre.** Ninguém mais vê os seus registros
- **Prova verificada:** um código de integridade (hash SHA-256) acompanha cada arquivo
- **Registrar não é denunciar.** Você guarda agora e decide depois o que fazer

- Visual: card "Prova verificada", com hash `a3f9c2e7 · 8b41d05a · 6ec73912` animado (caracteres embaralhando até fixar).

---

### 3.8 Rede de apoio (`#rede`)
- Chip do pilar: **Conectar**
- H2: **Quem cuida de você, por perto quando precisar.**
- Texto: Escolha de uma a cinco pessoas de confiança: suas guardiãs. Elas só recebem um aviso quando você aciona o pedido de ajuda. Não é preciso ter feito denúncia nem ter medida protetiva.

Bullets:
- **Até 5 guardiãs**, com uma principal, que é avisada primeiro
- **Convite discreto pelo WhatsApp**, sem revelar o motivo nem o nome do app
- **O seu CPF nunca aparece** para as guardiãs

- Visual: avatares orbitando o símbolo do Amparo, conectados por linhas que se desenham no scroll.

---

### 3.9 Leitura de risco com IA (`#risco`)
- Chip do pilar: **Transformar**
- H2: **Uma leitura do risco que apoia você, sem decidir por você.**
- Texto: A partir dos seus registros e dos acionamentos do SOS, uma inteligência artificial indica se o seu risco está **baixo**, **médio** ou **alto** e adapta o que o app mostra para você.

Três níveis (tabs ou cards que acendem em sequência):
- **Baixo** · *Tudo por aqui está tranquilo.* O acompanhamento discreto segue ativo.
- **Médio** · O app prepara um aviso discreto para a sua rede, que só é enviado se você confirmar.
- **Alto** · Os caminhos de ajuda aparecem primeiro: Ligue 180, 190 e a delegacia especializada mais próxima.

- Destaque: **"Ver como chegamos nisso."** Você sempre pode ver quais sinais levaram àquela leitura. Nada disso é enviado para ninguém.
- Nota pequena: Os sinais considerados foram inspirados no Formulário Nacional de Avaliação de Risco (Lei nº 14.149/2021).

---

### 3.10 Seus direitos (`#direitos`)
- H2: **O que a lei garante para você, sem juridiquês.**
- Texto: Na Central de Conteúdo e Direitos do app, você encontra explicações curtas e claras para entender o que está acontecendo e quais caminhos existem.

Cards:
- **Lei Maria da Penha, explicada** · O que a lei garante e os 5 tipos de violência que ela reconhece.
- **Como pedir uma medida protetiva** · O passo a passo, sem precisar de advogado e sem custo.
- **Monitoramento eletrônico do agressor** · Desde 2026, pode ser aplicado como medida protetiva por si só.
- **Sinais de relacionamento abusivo** · Como reconhecer quando o controle vira violência.

Faixa "5 formas de violência" (chips): Física · Psicológica · Sexual · Patrimonial · Moral

---

### 3.11 Segurança e privacidade (`#seguranca`)
- H2: **A sua segurança vem antes de qualquer recurso.**
- Texto: Antes de entrar no app, cada funcionalidade passa por uma pergunta: *ela continua segura se o agressor pegar o seu celular?*

Itens (grade de 6):
- **Localização só quando você aciona.** Nunca em segundo plano sem o seu consentimento.
- **Notificações discretas.** Nada aparece na tela bloqueada.
- **Senhas e código protegidos.** Guardados apenas de forma criptografada (bcrypt).
- **Conexão segura.** Todo o tráfego passa por HTTPS.
- **Seus dados, suas regras.** Em conformidade com a LGPD: você pode acessar, corrigir e apagar.
- **Apagamento rápido.** Quando precisar, você apaga seus registros em poucos toques.

---

### 3.12 Como começar (`#comecar`)
- H2: **Comece em poucos minutos.**
- Passos (linha que se preenche no scroll):
  1. **Crie sua conta.** Use um e-mail ao qual só você tenha acesso.
  2. **Escolha o Modo Disfarce** e crie o seu código de 4 números.
  3. **Adicione sua rede de apoio.** Pelo menos uma pessoa de confiança.
  4. **Pronto.** O Amparo fica com você, discreto, até você precisar.
- CTA: **Acessar o Amparo**

---

### 3.13 Para quem quer ajudar (`#ajudar`)
- H2: **Conhece alguém que pode precisar?**
- Texto: Você pode ser a guardiã de alguém. Compartilhe o Amparo com cuidado: em uma conversa a sós, num momento seguro, sem pressionar.
- CTA: **Copiar link do Amparo** (copia a URL da landing → feedback: *Link copiado*)
- Dica pequena: Evite enviar o link para um celular que outra pessoa possa ver.

---

### 3.14 Sobre o projeto (`#projeto`)
- H2: **Tecnologia a serviço de quem precisa de amparo.**
- Texto: O Amparo é um Trabalho de Conclusão de Curso em Ciência da Computação na UNIRP. Nasceu de uma pergunta: como uma plataforma discreta, apoiada por inteligência artificial, pode reduzir as barreiras entre uma mulher e a ajuda de que ela precisa?
- Bloco "Por que é diferente": Uma revisão de 136 apps de proteção (Sumra et al., 2023) mostrou que nenhum usava inteligência artificial e que a maioria dependia só do acionamento manual. O Amparo une **disfarce**, **provas com integridade verificável** e **IA na avaliação de risco**.

Métricas da IA (cards pequenos):
- **97%** de acurácia
- **99%** de recall na classe de alto risco
- **Random Forest**, comparado com Regressão Logística e SVM
- Ressalva obrigatória logo abaixo: *Resultados obtidos em base sintética de 10.000 registros. A validação com dados reais, sob protocolo ético, é a próxima etapa.*

Stack (chips): React Native · TypeScript · NestJS · Supabase (PostgreSQL) · Python · FastAPI · Scikit-learn

Equipe:
- Eduardo Fauzi Barboza
- Lucas de Andrade Lameira
- Mário Otávio Viudes Alves
- Rafael Henrique Roncoleta
- Orientação: Me. Valéria Maria Volpe

---

### 3.15 FAQ (`#faq`)
1. **O Amparo é gratuito?** Sim.
2. **Preciso baixar em alguma loja?** Não. O Amparo funciona direto no navegador do seu celular. É só acessar.
3. **Preciso ter feito denúncia ou ter medida protetiva?** Não. Você pode usar o Amparo em qualquer momento, inclusive antes de decidir denunciar.
4. **As minhas guardiãs vão saber que eu uso o Amparo?** Elas recebem um convite discreto, que não revela o motivo nem o nome do app, e só são avisadas quando você aciona o pedido de ajuda.
5. **E se ele pegar o meu celular?** Com o Modo Disfarce, ele vai ver uma calculadora que funciona normalmente. A área protegida só abre com o seu código.
6. **Os registros valem como prova?** Cada registro guarda data, hora, local e um código de integridade que mostra que o arquivo não foi alterado. Isso fortalece o valor do registro, e a decisão de usá-lo é sempre sua.
7. **A inteligência artificial decide o que eu devo fazer?** Não. Ela oferece uma leitura do risco para apoiar você. Você pode ver como ela chegou nisso e ignorar a sugestão quando quiser.
8. **O Amparo substitui a polícia?** Não. Em perigo imediato, ligue **190**. Para orientação, ligue **180**: é gratuito, sigiloso e funciona 24 horas.

---

### 3.16 CTA final (`#cta`)
- H2: **Você merece se sentir segura.**
- Texto: O primeiro passo pode ser pequeno e discreto.
- CTA: **Acessar o Amparo**

---

### 3.17 Faixa de emergência (fixa acima do rodapé; versão compacta no topo do FAQ)
**Em perigo agora? Ligue 190.** · **Precisa de orientação? Ligue 180**: gratuito, sigiloso, 24 horas.
(Os números são links `tel:190` e `tel:180`.)

### 3.18 Rodapé
- Logo branco + "Você não está sozinha."
- Links das seções
- Texto legal: Amparo é um projeto acadêmico (TCC — Ciência da Computação, UNIRP, 2026) em desenvolvimento. Não substitui os serviços oficiais de segurança e atendimento à mulher.
- © 2026 Amparo

---

## 4. Microcopy e acessibilidade
- Todo CTA principal: **Acessar o Amparo** (não variar).
- `aria-label` do SOS demo: "Demonstração do botão SOS. Segure para testar. Nada será enviado."
- Alt dos mockups: descreva a tela, por exemplo "Tela inicial do Amparo com o botão SOS e atalhos rápidos".
- Estado de foco visível em todos os links e botões.
- Com `prefers-reduced-motion`, os contadores mostram o número final e as animações viram fade simples.
