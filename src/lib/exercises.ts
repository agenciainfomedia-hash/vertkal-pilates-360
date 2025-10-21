export interface DictionaryExercise {
  id: string
  name: string
  image: string
  description: string
  reps: string
  muscles: string[]
}

export const exerciseDictionary: DictionaryExercise[] = [
  {
    id: '1',
    name: 'Abdominal Crunch',
    image: '/placeholder-exercise.jpg',
    description: 'Exercício clássico para fortalecimento do core abdominal superior.',
    reps: '3 séries de 15-20 repetições',
    muscles: ['Reto abdominal', 'Oblíquos']
  },
  {
    id: '2',
    name: 'Prancha Frontal',
    image: '/placeholder-exercise.jpg',
    description: 'Posição isométrica que trabalha todo o core e estabilizadores.',
    reps: '3 séries de 30-60 segundos',
    muscles: ['Reto abdominal', 'Transverso abdominal', 'Oblíquos', 'Lombar']
  },
  {
    id: '3',
    name: 'Agachamento',
    image: '/placeholder-exercise.jpg',
    description: 'Movimento fundamental para pernas e glúteos.',
    reps: '3 séries de 12-15 repetições',
    muscles: ['Quadríceps', 'Glúteos', 'Isquiotibiais', 'Panturrilhas']
  },
  {
    id: '4',
    name: 'Flexão de Braços',
    image: '/placeholder-exercise.jpg',
    description: 'Exercício composto para peito, ombros e tríceps.',
    reps: '3 séries de 8-12 repetições',
    muscles: ['Peitoral maior', 'Deltoides anterior', 'Tríceps']
  },
  {
    id: '5',
    name: 'Remada Curvada',
    image: '/placeholder-exercise.jpg',
    description: 'Exercício para dorsais e parte posterior do corpo.',
    reps: '3 séries de 10-12 repetições',
    muscles: ['Grande dorsal', 'Romboides', 'Trapézio', 'Bíceps']
  },
  {
    id: '6',
    name: 'Elevação Lateral',
    image: '/placeholder-exercise.jpg',
    description: 'Isolamento para deltoides laterais.',
    reps: '3 séries de 12-15 repetições',
    muscles: ['Deltoides lateral']
  },
  {
    id: '7',
    name: 'Rosca Direta',
    image: '/placeholder-exercise.jpg',
    description: 'Exercício de isolamento para bíceps.',
    reps: '3 séries de 10-12 repetições',
    muscles: ['Bíceps braquial']
  },
  {
    id: '8',
    name: 'Tríceps Testa',
    image: '/placeholder-exercise.jpg',
    description: 'Exercício de isolamento para tríceps.',
    reps: '3 séries de 10-12 repetições',
    muscles: ['Tríceps braquial']
  },
  {
    id: '9',
    name: 'Panturrilha em Pé',
    image: '/placeholder-exercise.jpg',
    description: 'Exercício para desenvolvimento das panturrilhas.',
    reps: '4 séries de 15-20 repetições',
    muscles: ['Gastrocnêmio', 'Soleo']
  },
  {
    id: '10',
    name: 'Ponte de Glúteos',
    image: '/placeholder-exercise.jpg',
    description: 'Exercício específico para glúteos e ponteira.',
    reps: '3 séries de 15-20 repetições',
    muscles: ['Glúteo máximo', 'Isquiotibiais']
  },
  {
    id: '11',
    name: 'Rotação Russa',
    image: '/placeholder-exercise.jpg',
    description: 'Exercício para oblíquos e rotação do core.',
    reps: '3 séries de 20 repetições (10 cada lado)',
    muscles: ['Oblíquos interno e externo']
  },
  {
    id: '12',
    name: 'Afundo',
    image: '/placeholder-exercise.jpg',
    description: 'Exercício unilateral para pernas e equilíbrio.',
    reps: '3 séries de 10 repetições por perna',
    muscles: ['Quadríceps', 'Glúteos', 'Isquiotibiais']
  }
]