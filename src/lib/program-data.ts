// Dados do cronograma de 21 dias do Vertkal Pilates 360°

export interface DayProgram {
  day: number
  phase: 'Perda de Peso Sustentável' | 'Definição Muscular' | 'Consolidação e Integração'
  title: string
  description: string
  duration: string
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado'
  exercises: string[] // IDs dos exercícios do dicionário
  isVIP: boolean
  sets: string
  reps: string
  focus: string[]
}

export const program21Days: DayProgram[] = [
  // FASE 1: Perda de Peso Sustentável (Dias 1-7)
  {
    day: 1,
    phase: 'Perda de Peso Sustentável',
    title: 'Fundamentos do Pilates',
    description: 'Introdução aos movimentos básicos e respiração consciente',
    duration: '15min',
    difficulty: 'Iniciante',
    exercises: ['hundred', 'bridge', 'plank', 'wall-sit'],
    isVIP: false,
    sets: '2 séries',
    reps: '10-12 repetições ou 30s',
    focus: ['respiração', 'postura', 'core']
  },
  {
    day: 2,
    phase: 'Perda de Peso Sustentável',
    title: 'Ativação do Core',
    description: 'Fortalecimento da musculatura central e estabilização',
    duration: '15min',
    difficulty: 'Iniciante',
    exercises: ['dead-bug', 'bridge', 'plank', 'hundred'],
    isVIP: false,
    sets: '2 séries',
    reps: '10-12 repetições ou 30s',
    focus: ['core', 'estabilidade', 'controle']
  },
  {
    day: 3,
    phase: 'Perda de Peso Sustentável',
    title: 'Mobilidade e Força',
    description: 'Combinação de movimentos para flexibilidade e fortalecimento',
    duration: '18min',
    difficulty: 'Iniciante',
    exercises: ['single-leg-circles', 'roll-up', 'bridge', 'plank'],
    isVIP: false,
    sets: '2 séries',
    reps: '10-12 repetições ou 30s',
    focus: ['mobilidade', 'força', 'coordenação']
  },
  {
    day: 4,
    phase: 'Perda de Peso Sustentável',
    title: 'Equilíbrio Dinâmico',
    description: 'Desenvolvimento do equilíbrio e propriocepção',
    duration: '18min',
    difficulty: 'Iniciante',
    exercises: ['rolling-like-ball', 'single-leg-circles', 'dead-bug', 'wall-sit'],
    isVIP: false,
    sets: '2 séries',
    reps: '10-12 repetições ou 30s',
    focus: ['equilíbrio', 'propriocepção', 'core']
  },
  {
    day: 5,
    phase: 'Perda de Peso Sustentável',
    title: 'Integração Postural',
    description: 'Melhoria da postura através de exercícios específicos',
    duration: '20min',
    difficulty: 'Iniciante',
    exercises: ['swan', 'hundred', 'bridge', 'plank'],
    isVIP: false,
    sets: '2 séries',
    reps: '10-12 repetições ou 30s',
    focus: ['postura', 'extensão', 'alinhamento']
  },
  {
    day: 6,
    phase: 'Perda de Peso Sustentável',
    title: 'Fluidez e Controle',
    description: 'Movimentos fluidos com foco no controle motor',
    duration: '20min',
    difficulty: 'Iniciante',
    exercises: ['roll-up', 'rolling-like-ball', 'dead-bug', 'swan'],
    isVIP: false,
    sets: '2 séries',
    reps: '10-12 repetições ou 30s',
    focus: ['fluidez', 'controle', 'coordenação']
  },
  {
    day: 7,
    phase: 'Perda de Peso Sustentável',
    title: 'Consolidação da Base',
    description: 'Revisão e aperfeiçoamento dos fundamentos',
    duration: '22min',
    difficulty: 'Iniciante',
    exercises: ['hundred', 'roll-up', 'single-leg-circles', 'bridge', 'plank'],
    isVIP: false,
    sets: '2 séries',
    reps: '10-12 repetições ou 30s',
    focus: ['consolidação', 'técnica', 'resistência']
  },

  // FASE 2: Definição Muscular (Dias 8-14)
  {
    day: 8,
    phase: 'Definição Muscular',
    title: 'Power Core Iniciante',
    description: 'Intensificação do trabalho de core com novos desafios',
    duration: '25min',
    difficulty: 'Intermediário',
    exercises: ['hundred', 'roll-up', 'single-leg-circles', 'rolling-like-ball', 'teaser'],
    isVIP: false,
    sets: '3 séries',
    reps: '12-15 repetições ou 40s',
    focus: ['força', 'resistência', 'definição']
  },
  {
    day: 9,
    phase: 'Definição Muscular',
    title: 'Estabilidade Avançada',
    description: 'Desafios de estabilidade com maior complexidade',
    duration: '25min',
    difficulty: 'Intermediário',
    exercises: ['dead-bug', 'swan', 'plank', 'bridge', 'single-leg-circles'],
    isVIP: false,
    sets: '3 séries',
    reps: '12-15 repetições ou 40s',
    focus: ['estabilidade', 'força', 'controle']
  },
  {
    day: 10,
    phase: 'Definição Muscular',
    title: 'Coordenação Complexa',
    description: 'Movimentos que desafiam a coordenação motora',
    duration: '28min',
    difficulty: 'Intermediário',
    exercises: ['teaser', 'rolling-like-ball', 'dead-bug', 'swan', 'hundred'],
    isVIP: false,
    sets: '3 séries',
    reps: '12-15 repetições ou 40s',
    focus: ['coordenação', 'precisão', 'fluidez']
  },
  {
    day: 11,
    phase: 'Definição Muscular',
    title: 'VIP: Flow Dinâmico',
    description: 'Sequência fluida de movimentos avançados para membros VIP',
    duration: '30min',
    difficulty: 'Intermediário',
    exercises: ['teaser', 'roll-up', 'swan', 'single-leg-circles', 'plank', 'hundred'],
    isVIP: true,
    sets: '3 séries',
    reps: '12-15 repetições ou 40s',
    focus: ['fluidez', 'resistência', 'técnica avançada']
  },
  {
    day: 12,
    phase: 'Definição Muscular',
    title: 'Força Funcional',
    description: 'Exercícios que simulam movimentos do dia a dia',
    duration: '28min',
    difficulty: 'Intermediário',
    exercises: ['wall-sit', 'bridge', 'plank', 'dead-bug', 'swan'],
    isVIP: false,
    sets: '3 séries',
    reps: '12-15 repetições ou 40s',
    focus: ['funcionalidade', 'força', 'aplicação prática']
  },
  {
    day: 13,
    phase: 'Definição Muscular',
    title: 'VIP: Desafio Core Premium',
    description: 'Treino intensivo de core exclusivo para membros VIP',
    duration: '32min',
    difficulty: 'Intermediário',
    exercises: ['teaser', 'hundred', 'roll-up', 'dead-bug', 'plank', 'rolling-like-ball'],
    isVIP: true,
    sets: '3 séries',
    reps: '12-15 repetições ou 40s',
    focus: ['core intensivo', 'resistência', 'definição']
  },
  {
    day: 14,
    phase: 'Definição Muscular',
    title: 'Integração Intermediária',
    description: 'Combinação harmoniosa de todos os elementos aprendidos',
    duration: '30min',
    difficulty: 'Intermediário',
    exercises: ['hundred', 'roll-up', 'teaser', 'swan', 'bridge', 'plank'],
    isVIP: false,
    sets: '3 séries',
    reps: '12-15 repetições ou 40s',
    focus: ['integração', 'harmonia', 'progressão']
  },

  // FASE 3: Consolidação e Integração (Dias 15-21)
  {
    day: 15,
    phase: 'Consolidação e Integração',
    title: 'VIP: Sequência Master',
    description: 'Sequência avançada exclusiva para transformação completa',
    duration: '35min',
    difficulty: 'Avançado',
    exercises: ['teaser', 'hundred', 'roll-up', 'swan', 'single-leg-circles', 'dead-bug', 'plank'],
    isVIP: true,
    sets: '3 séries',
    reps: '15-20 repetições ou 45s',
    focus: ['maestria', 'precisão', 'excelência']
  },
  {
    day: 16,
    phase: 'Consolidação e Integração',
    title: 'Resistência Total',
    description: 'Desenvolvimento da resistência muscular e cardiovascular',
    duration: '35min',
    difficulty: 'Avançado',
    exercises: ['hundred', 'wall-sit', 'plank', 'bridge', 'rolling-like-ball', 'dead-bug'],
    isVIP: false,
    sets: '3 séries',
    reps: '15-20 repetições ou 45s',
    focus: ['resistência', 'condicionamento', 'endurance']
  },
  {
    day: 17,
    phase: 'Consolidação e Integração',
    title: 'Flexibilidade Dinâmica',
    description: 'Combinação de força e flexibilidade em movimentos fluidos',
    duration: '38min',
    difficulty: 'Avançado',
    exercises: ['roll-up', 'swan', 'single-leg-circles', 'teaser', 'rolling-like-ball', 'bridge'],
    isVIP: false,
    sets: '3 séries',
    reps: '15-20 repetições ou 45s',
    focus: ['flexibilidade', 'mobilidade', 'amplitude']
  },
  {
    day: 18,
    phase: 'Consolidação e Integração',
    title: 'VIP: Master Class Elite',
    description: 'Aula magistral com os exercícios mais desafiadores',
    duration: '40min',
    difficulty: 'Avançado',
    exercises: ['teaser', 'hundred', 'roll-up', 'swan', 'single-leg-circles', 'dead-bug', 'plank', 'bridge'],
    isVIP: true,
    sets: '3 séries',
    reps: '15-20 repetições ou 45s',
    focus: ['elite', 'desafio máximo', 'transformação']
  },
  {
    day: 19,
    phase: 'Consolidação e Integração',
    title: 'Síntese Corporal',
    description: 'Integração completa de todos os sistemas corporais',
    duration: '38min',
    difficulty: 'Avançado',
    exercises: ['hundred', 'teaser', 'swan', 'plank', 'dead-bug', 'wall-sit'],
    isVIP: false,
    sets: '3 séries',
    reps: '15-20 repetições ou 45s',
    focus: ['síntese', 'integração', 'harmonia corporal']
  },
  {
    day: 20,
    phase: 'Consolidação e Integração',
    title: 'Desafio Final',
    description: 'Teste de todos os conhecimentos e habilidades adquiridas',
    duration: '40min',
    difficulty: 'Avançado',
    exercises: ['teaser', 'hundred', 'roll-up', 'swan', 'single-leg-circles', 'rolling-like-ball', 'plank'],
    isVIP: false,
    sets: '3 séries',
    reps: '15-20 repetições ou 45s',
    focus: ['desafio', 'superação', 'conquista']
  },
  {
    day: 21,
    phase: 'Consolidação e Integração',
    title: 'Transformação 360°',
    description: 'Celebração da jornada completa e nova versão de si mesmo',
    duration: '42min',
    difficulty: 'Avançado',
    exercises: ['hundred', 'roll-up', 'single-leg-circles', 'rolling-like-ball', 'teaser', 'swan', 'dead-bug', 'bridge', 'plank'],
    isVIP: false,
    sets: '3 séries',
    reps: '15-20 repetições ou 45s',
    focus: ['transformação', 'celebração', 'novo eu']
  }
]

// Função para obter programa por dia
export const getDayProgram = (day: number): DayProgram | undefined => {
  return program21Days.find(program => program.day === day)
}

// Função para obter programas por fase
export const getProgramsByPhase = (phase: string): DayProgram[] => {
  return program21Days.filter(program => program.phase === phase)
}

// Função para obter programas VIP
export const getVIPPrograms = (): DayProgram[] => {
  return program21Days.filter(program => program.isVIP)
}

// Função para obter estatísticas do programa
export const getProgramStats = () => {
  const totalDays = program21Days.length
  const vipDays = program21Days.filter(p => p.isVIP).length
  const phases = [...new Set(program21Days.map(p => p.phase))]
  const difficulties = [...new Set(program21Days.map(p => p.difficulty))]
  
  return {
    totalDays,
    vipDays,
    essentialDays: totalDays - vipDays,
    phases,
    difficulties
  }
}