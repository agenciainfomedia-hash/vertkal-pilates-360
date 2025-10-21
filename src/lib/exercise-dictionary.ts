// Dicionário de exercícios padronizado para o Vertkal Pilates 360°
export interface ExerciseDictionary {
  id: string
  nome: string
  descricao_curta: string
  instrucoes: string[]
  repeticoes_tempo: string
  musculos_principais: string[]
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado'
  cues: string[]
  imagem: string
  video_url?: string
  variacoes: string[]
  tags: string[]
}

export const exerciseDictionary: ExerciseDictionary[] = [
  {
    id: 'hundred',
    nome: 'Hundred (Cem)',
    descricao_curta: 'Exercício clássico de aquecimento que fortalece o core e melhora a circulação.',
    instrucoes: [
      'Deite de costas, joelhos dobrados em 90°',
      'Levante a cabeça e ombros do chão',
      'Estenda os braços ao lado do corpo',
      'Faça movimentos rápidos de braços para cima e para baixo',
      'Respire: 5 inspirações, 5 expirações = 10 ciclos'
    ],
    repeticoes_tempo: '10 ciclos respiratórios',
    musculos_principais: ['core', 'abdômen', 'ombros'],
    nivel: 'Iniciante',
    cues: ['Mantenha o core contraído', 'Respiração controlada', 'Ombros longe das orelhas'],
    imagem: 'hundred.jpg',
    variacoes: ['hundred-modificado', 'hundred-avancado'],
    tags: ['aquecimento', 'core', 'respiração']
  },
  {
    id: 'roll-up',
    nome: 'Roll Up (Rolamento)',
    descricao_curta: 'Movimento fluido que fortalece o abdômen e melhora a flexibilidade da coluna.',
    instrucoes: [
      'Deite de costas, pernas estendidas',
      'Braços estendidos acima da cabeça',
      'Role vértebra por vértebra até sentar',
      'Alcance os pés mantendo a coluna curvada',
      'Retorne lentamente à posição inicial'
    ],
    repeticoes_tempo: '2x8-10',
    musculos_principais: ['abdômen', 'flexores do quadril', 'coluna'],
    nivel: 'Intermediário',
    cues: ['Movimento controlado', 'Uma vértebra por vez', 'Expire ao subir'],
    imagem: 'roll-up.jpg',
    variacoes: ['roll-up-modificado', 'roll-up-com-banda'],
    tags: ['força', 'mobilidade', 'core']
  },
  {
    id: 'single-leg-circles',
    nome: 'Single Leg Circles (Círculos com Uma Perna)',
    descricao_curta: 'Exercício que melhora a estabilidade do quadril e fortalece as pernas.',
    instrucoes: [
      'Deite de costas, uma perna estendida no chão',
      'Levante a outra perna em direção ao teto',
      'Faça círculos pequenos e controlados',
      'Mantenha o quadril estável',
      'Inverta a direção e repita com a outra perna'
    ],
    repeticoes_tempo: '5 círculos cada direção',
    musculos_principais: ['quadril', 'core', 'pernas'],
    nivel: 'Iniciante',
    cues: ['Quadril estável', 'Círculos pequenos', 'Core ativo'],
    imagem: 'single-leg-circles.jpg',
    variacoes: ['leg-circles-modificado', 'leg-circles-avancado'],
    tags: ['mobilidade', 'estabilidade', 'quadril']
  },
  {
    id: 'rolling-like-ball',
    nome: 'Rolling Like a Ball (Rolando como Bola)',
    descricao_curta: 'Exercício divertido que massageia a coluna e fortalece o equilíbrio.',
    instrucoes: [
      'Sente com joelhos dobrados, abraçando as pernas',
      'Equilibre-se no cóccix',
      'Role para trás até os ombros',
      'Use o impulso para retornar à posição sentada',
      'Mantenha a forma de bola durante todo o movimento'
    ],
    repeticoes_tempo: '2x8-10',
    musculos_principais: ['core', 'equilíbrio', 'coluna'],
    nivel: 'Iniciante',
    cues: ['Mantenha a forma de bola', 'Não role no pescoço', 'Use o core para controlar'],
    imagem: 'rolling-like-ball.jpg',
    variacoes: ['rolling-modificado', 'rolling-com-pausa'],
    tags: ['equilíbrio', 'mobilidade', 'core']
  },
  {
    id: 'teaser',
    nome: 'Teaser (Provocação)',
    descricao_curta: 'Exercício avançado que desafia força, equilíbrio e coordenação.',
    instrucoes: [
      'Deite de costas, pernas estendidas em 45°',
      'Braços estendidos acima da cabeça',
      'Role até sentar formando um V com o corpo',
      'Mantenha pernas e braços estendidos',
      'Retorne controladamente à posição inicial'
    ],
    repeticoes_tempo: '2x5-8',
    musculos_principais: ['core', 'flexores do quadril', 'equilíbrio'],
    nivel: 'Avançado',
    cues: ['Forme um V perfeito', 'Controle total', 'Respiração fluida'],
    imagem: 'teaser.jpg',
    variacoes: ['teaser-modificado', 'teaser-prep', 'teaser-twist'],
    tags: ['força', 'equilíbrio', 'avançado']
  },
  {
    id: 'swan',
    nome: 'Swan (Cisne)',
    descricao_curta: 'Exercício de extensão que fortalece as costas e melhora a postura.',
    instrucoes: [
      'Deite de bruços, mãos sob os ombros',
      'Pressione as mãos no chão',
      'Levante o peito mantendo quadris no chão',
      'Estenda a coluna vértebra por vértebra',
      'Retorne lentamente à posição inicial'
    ],
    repeticoes_tempo: '2x8-10',
    musculos_principais: ['extensores da coluna', 'glúteos', 'ombros'],
    nivel: 'Intermediário',
    cues: ['Quadris no chão', 'Extensão gradual', 'Ombros longe das orelhas'],
    imagem: 'swan.jpg',
    variacoes: ['swan-prep', 'swan-dive', 'swan-modificado'],
    tags: ['extensão', 'postura', 'costas']
  },
  {
    id: 'plank',
    nome: 'Plank (Prancha)',
    descricao_curta: 'Exercício isométrico fundamental para fortalecer todo o core.',
    instrucoes: [
      'Posição de flexão, apoiado nos antebraços',
      'Corpo em linha reta da cabeça aos pés',
      'Mantenha o core contraído',
      'Respire normalmente',
      'Mantenha a posição pelo tempo determinado'
    ],
    repeticoes_tempo: '30-60s',
    musculos_principais: ['core', 'ombros', 'glúteos'],
    nivel: 'Iniciante',
    cues: ['Linha reta', 'Core ativo', 'Respiração natural'],
    imagem: 'plank.jpg',
    variacoes: ['plank-joelhos', 'side-plank', 'plank-up-down'],
    tags: ['isometria', 'core', 'estabilidade']
  },
  {
    id: 'wall-sit',
    nome: 'Wall Sit (Agachamento na Parede)',
    descricao_curta: 'Exercício isométrico que fortalece pernas e glúteos usando a parede como apoio.',
    instrucoes: [
      'Encoste as costas na parede',
      'Deslize para baixo até formar 90° com os joelhos',
      'Pés afastados na largura dos ombros',
      'Mantenha as costas retas contra a parede',
      'Segure a posição pelo tempo determinado'
    ],
    repeticoes_tempo: '30-45s',
    musculos_principais: ['quadríceps', 'glúteos', 'core'],
    nivel: 'Iniciante',
    cues: ['90° nos joelhos', 'Peso nos calcanhares', 'Core contraído'],
    imagem: 'wall-sit.jpg',
    variacoes: ['wall-sit-single-leg', 'wall-sit-calf-raise'],
    tags: ['isometria', 'pernas', 'força']
  },
  {
    id: 'bridge',
    nome: 'Bridge (Ponte)',
    descricao_curta: 'Exercício que fortalece glúteos, posteriores de coxa e core.',
    instrucoes: [
      'Deite de costas, joelhos dobrados',
      'Pés apoiados no chão, braços ao lado do corpo',
      'Levante o quadril formando uma linha reta',
      'Contraia os glúteos no topo',
      'Desça controladamente'
    ],
    repeticoes_tempo: '2x12-15',
    musculos_principais: ['glúteos', 'posteriores', 'core'],
    nivel: 'Iniciante',
    cues: ['Glúteos contraídos', 'Linha reta', 'Controle na descida'],
    imagem: 'bridge.jpg',
    variacoes: ['single-leg-bridge', 'bridge-march', 'bridge-hold'],
    tags: ['glúteos', 'força', 'estabilidade']
  },
  {
    id: 'dead-bug',
    nome: 'Dead Bug (Inseto Morto)',
    descricao_curta: 'Exercício de estabilização que fortalece o core e melhora a coordenação.',
    instrucoes: [
      'Deite de costas, braços estendidos para cima',
      'Joelhos dobrados em 90°',
      'Estenda braço e perna opostos simultaneamente',
      'Mantenha as costas no chão',
      'Retorne à posição inicial e alterne'
    ],
    repeticoes_tempo: '2x10 cada lado',
    musculos_principais: ['core', 'estabilizadores', 'coordenação'],
    nivel: 'Intermediário',
    cues: ['Costas no chão', 'Movimento controlado', 'Core sempre ativo'],
    imagem: 'dead-bug.jpg',
    variacoes: ['dead-bug-modificado', 'dead-bug-com-banda'],
    tags: ['estabilidade', 'coordenação', 'core']
  }
]

// Função para buscar exercício por ID
export const getExerciseById = (id: string): ExerciseDictionary | undefined => {
  return exerciseDictionary.find(exercise => exercise.id === id)
}

// Função para buscar exercícios por tag
export const getExercisesByTag = (tag: string): ExerciseDictionary[] => {
  return exerciseDictionary.filter(exercise => exercise.tags.includes(tag))
}

// Função para buscar exercícios por nível
export const getExercisesByLevel = (level: 'Iniciante' | 'Intermediário' | 'Avançado'): ExerciseDictionary[] => {
  return exerciseDictionary.filter(exercise => exercise.nivel === level)
}