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

// 3.0
export const nav = {
  links: [
    { label: 'Como funciona', href: '#disfarce' },
    { label: 'Recursos', href: '#recursos' },
    { label: 'Segurança', href: '#seguranca' },
    { label: 'Seus direitos', href: '#direitos' },
    { label: 'O projeto', href: '#projeto' },
  ],
}

// 3.1
export const hero = {
  chip: 'Proteção discreta para mulheres',
  h1: 'Você não está sozinha.',
  /** Quebra controlada no mobile (DESIGN.md §4). */
  h1Lines: ['Você não está', 'sozinha.'],
  sub: 'Um app que parece uma calculadora, avisa quem você confia com um toque e guarda suas provas num cofre que só você abre.',
  ctaSecondary: 'Ver como funciona',
  checks: ['Gratuito', 'Funciona no navegador do celular', 'Seus dados protegidos pela LGPD'],
  caption: 'Por fora, uma calculadora. Por dentro, o Amparo.',
}

// 3.2
export type Stat = {
  value: number
  decimals?: number
  /** Texto exibido depois do número (ex.: "%", " em 10"). */
  suffix?: string
  label: string
}

export const contexto = {
  h2: 'Na maioria dos casos, o perigo está dentro de casa.',
  text: 'A violência doméstica cresce em silêncio. Muitas mulheres convivem com quem as agride, dividem o mesmo teto e, muitas vezes, o mesmo celular. Pedir ajuda pode ser arriscado.',
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
  fecho: 'O Amparo foi desenhado a partir de cada uma dessas barreiras.',
  fechoLink: { label: 'Conheça os recursos', href: '#recursos' },
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
    { strong: 'Seu código, seu acesso.', rest: ' 4 números que só você sabe, seguidos de "=".' },
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
    strong: '"Ver como chegamos nisso."',
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
  steps: [
    { strong: 'Crie sua conta.', rest: ' Use um e-mail ao qual só você tenha acesso.' },
    { strong: 'Escolha o Modo Disfarce', rest: ' e crie o seu código de 4 números.' },
    { strong: 'Adicione sua rede de apoio.', rest: ' Pelo menos uma pessoa de confiança.' },
    { strong: 'Pronto.', rest: ' O Amparo fica com você, discreto, até você precisar.' },
  ] satisfies Lead[],
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
export const projeto = {
  h2: 'Tecnologia a serviço de quem precisa de amparo.',
  text: 'O Amparo é um Trabalho de Conclusão de Curso em Ciência da Computação na UNIRP. Nasceu de uma pergunta: como uma plataforma discreta, apoiada por inteligência artificial, pode reduzir as barreiras entre uma mulher e a ajuda de que ela precisa?',
  diferenteTitle: 'Por que é diferente',
  diferente: [
    'Uma revisão de 136 apps de proteção (Sumra et al., 2023) mostrou que nenhum usava inteligência artificial e que a maioria dependia só do acionamento manual. O Amparo une ',
    { strong: 'disfarce' },
    ', ',
    { strong: 'provas com integridade verificável' },
    ' e ',
    { strong: 'IA na avaliação de risco' },
    '.',
  ] satisfies Rich,
  metrics: [
    { value: 97, suffix: '%', label: 'de acurácia' },
    { value: 99, suffix: '%', label: 'de recall na classe de alto risco' },
  ] satisfies Stat[],
  model: {
    strong: 'Random Forest',
    rest: ', comparado com Regressão Logística e SVM',
  } satisfies Lead,
  ressalva:
    'Resultados obtidos em base sintética de 10.000 registros. A validação com dados reais, sob protocolo ético, é a próxima etapa.',
  stack: [
    'React Native',
    'TypeScript',
    'NestJS',
    'Supabase (PostgreSQL)',
    'Python',
    'FastAPI',
    'Scikit-learn',
  ],
  equipe: [
    'Eduardo Fauzi Barboza',
    'Lucas de Andrade Lameira',
    'Mário Otávio Viudes Alves',
    'Rafael Henrique Roncoleta',
  ],
  orientacao: { label: 'Orientação', name: 'Me. Valéria Maria Volpe' },
}

// 3.15
export const faq = {
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
  lema: 'Você não está sozinha.',
  legal:
    'Amparo é um projeto acadêmico (TCC — Ciência da Computação, UNIRP, 2026) em desenvolvimento. Não substitui os serviços oficiais de segurança e atendimento à mulher.',
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
  faqTitle: 'Perguntas frequentes',
  lerNoApp: 'Ler no Amparo',
}
