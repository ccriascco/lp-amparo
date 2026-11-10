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
    { label: 'Como funciona', href: '#disfarce' },
    { label: 'Recursos', href: '#recursos' },
    { label: 'Segurança', href: '#seguranca' },
    { label: 'Seus direitos', href: '#direitos' },
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
  ctaSecondary: 'Ver como funciona',
  checks: ['Gratuito', 'Funciona no navegador do celular', 'Seus dados protegidos pela LGPD'],
  /** Notificações flutuantes (aparecem em sequência, a mais nova em cima). */
  notifications: [
    { title: 'Alerta enviado', text: 'Sua rede foi avisada', time: 'agora' },
    { title: 'Ana Beatriz confirmou', text: 'Está a caminho', time: '12:31' },
    { title: 'Prova verificada', text: 'Arquivo sem alterações', time: '21:47' },
  ],
}

// 3.2a
export type Stat = {
  value: number
  decimals?: number
  /** Texto exibido depois do número (ex.: "%", " em 10"). */
  suffix?: string
  label: string
}

export const numeros = {
  title: 'Por que o Amparo existe',
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
  source: 'Fonte: 19º Anuário Brasileiro de Segurança Pública (FBSP, 2025).',
}

// 3.2b
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

// 3.2c
export const contexto = {
  h2: 'Na maioria dos casos, o perigo está dentro de casa.',
  text: 'A violência doméstica cresce em silêncio. Muitas mulheres convivem com quem as agride, dividem o mesmo teto e, muitas vezes, o mesmo celular. Pedir ajuda pode ser arriscado.',
  fecho: 'Por trás de cada número, existe uma mulher. O Amparo foi feito para ela.',
}

// 3.3
export const dores = {
  h2: 'Pedir ajuda não deveria ser mais um risco.',
  intro: 'Sabemos o que impede tantas mulheres de buscar apoio:',
  items: [
    {
      title: 'Ele pode ver o seu celular.',
      text: 'Um app de proteção visível na tela pode virar motivo de briga ou de ameaça.',
    },
    {
      title: 'Medo de não ter provas.',
      text: 'Fotos e áudios se perdem, são apagados ou têm a veracidade questionada.',
    },
    {
      title: 'Denunciar parece um passo grande demais.',
      text: 'Nem toda mulher está pronta para ir à delegacia, e tudo bem.',
    },
    {
      title: 'Não saber se é grave.',
      text: 'Quando a violência vira rotina, fica difícil perceber que o risco está aumentando.',
    },
    {
      title: 'Não saber quais são seus direitos.',
      text: 'A lei protege, mas a informação nem sempre chega em linguagem simples.',
    },
  ],
  /** Link em cada cartão de dor e o destino de cada um (COPY 3.3). */
  link: 'Como o Amparo ajuda',
  linkTargets: ['#disfarce', '#cofre', '#rede', '#risco', '#direitos'],
  fecho: 'O Amparo foi desenhado a partir de cada uma dessas barreiras.',
  fechoButton: { label: 'Conheça os recursos', href: '#recursos' },
}

// 3.4
export const disfarce = {
  h2: 'Para todo mundo, é só uma calculadora.',
  text: [
    'Com o Modo Disfarce, o Amparo ganha o ícone e o nome de uma calculadora, e ela funciona de verdade. Só quando você digita o seu código secreto e toca em ',
    { strong: '=' },
    ', a sua área protegida se abre.',
  ] satisfies Rich,
  steps: [
    { strong: 'Ícone e nome de calculadora', rest: ' na tela do celular.' },
    { strong: 'Faz contas de verdade.', rest: ' Qualquer outra sequência é só um cálculo.' },
    { strong: 'Seu código, seu acesso.', rest: ' 4 números que só você sabe, seguidos de “=”.' },
    {
      strong: 'Nem a tela de apps abertos entrega.',
      rest: ' Na multitarefa aparece apenas a calculadora.',
    },
  ] satisfies Lead[],
  hint: 'Experimente: digite 1907 e toque em =',
  note: 'Você pode ligar ou desligar o disfarce e trocar o código quando quiser.',
}

// 3.5
export const recursos = {
  h2: 'Tudo o que você precisa, num só lugar.',
  sub: 'Quatro recursos pensados para proteger, documentar, conectar e informar.',
  items: [
    {
      id: 'sos',
      title: 'SOS silencioso',
      text: 'Toque e segure. Sua localização vai para quem você confia.',
      href: '#sos',
    },
    {
      id: 'cofre',
      title: 'Cofre de provas',
      text: 'Registros com data, hora e local que não podem ser alterados.',
      href: '#cofre',
    },
    {
      id: 'rede',
      title: 'Rede de apoio',
      text: 'Até 5 pessoas de confiança, avisadas só quando você pedir.',
      href: '#rede',
    },
    {
      id: 'risco',
      title: 'Leitura de risco',
      text: 'Uma IA que ajuda você a enxergar quando o risco aumenta.',
      href: '#risco',
    },
    {
      id: 'direitos',
      title: 'Seus direitos',
      text: 'A Lei Maria da Penha explicada em linguagem simples.',
      href: '#direitos',
    },
    {
      id: 'disfarce',
      title: 'Modo Disfarce',
      text: 'Por fora, uma calculadora comum.',
      href: '#disfarce',
    },
  ],
}

// 3.6
export const sos = {
  pillar: 'Proteger',
  h2: 'Um toque longo. Nenhum barulho.',
  text: 'Toque e segure o botão SOS por alguns segundos. Sem som e sem alarde, o Amparo envia a sua localização em tempo real para a sua rede de apoio e continua atualizando enquanto o alerta estiver ativo.',
  bullets: [
    { strong: 'Localização a cada 30 segundos', rest: ' enquanto o aviso estiver ativo' },
    { strong: 'Veja quem já confirmou', rest: ' que recebeu o seu pedido' },
    { strong: 'Segurar evita disparos sem querer', rest: '' },
    { strong: 'Cancele quando quiser', rest: ', com um toque' },
  ] satisfies Lead[],
  demoLabel: 'Segure para testar',
  demoDone: 'Demonstração concluída — nada foi enviado.',
  demoAria: 'Demonstração do botão SOS. Segure para testar. Nada será enviado.',
  avisadasTitle: 'Quem foi avisada',
  avisadas: [
    { name: 'Ana Beatriz', status: 'Confirmou · 12:31', confirmed: true },
    { name: 'Lúcia', status: 'Aguardando', confirmed: false },
    { name: 'Rafaela', status: 'Aguardando', confirmed: false },
  ],
}

// 3.7
export const cofre = {
  pillar: 'Documentar',
  h2: 'O que você guarda continua sendo verdade.',
  text: 'Registre o que aconteceu do seu jeito, com texto, foto, áudio ou vídeo. Data, hora e local entram sozinhos e não podem ser alterados. Cada prova recebe uma assinatura digital que mostra que o arquivo não foi modificado desde o registro.',
  bullets: [
    {
      strong: 'Escolha o tipo de violência:',
      rest: ' física, psicológica, sexual ou patrimonial',
    },
    { strong: 'Só você abre o cofre.', rest: ' Ninguém mais vê os seus registros' },
    {
      strong: 'Prova verificada:',
      rest: ' um código de integridade (hash SHA-256) acompanha cada arquivo',
    },
    {
      strong: 'Registrar não é denunciar.',
      rest: ' Você guarda agora e decide depois o que fazer',
    },
  ] satisfies Lead[],
  hash: 'a3f9c2e7 · 8b41d05a · 6ec73912',
  badge: 'Prova verificada',
}

// 3.8
export const rede = {
  pillar: 'Conectar',
  h2: 'Quem cuida de você, por perto quando precisar.',
  text: 'Escolha de uma a cinco pessoas de confiança: suas guardiãs. Elas só recebem um aviso quando você aciona o pedido de ajuda. Não é preciso ter feito denúncia nem ter medida protetiva.',
  bullets: [
    { strong: 'Até 5 guardiãs', rest: ', com uma principal, que é avisada primeiro' },
    {
      strong: 'Convite discreto pelo WhatsApp',
      rest: ', sem revelar o motivo nem o nome do app',
    },
    { strong: 'O seu CPF nunca aparece', rest: ' para as guardiãs' },
  ] satisfies Lead[],
}

// 3.9
export const risco = {
  pillar: 'Transformar',
  h2: 'Uma leitura do risco que apoia você, sem decidir por você.',
  text: [
    'A partir dos seus registros e dos acionamentos do SOS, uma inteligência artificial indica se o seu risco está ',
    { strong: 'baixo' },
    ', ',
    { strong: 'médio' },
    ' ou ',
    { strong: 'alto' },
    ' e adapta o que o app mostra para você.',
  ] satisfies Rich,
  levels: [
    {
      id: 'baixo',
      label: 'Baixo',
      text: [
        { em: 'Tudo por aqui está tranquilo.' },
        ' O acompanhamento discreto segue ativo.',
      ] satisfies Rich,
    },
    {
      id: 'medio',
      label: 'Médio',
      text: [
        'O app prepara um aviso discreto para a sua rede, que só é enviado se você confirmar.',
      ] satisfies Rich,
    },
    {
      id: 'alto',
      label: 'Alto',
      text: [
        'Os caminhos de ajuda aparecem primeiro: Ligue 180, 190 e a delegacia especializada mais próxima.',
      ] satisfies Rich,
    },
  ],
  highlight: {
    strong: '“Ver como chegamos nisso.”',
    rest: ' Você sempre pode ver quais sinais levaram àquela leitura. Nada disso é enviado para ninguém.',
  } satisfies Lead,
  note: 'Os sinais considerados foram inspirados no Formulário Nacional de Avaliação de Risco (Lei nº 14.149/2021).',
}

// 3.10
export const direitos = {
  h2: 'O que a lei garante para você, sem juridiquês.',
  text: 'Na Central de Conteúdo e Direitos do app, você encontra explicações curtas e claras para entender o que está acontecendo e quais caminhos existem.',
  cards: [
    {
      title: 'Lei Maria da Penha, explicada',
      text: 'O que a lei garante e os 5 tipos de violência que ela reconhece.',
      image: 'direitos-1',
    },
    {
      title: 'Como pedir uma medida protetiva',
      text: 'O passo a passo, sem precisar de advogado e sem custo.',
      image: 'direitos-2',
    },
    {
      title: 'Monitoramento eletrônico do agressor',
      text: 'Desde 2026, pode ser aplicado como medida protetiva por si só.',
      image: 'direitos-3',
    },
    {
      title: 'Sinais de relacionamento abusivo',
      text: 'Como reconhecer quando o controle vira violência.',
      image: 'direitos-4',
    },
  ],
  violenciasLabel: '5 formas de violência',
  violencias: ['Física', 'Psicológica', 'Sexual', 'Patrimonial', 'Moral'],
}

// 3.10b — no lugar dos depoimentos (nada de depoimento inventado)
export const mitos = {
  h2: 'Informação também protege.',
  sub: 'Algumas ideias erradas ainda afastam mulheres da ajuda de que precisam.',
  mitoLabel: 'Mito',
  verdadeLabel: 'Verdade',
  items: [
    {
      mito: 'Só é violência se deixar marca.',
      verdade:
        'A Lei Maria da Penha reconhece cinco formas de violência: física, psicológica, sexual, patrimonial e moral.',
    },
    {
      mito: 'Para ter medida protetiva, preciso de boletim de ocorrência.',
      verdade:
        'Desde 2023 (Lei nº 14.550), a medida protetiva pode ser concedida mesmo sem boletim de ocorrência, inquérito ou processo.',
    },
    {
      mito: 'Preciso de advogado para pedir proteção.',
      verdade: 'O pedido de medida protetiva pode ser feito sem advogado e sem custo.',
    },
    {
      mito: 'O Ligue 180 serve só para denunciar.',
      verdade:
        'O 180 também orienta sobre direitos e serviços. É gratuito, sigiloso e funciona 24 horas.',
    },
    {
      mito: 'Se ele nunca me bateu, não estou em risco.',
      verdade:
        'Ameaças, controle e isolamento também são sinais de risco e fazem parte da avaliação oficial de risco.',
    },
  ],
}

// 3.11
export const seguranca = {
  h2: 'A sua segurança vem antes de qualquer recurso.',
  text: [
    'Antes de entrar no app, cada funcionalidade passa por uma pergunta: ',
    { em: 'ela continua segura se o agressor pegar o seu celular?' },
  ] satisfies Rich,
  items: [
    {
      title: 'Localização só quando você aciona.',
      text: 'Nunca em segundo plano sem o seu consentimento.',
    },
    { title: 'Notificações discretas.', text: 'Nada aparece na tela bloqueada.' },
    {
      title: 'Senhas e código protegidos.',
      text: 'Guardados apenas de forma criptografada (bcrypt).',
    },
    { title: 'Conexão segura.', text: 'Todo o tráfego passa por HTTPS.' },
    {
      title: 'Seus dados, suas regras.',
      text: 'Em conformidade com a LGPD: você pode acessar, corrigir e apagar.',
    },
    {
      title: 'Apagamento rápido.',
      text: 'Quando precisar, você apaga seus registros em poucos toques.',
    },
  ],
}

// 3.12
export const comecar = {
  h2: 'Comece em poucos minutos.',
  /** Rótulos da barra de progresso do palco (COPY 3.12). */
  labels: ['1. Crie sua conta', '2. Modo Disfarce', '3. Rede de apoio', '4. Pronto'],
  steps: [
    { strong: 'Crie sua conta.', rest: ' Use um e-mail ao qual só você tenha acesso.' },
    { strong: 'Escolha o Modo Disfarce', rest: ' e crie o seu código de 4 números.' },
    { strong: 'Adicione sua rede de apoio.', rest: ' Pelo menos uma pessoa de confiança.' },
    { strong: 'Pronto.', rest: ' O Amparo fica com você, discreto, até você precisar.' },
  ] satisfies Lead[],
}

// 3.12b
export const acesso = {
  chip: 'Acesso gratuito',
  title: 'Tudo isso, sem pagar nada.',
  text: 'Sem loja de aplicativos e sem instalação complicada. Abra no navegador do celular e comece.',
  list: [
    'Modo Disfarce',
    'SOS silencioso',
    'Cofre de provas com integridade verificável',
    'Rede de até 5 guardiãs',
    'Leitura de risco',
    'Central de direitos',
  ],
}

// 3.13
export const ajudar = {
  h2: 'Conhece alguém que pode precisar?',
  text: 'Você pode ser a guardiã de alguém. Compartilhe o Amparo com cuidado: em uma conversa a sós, num momento seguro, sem pressionar.',
  cta: 'Copiar link do Amparo',
  copied: 'Link copiado',
  tip: 'Evite enviar o link para um celular que outra pessoa possa ver.',
}

// 3.14

// 3.15
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

// 3.16
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

// 3.17 — os números viram links tel:
export const emergencia = {
  perigo: { before: 'Em perigo agora? Ligue ', number: '190', after: '.' },
  orientacao: {
    before: 'Precisa de orientação? Ligue ',
    number: '180',
    after: ': gratuito, sigiloso, 24 horas.',
  },
}

// 3.18
export const footer = {
  banner: {
    title: 'Proteção que cabe no seu celular.',
    text: 'Discreta, segura e sempre com você.',
  },
  selos: ['100% no navegador', 'Dados protegidos (LGPD)', 'Modo Disfarce'],
  columns: [
    {
      title: 'Recursos',
      links: [
        { label: 'Modo Disfarce', href: '#disfarce' },
        { label: 'SOS silencioso', href: '#sos' },
        { label: 'Cofre de provas', href: '#cofre' },
        { label: 'Rede de apoio', href: '#rede' },
        { label: 'Leitura de risco', href: '#risco' },
      ],
    },
    {
      title: 'Informação',
      links: [
        { label: 'Seus direitos', href: '#direitos' },
        { label: 'Mitos e verdades', href: '#mitos' },
        { label: 'Segurança', href: '#seguranca' },
        { label: 'Perguntas frequentes', href: '#faq' },
      ],
    },
    {
      title: 'Ajuda agora',
      links: [
        { label: 'Ligue 190', href: 'tel:190' },
        { label: 'Ligue 180', href: 'tel:180' },
      ],
    },
  ],
  voltarTopo: 'Voltar ao topo',
  lema: 'Você não está sozinha.',
  legal:
    'Amparo é um projeto acadêmico (TCC — Ciência da Computação, UNIRP, 2026) em desenvolvimento. Não substitui os serviços oficiais de segurança e atendimento à mulher.',
  copyright: '© 2026 Amparo',
  /** Fonte da faixa de números, movida para o rodapé (ajuste do cliente, 10/11/2026). */
  dados: 'Dados: 19º Anuário Brasileiro de Segurança Pública, FBSP, 2025',
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
  /** alerta-enviado.png */
  alerta: {
    sair: 'Sair rápido',
    title: 'Alerta enviado',
    text: 'Sua localização foi compartilhada com sua rede de guardiãs. Aguardando confirmação.',
    reenvio: 'Sua localização é reenviada a cada 30 s enquanto o aviso estiver ativo.',
    cancelar: 'Cancelar aviso',
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
  /** nova-ocorrencia.png */
  tipos: ['Física', 'Psicológica', 'Sexual', 'Patrimonial'],
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
  /** Ícone da calculadora na tela de apps (Modo Disfarce, passo 1). */
  calculadora: 'Calculadora',
}

/** Fragmentos de UI usados nos cartões flutuantes (DESIGN.md §6.6 e §9). */
export const ui = {
  alertaEnviado: { title: 'Alerta enviado', text: 'Sua rede foi avisada' },
  provaVerificada: { title: 'Prova verificada', text: 'Arquivo sem alterações desde 14/03, 21:47' },
  confirmou: { name: 'Ana Beatriz', initials: 'AB', status: 'Confirmou · 12:31' },
  verDeNovo: 'Ver de novo',
  testarDeNovo: 'Testar de novo',
  voltarCalculadora: 'Voltar à calculadora',
  lerNoApp: 'Ler no Amparo',
}
