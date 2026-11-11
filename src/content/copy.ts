/**
 * Textos da landing — fonte única no código.
 * Transcrito de COPY.md, palavra por palavra. Não editar aqui sem editar o COPY.md.
 *
 * `Rich`: trechos com ênfase (o COPY.md marca negrito com ** e itálico com *).
 * Os textos dentro das telas do app (`app`, `ui`) vêm das telas do protótipo e do DESIGN.md.
 */

export type RichPart = string | { strong: string } | { em: string }
export type Rich = RichPart[]

/** Item com início em negrito seguido de texto: "**Título** resto". */
export type Lead = { strong: string; rest: string }

export const meta = {
  title: 'Amparo — Você não está sozinha',
  description:
    'Amparo é um app discreto de proteção para mulheres em situação de violência doméstica. Parece uma calculadora, aciona sua rede de apoio com um toque e guarda suas provas com segurança.',
  ogTitle: 'Amparo — Você não está sozinha',
  ogDescription: 'Ajuda que cabe no seu celular sem chamar atenção.',
}

export const cta = {
  /** Todo CTA principal (COPY.md §4: não variar). */
  acessar: 'Acessar o Amparo',
}

// 3.01
export const preloader = {
  line: 'Preparando um lugar seguro para você',
}

// 3.0
export const nav = {
  links: [
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Leitura de risco', href: '#leitura-risco' },
    { label: 'Como começar', href: '#comecar' },
    { label: 'Dúvidas', href: '#faq' },
  ],
  /** Link de texto antes do botão (abre VITE_APP_URL). */
  entrar: 'Entrar',
}

// 3.1
export const hero = {
  chip: 'Proteção discreta para mulheres',
  h1: 'Você não está sozinha.',
  sub: 'Um app que parece uma calculadora, avisa quem você confia com um toque e guarda suas provas num cofre que só você abre.',
  ctaSecondary: { label: 'Ver como funciona', href: '#como-funciona' },
  checks: ['Gratuito', 'Funciona no navegador do celular', 'Seus dados protegidos pela LGPD'],
  /** Pílulas flutuantes. O SOS não tem item próprio nas Dores: leva ao início da seção. */
  pills: [
    { label: 'Modo Disfarce', href: '#dor-disfarce' },
    { label: 'SOS silencioso', href: '#como-funciona' },
  ],
  /** Notificações flutuantes (aparecem em sequência, a mais nova em cima). */
  notifications: [
    { title: 'Alerta enviado', text: 'Sua rede foi avisada', time: 'agora' },
    { title: 'Ana Beatriz confirmou', text: 'Está a caminho', time: '12:31' },
    { title: 'Prova verificada', text: 'Arquivo sem alterações', time: '21:47' },
  ],
}

export type Stat = {
  value: number
  decimals?: number
  /** Texto exibido depois do número (ex.: "%", " em 10"). */
  suffix?: string
  label: string
}

// 3.3 (cartões de números dentro de #contexto)
export const numeros = {
  stats: [
    { value: 1492, label: 'feminicídios em 2024, o maior número já registrado no Brasil' },
    {
      value: 64.3,
      decimals: 1,
      suffix: '%',
      label: 'das vítimas foram mortas dentro da própria casa',
    },
    { value: 8, suffix: ' em 10', label: 'autores eram companheiros ou ex-companheiros' },
    { value: 101656, label: 'medidas protetivas descumpridas pelo agressor em 2024' },
  ] satisfies Stat[],
}

// 3.2
export const marquee = {
  items: [
    'Modo Disfarce',
    'SOS silencioso',
    'Cofre de provas',
    'Rede de apoio',
    'Leitura de risco',
    'Seus direitos',
    'Feito para o celular',
    'Protegido pela LGPD',
  ],
}

// 3.3 e 3.4 (a frase do Manifesto é `fecho`)
export const contexto = {
  h2: 'Na maioria dos casos, o perigo está dentro de casa.',
  text: 'A violência doméstica cresce em silêncio. Muitas mulheres convivem com quem as agride, dividem o mesmo teto e, muitas vezes, o mesmo celular. Pedir ajuda pode ser arriscado.',
  fecho: 'Por trás de cada número, existe uma mulher. O Amparo foi feito para ela.',
}

// 3.5
export const beneficios = {
  chip: 'Benefícios',
  h2a: 'Mais que um app de proteção.',
  h2b: 'Um amparo no seu dia a dia.',
  /** Cartões no padrão Gardance (pedido do cliente): tópico, texto e link para o recurso. */
  cards: [
    {
      slot: 'beneficio-tranquilidade',
      title: 'Mais tranquilidade',
      text: 'Sua rede de apoio fica a um toque, mesmo em silêncio.',
    },
    {
      slot: 'beneficio-controle',
      title: 'Sua história, suas escolhas',
      text: 'Registre agora e decida depois o que fazer, sem pressão.',
    },
    {
      slot: 'beneficio-confianca',
      title: 'Decida com informação',
      text: 'Entenda seus direitos e acompanhe como está o seu risco.',
    },
  ],
} as const

// 3.6 (`#como-funciona`)
export const dores = {
  /**
   * Cada dor com o recurso que responde a ela (padrão NextPay). chip = recurso; title = a dor;
   * answer = como o Amparo responde; id = âncora do item. Só o item 4 tem link (COPY 3.6).
   */
  items: [
    {
      id: 'dor-disfarce',
      chip: 'Modo Disfarce',
      title: 'Ele pode ver o seu celular.',
      answer: 'Por fora, o Amparo é uma calculadora. A área protegida só abre com o seu código.',
    },
    {
      id: 'dor-cofre',
      chip: 'Cofre de provas',
      title: 'Medo de não ter provas.',
      answer:
        'Cada registro guarda data, hora, local e um código que mostra que nada foi alterado.',
    },
    {
      id: 'dor-rede',
      chip: 'Rede de apoio',
      title: 'Denunciar parece um passo grande demais.',
      answer:
        'Você pode pedir ajuda a quem confia, sem boletim de ocorrência e sem medida protetiva.',
    },
    {
      id: 'dor-risco',
      chip: 'Leitura de risco',
      title: 'Não saber se é grave.',
      answer: 'A IA mostra se o risco está baixo, médio ou alto, e você sempre vê o porquê.',
      link: { label: 'Como o Amparo ajuda', href: '#leitura-risco' },
    },
    {
      id: 'dor-direitos',
      chip: 'Seus direitos',
      title: 'Não saber quais são seus direitos.',
      answer: 'A Lei Maria da Penha explicada em linguagem simples, dentro do app.',
      link: { label: 'Conheça seus direitos', href: '#direitos' },
    },
  ] as {
    id: string
    chip: string
    title: string
    answer: string
    link?: { label: string; href: string }
  }[],
  /** Banner no topo da seção, dentro do cartão vinho. */
  banner: {
    chip: 'Feito para a sua realidade',
    line1: 'Pedir ajuda',
    line2: 'não deveria ser um risco.',
    sub: 'Cada recurso do Amparo nasceu de uma barreira real: o medo de ser vista, a falta de provas e a dúvida sobre o que fazer. Aqui, pedir ajuda é discreto, seguro e no seu tempo.',
    pills: ['Parece uma calculadora', 'Provas protegidas', 'Ajuda sem precisar denunciar'],
  },
  /** Botão ao final da seção. */
  button: { label: 'Conheça a leitura de risco', href: '#leitura-risco' },
}

// 3.7 (`#leitura-risco`)
export const leituraRisco = {
  chip: 'Inteligência artificial',
  h2: 'Uma IA que apoia, sem decidir por você.',
  sub: 'A partir dos seus registros e dos acionamentos do SOS, o Amparo faz uma leitura do seu risco e adapta o que mostra para você. Você sempre pode ver o porquê.',
  /**
   * Pílulas que orbitam a esfera (ajustes da seção 7, pedido do cliente): o que a IA considera.
   * As 5 primeiras também aparecem no celular.
   */
  fontes: [
    'Seus registros',
    'Acionamentos do SOS',
    'Sinais de risco oficiais',
    'Frequência dos registros',
    'Ameaças relatadas',
    'Tipo de violência',
    'Histórico recente',
  ],
  adapta: {
    /** Texto do cliente (ajustes da seção 7). */
    title: 'Como o app se adapta ao seu risco',
    /** Linha do tempo (ajustes 7 da seção 7, textos do cliente). */
    ariaLabel: 'Níveis de risco e como o app se adapta',
    levels: [
      {
        label: 'Baixo',
        title: 'Tudo tranquilo',
        text: 'O acompanhamento continua discreto, em segundo plano.',
      },
      {
        label: 'Médio',
        title: 'Mais atenção',
        text: 'Os sinais de alerta aparecem e sua rede fica pronta, se você quiser.',
      },
      {
        label: 'Alto',
        title: 'Ajuda em primeiro lugar',
        text: 'Os canais de emergência ficam à frente: 180, 190 e a delegacia mais próxima.',
      },
    ],
  },
}

// 3.85 — Seus direitos (bento; pedido do cliente, 11/11/2026)
export const direitos = {
  chip: 'Seus direitos',
  h2: 'O que a lei garante, sem juridiquês.',
  sub: 'No app, a Central de Direitos explica cada passo em linguagem simples. Aqui vai um pouco do que você encontra lá.',
  tipos: {
    title: 'Violência não é só agressão física',
    text: 'A Lei Maria da Penha reconhece diferentes formas de violência.',
    chips: ['Física', 'Psicológica', 'Sexual', 'Patrimonial', 'Moral'],
  },
  sinais: {
    title: 'Sinais de um relacionamento abusivo',
    text: 'Controlar o celular, isolar das amigas, ameaçar e humilhar também são sinais de alerta.',
    itens: ['Controla o seu celular', 'Afasta você das amigas', 'Ameaça e humilha'],
  },
  semBoletim: {
    title: 'Medida protetiva sem boletim',
    text: 'Desde 2023 (Lei 14.550), a medida protetiva pode ser concedida sem boletim de ocorrência, inquérito ou processo.',
    doc: 'Medida protetiva',
  },
  monitoramento: {
    title: 'Monitoramento do agressor',
    text: 'Desde 2026 (Lei 15.383), o monitoramento eletrônico do agressor é uma medida protetiva própria.',
  },
  pedido: {
    title: 'Pedido sem advogado e sem custo',
    text: 'Você pode pedir a medida protetiva na delegacia, sem precisar de advogado e sem pagar nada.',
    passos: ['Delegacia', 'Pedido', 'Proteção'],
  },
  /** Microtextos das ilustrações (pedido do cliente, ajustes do bento; decorativos). */
  art: {
    formaLegenda: 'forma de violência',
    pedidoTitulo: 'Pedido de medida protetiva',
    etapas: ['Pedido enviado', 'Em análise', 'Concedida'],
    boletim: 'Boletim de ocorrência',
    naoExigido: 'Não exigido',
    sinaisTitulo: 'Sinais de alerta',
    atencao: 'Nível de atenção',
    voce: 'Você',
    alerta: 'Alerta de aproximação',
    agora: 'agora',
    custo: 'Custo',
    advogado: 'Advogado',
    naoPrecisa: 'Não precisa',
  },
  /** Topo do cartão do celular (pedido do cliente: título, subtítulo e ícone no lugar do badge). */
  central: {
    title: 'Central de Direitos',
    text: 'Tudo o que a lei garante, explicado em linguagem simples dentro do app.',
  },
  /** alt do celular (tela codada, descrita como imagem) */
  altTela: 'Tela "Conteúdo e direitos" do Amparo, com a Lei Maria da Penha explicada, como pedir uma medida protetiva e o monitoramento eletrônico do agressor.',
}

// 3.86 — O que sua guardiã recebe (banner; pedido do cliente, 11/11/2026). Textos redigidos a
// partir do COPY (SOS, localização só no SOS, confirmação, cofre e leitura privados) — revisar.
export const guardia = {
  chip: 'Rede de apoio',
  h2: 'O que sua guardiã recebe quando você pede ajuda.',
  sub: 'Você escolhe até 5 pessoas de confiança. Elas só são avisadas quando você aciona o SOS.',
  itens: [
    { title: 'Um alerta na hora', text: 'Um toque longo no SOS e ela recebe o aviso, sem barulho no seu celular.' },
    { title: 'Onde você está', text: 'A localização vai junto com o alerta, e só quando você aciona o SOS.' },
    { title: 'A confirmação', text: 'Ela confirma que recebeu, e você vê quem já foi avisada.' },
    { title: 'Só o necessário', text: 'Seus registros, o cofre e a leitura de risco continuam só com você.' },
  ],
}

// 3.8 (a construir: textos revisados contra o COPY 3.8 na construção)
export const comecar = {
  chip: 'Como começar',
  h2: 'Comece em poucos minutos.',
  /** Subtítulo (pedido do cliente, seção 8). */
  sub: 'Do primeiro acesso à sua rede de apoio pronta, tudo pelo navegador do celular.',
  /** Passos (COPY 3.8): rótulo da barra, título e 1 linha. */
  steps: [
    { label: '1. Crie sua conta', title: 'Crie sua conta', text: 'Use um e-mail ao qual só você tenha acesso.' },
    { label: '2. Modo Disfarce', title: 'Ative o Modo Disfarce', text: 'Escolha um código de 4 números que só você sabe.' },
    { label: '3. Rede de apoio', title: 'Adicione sua rede', text: 'Convide pelo menos uma pessoa de confiança.' },
    { label: '4. Pronto', title: 'Pronto', text: 'O Amparo fica com você, discreto, até você precisar.' },
  ],
  /** Microtextos dos cartões do palco (pedido do cliente; boas-vindas = tela boas-vindas.png). */
  cards: {
    boasVindas: {
      title: 'Você não está sozinha',
      text: 'Peça ajuda a qualquer momento, com um toque mesmo com a tela bloqueada.',
      opcoes: ['Criar conta', 'Entrar'],
    },
    disfarce: {
      title: 'Criando seu código…',
      sub: '4 números que só você sabe',
      icone: 'Ícone de calculadora',
    },
    rede: {
      title: 'Convidando sua rede…',
      guardias: [
        { name: 'Ana Beatriz', initials: 'AB' },
        { name: 'Lúcia', initials: 'LU' },
        { name: 'Rafaela', initials: 'RA' },
      ],
      enviado: 'Convite enviado',
      aceitou: 'Aceitou',
    },
    pronto: {
      title: 'Tudo pronto',
      itens: ['Conta criada', 'Modo Disfarce ativo', 'Rede de apoio pronta'],
    },
  },
  /** Celular: progresso no topo de cada bloco ('1/4'…). */
  de: '/4',
  ariaPassos: 'Passos para começar',
}

// 3.9 (a construir: textos revisados contra o COPY 3.9 na construção)
export const faq = {
  h2: 'Perguntas frequentes',
  sub: 'Respostas rápidas para as dúvidas mais comuns.',
  items: [
    { q: 'O Amparo é gratuito?', a: ['Sim.'] satisfies Rich },
    {
      q: 'Preciso baixar em alguma loja?',
      a: [
        'Não. O Amparo funciona direto no navegador do seu celular. É só acessar.',
      ] satisfies Rich,
    },
    {
      q: 'Preciso ter feito denúncia ou ter medida protetiva?',
      a: [
        'Não. Você pode usar o Amparo em qualquer momento, inclusive antes de decidir denunciar.',
      ] satisfies Rich,
    },
    {
      q: 'As minhas guardiãs vão saber que eu uso o Amparo?',
      a: [
        'Elas recebem um convite discreto, que não revela o motivo nem o nome do app, e só são avisadas quando você aciona o pedido de ajuda.',
      ] satisfies Rich,
    },
    {
      q: 'E se ele pegar o meu celular?',
      a: [
        'Com o Modo Disfarce, ele vai ver uma calculadora que funciona normalmente. A área protegida só abre com o seu código.',
      ] satisfies Rich,
    },
    {
      q: 'Os registros valem como prova?',
      a: [
        'Cada registro guarda data, hora, local e um código de integridade que mostra que o arquivo não foi alterado. Isso fortalece o valor do registro, e a decisão de usá-lo é sempre sua.',
      ] satisfies Rich,
    },
    {
      q: 'A inteligência artificial decide o que eu devo fazer?',
      a: [
        'Não. Ela oferece uma leitura do risco para apoiar você. Você pode ver como ela chegou nisso e ignorar a sugestão quando quiser.',
      ] satisfies Rich,
    },
    {
      q: 'O Amparo substitui a polícia?',
      a: [
        'Não. Em perigo imediato, ligue ',
        { strong: '190' },
        '. Para orientação, ligue ',
        { strong: '180' },
        ': é gratuito, sigiloso e funciona 24 horas.',
      ] satisfies Rich,
    },
  ],
}

// 3.10 (a construir: textos revisados contra o COPY 3.10 na construção)
export const ctaFinal = {
  h2: 'Você merece se sentir segura.',
  text: 'O primeiro passo pode ser pequeno e discreto.',
  /** Cartão "Hoje" (linha do tempo de exemplo no app). */
  hojeTitle: 'Hoje',
  hoje: [
    { time: '09:12', text: 'Registro salvo no cofre' },
    { time: '18:40', text: 'Alerta enviado à sua rede' },
    { time: '18:41', text: 'Ana Beatriz confirmou' },
  ],
}

// Faixa de emergência (3.9 e 3.11) — os números viram links tel:
export const emergencia = {
  perigo: { before: 'Em perigo agora? Ligue ', number: '190', after: '.' },
  orientacao: {
    before: 'Precisa de orientação? Ligue ',
    number: '180',
    after: ': gratuito, sigiloso, 24 horas.',
  },
  /** Cartão flutuante sobre a foto de #contexto (texto do cliente, ajustes 3, 10/11/2026). */
  ligue180: 'Ligue 180',
  info180: 'Gratuito, sigiloso, 24 horas',
}

// 3.11 (links: `nav.links` + "Voltar ao topo")
export const footer = {
  voltarTopo: 'Voltar ao topo',
  lema: 'Você não está sozinha.',
  legal:
    'Amparo é um projeto acadêmico (TCC — Ciência da Computação, UNIRP, 2026) em desenvolvimento. Não substitui os serviços oficiais de segurança e atendimento à mulher.',
  dados: 'Dados: 19º Anuário Brasileiro de Segurança Pública (FBSP, 2025).',
  copyright: '© 2026 Amparo',
}

// §4
export const a11y = {
  altHome: 'Tela inicial do Amparo com o botão SOS e atalhos rápidos',
  altCalculadora: 'Calculadora do Modo Disfarce do Amparo',
}

/**
 * Textos das telas do app (replicados das telas do protótipo em src/assets/app-screens/).
 * Não são copy de marketing: são a interface real do app dentro dos mockups.
 */
export const app = {
  /** Tela inicial atual do app (inicio-celular.png). */
  home: {
    initials: 'MA',
    greeting: 'Olá, Marina',
    subtitle: 'Como podemos te ajudar hoje?',
    ocorrencias: 'Ocorrências',
    periodo: 'Esta semana',
    days: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
    sos: 'SOS',
    risco: {
      title: 'Leitura de risco',
      badge: 'IA',
      levels: ['Baixo', 'Médio', 'Alto'],
      active: 1,
      link: 'Como a IA calcula →',
    },
    quickTitle: 'Ações rápidas',
    quick: ['Registrar prova', 'Delegacias próximas', 'Ativar Modo Disfarce', 'Adicionar guardião'],
  },
  /** home-sos.png (celular central do hero, depois do desbloqueio). */
  homeSos: {
    greeting: 'Olá, Marina',
    subtitle: 'Como podemos te ajudar hoje?',
    ocorrencias: 'Ocorrências',
    periodo: 'Últimos 7 dias',
    days: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
    /** Dias com registro (barras em vinho). */
    marked: [1, 3, 4, 5],
    ajudaTitle: 'Está precisando de ajuda?',
    ajudaText:
      'Toque e segure o botão abaixo por alguns segundos para acionar uma emergência silenciosa.',
    sos: 'SOS',
    quickTitle: 'Ações rápidas',
    quick: [
      'Registrar prova',
      'Adicionar guardião',
      'Ver minhas ocorrências',
      'Delegacias próximas',
    ],
  },
  /** rede-de-apoio.png (celular esquerdo do hero). */
  redeTela: {
    title: 'Rede de apoio',
    subtitle: 'Pessoas de confiança que podem ser avisadas em situações de risco.',
    button: 'Adicionar guardião',
    quick: [
      ['Como funciona', 'o convite'],
      ['Se ela não', 'responder'],
      ['Sua privacidade', ''],
      ['Trocar guardiã', 'principal'],
    ],
  },
  /** ocorrencias.png (celular direito do hero). */
  ocorrenciasTela: {
    title: 'Ocorrências',
    subtitle: 'O que você guardou fica em um cofre que só você abre.',
    count: '7',
    countTitle: 'Ocorrências registradas',
    countText:
      'Criptografado e guardado só no seu aparelho. Só você tem a chave que abre esse cofre.',
    button: 'Registrar nova ocorrência',
    quick: [
      'Isso vira prova legal?',
      'Quem pode ver isso',
      'Por que registrar mesmo sem denunciar',
      'Posso apagar uma ocorrência depois?',
    ],
    ultimos: 'Últimos registros',
    registro: { title: 'Ocorrência registrada', date: '14/03', time: '21:47' },
  },
  /** home-leitura-risco.png (#dores, item "Leitura de risco"). */
  homeRisco: {
    greeting: 'Olá, Marina',
    subtitle: 'Como podemos te ajudar hoje?',
    quickTitle: 'Ações rápidas',
    quick: [
      'Registrar prova',
      'Adicionar guardião',
      'Ver minhas ocorrências',
      'Delegacias próximas',
    ],
    cardTitle: 'Tudo por aqui está tranquilo',
    cardText:
      'O acompanhamento discreto segue ativo. Nada novo foi registrado nos últimos 12 dias.',
    cardLink: 'Ver como chegamos nisso',
    atalhos: ['Como funcionam as ocorrências', 'Central de Conteúdo e Direitos'],
  },
  /** Card de leitura de risco da tela inicial focada no risco (#dores, item 4): nível "Médio". */
  comoChegamos: {
    riscoTitle: 'Leitura de risco',
    riscoBadge: 'IA',
    levels: ['Baixo', 'Médio', 'Alto'],
    active: 1,
    /** Texto do nível Médio (COPY 3.7). */
    medioText: 'O app prepara um aviso discreto para a sua rede, enviado só se você confirmar.',
  },

  /** conteudo-direitos.png (#dores, item "Seus direitos"). */
  direitosTela: {
    title: 'Conteúdo e direitos',
    subtitle: 'O que a lei garante para você, em linguagem simples.',
    lerMais: 'Ler mais',
    cards: [
      {
        title: 'Lei Maria da Penha, explicada',
        text: 'Entenda o que a lei garante e os 5 tipos de violência que ela reconhece.',
      },
      {
        title: 'Como pedir uma Medida Protetiva',
        text: 'O passo a passo, sem precisar de advogado, e sem custo nenhum.',
      },
      {
        title: 'Monitoramento eletrônico do agressor',
        /** Na tela, o texto continua escondido atrás da barra; só a 1ª linha aparece. */
        text: 'Desde 2026, isso já pode ser aplicado',
      },
    ],
  },
  /** prova-verificada.png */
  prova: {
    title: 'Áudio · 2 min 14 s',
    date: '14/03, 21:47',
    guardado: 'Guardado com segurança',
    guardadoText: 'Criptografado neste aparelho em 14/03, 21:49.',
    verificada: 'Prova verificada',
    verificadaText:
      'O arquivo não foi alterado desde o registro. Isso é o que dá valor legal a ele.',
    hashLabel: 'Hash de integridade',
    registrado: 'Registrado em 14/03, 21:47',
  },
  /** rede-de-apoio.png */
  rede: [
    {
      name: 'Ana Beatriz',
      initials: 'AB',
      group: 'Família',
      status: 'Confirmou há 2 dias',
      confirmed: true,
      principal: true,
    },
    {
      name: 'Rafaela',
      initials: 'RA',
      group: 'Amigos',
      status: 'Confirmou há 3 semanas',
      confirmed: true,
      principal: false,
    },
    {
      name: 'Lúcia',
      initials: 'LU',
      group: 'Amigos',
      status: 'Convite enviado há 1 dia',
      confirmed: false,
      principal: false,
    },
  ],
  /** Telas de cadastro (cadastro-*.png) e DESIGN.md §9 "Como começar". */
  cadastro: {
    etapas: ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4'],
    emailLabel: 'E-mail',
    emailPlaceholder: 'Digite seu e-mail',
    disfarce: 'Ativar Modo Disfarce',
    codigo: 'Seu código',
    guardiaPrincipal: 'Guardiã principal',
    adicionarGuardia: 'Adicionar guardiã',
    pronto: 'Tudo pronto',
  },
}

/** Fragmentos de UI usados nos cartões flutuantes (DESIGN.md §6.6 e §9). */
export const ui = {
  verDeNovo: 'Ver de novo',
}
