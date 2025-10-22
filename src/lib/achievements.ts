import { 
  Target, 
  Star, 
  Flame, 
  Trophy, 
  Rocket, 
  Dumbbell, 
  Crown, 
  Zap, 
  Award, 
  Medal, 
  Gem 
} from 'lucide-react'

// Sistema de conquistas e gamificação
export interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  category: 'progresso' | 'consistencia' | 'especial' | 'vip'
  condition: {
    type: 'days_completed' | 'streak' | 'phase_completed' | 'vip_unlock' | 'challenge_completed'
    value: number | string
  }
  reward: {
    points: number
    badge: string
    unlocks?: string[]
  }
  isVIP: boolean
}

export const achievements: Achievement[] = [
  {
    id: 'first_step',
    title: 'Primeiro Passo',
    description: 'Complete seu primeiro treino no Vertkal Pilates 360°',
    icon: Target,
    category: 'progresso',
    condition: { type: 'days_completed', value: 1 },
    reward: { points: 10, badge: 'Iniciante' },
    isVIP: false
  },
  {
    id: 'consistency_3',
    title: 'Ritmo Constante',
    description: 'Mantenha uma sequência de 3 dias consecutivos',
    icon: Star,
    category: 'consistencia',
    condition: { type: 'streak', value: 3 },
    reward: { points: 25, badge: 'Consistente' },
    isVIP: false
  },
  {
    id: 'first_week',
    title: 'Uma Semana Forte',
    description: 'Complete a primeira semana do programa (7 dias)',
    icon: Flame,
    category: 'progresso',
    condition: { type: 'days_completed', value: 7 }, // Changed to days_completed
    reward: { points: 50, badge: 'Guerreiro da Primeira Semana' },
    isVIP: false
  },
  {
    id: 'streak_7',
    title: 'Semana Perfeita',
    description: 'Mantenha 7 dias consecutivos de treino',
    icon: Trophy,
    category: 'consistencia',
    condition: { type: 'streak', value: 7 },
    reward: { points: 75, badge: 'Disciplinado' },
    isVIP: false
  },
  {
    id: 'halfway_hero',
    title: 'Herói do Meio Caminho',
    description: 'Complete 10 dias do programa',
    icon: Rocket,
    category: 'progresso',
    condition: { type: 'days_completed', value: 10 },
    reward: { points: 100, badge: 'Meio Caminho' },
    isVIP: false
  },
  {
    id: 'second_phase',
    title: 'Definição Muscular',
    description: 'Complete a segunda fase do programa',
    icon: Dumbbell,
    category: 'progresso',
    condition: { type: 'days_completed', value: 14 }, // Changed to days_completed
    reward: { points: 150, badge: 'Definido' },
    isVIP: false
  },
  {
    id: 'vip_unlock',
    title: 'VIP Desbloqueado',
    description: 'Faça upgrade para o plano VIP',
    icon: Crown,
    category: 'vip',
    condition: { type: 'vip_unlock', value: 'true' },
    reward: { points: 200, badge: 'VIP Member', unlocks: ['vip_content', 'exclusive_challenges'] },
    isVIP: true
  },
  {
    id: 'vip_first_workout',
    title: 'Elite em Ação',
    description: 'Complete seu primeiro treino VIP',
    icon: Zap,
    category: 'vip',
    condition: { type: 'days_completed', value: 'vip_first' }, // This condition needs special handling or a specific day number
    reward: { points: 100, badge: 'Elite' },
    isVIP: true
  },
  {
    id: 'streak_14',
    title: 'Duas Semanas Imparáveis',
    description: 'Mantenha 14 dias consecutivos de treino',
    icon: Star,
    category: 'consistencia',
    condition: { type: 'streak', value: 14 },
    reward: { points: 200, badge: 'Imparável' },
    isVIP: false
  },
  {
    id: 'final_phase',
    title: 'Consolidação Completa',
    description: 'Complete a terceira e última fase',
    icon: Medal,
    category: 'progresso',
    condition: { type: 'days_completed', value: 21 }, // Changed to days_completed
    reward: { points: 300, badge: 'Consolidado' },
    isVIP: false
  },
  {
    id: 'transformation_360',
    title: 'Transformação 360°',
    description: 'Complete todos os 21 dias do programa',
    icon: Star,
    category: 'especial',
    condition: { type: 'days_completed', value: 21 },
    reward: { points: 500, badge: 'Transformado 360°', unlocks: ['maintenance_cycle', 'monthly_challenges'] },
    isVIP: false
  },
  {
    id: 'perfect_month',
    title: 'Mês Perfeito',
    description: 'Complete 30 dias consecutivos (incluindo manutenção)',
    icon: Gem,
    category: 'especial',
    condition: { type: 'streak', value: 30 },
    reward: { points: 750, badge: 'Diamante' },
    isVIP: false
  },
  {
    id: 'vip_master',
    title: 'Mestre VIP',
    description: 'Complete todos os treinos VIP disponíveis',
    icon: Award,
    category: 'vip',
    condition: { type: 'days_completed', value: 'all_vip' }, // This condition needs special handling
    reward: { points: 400, badge: 'Mestre VIP' },
    isVIP: true
  },
  {
    id: 'challenge_champion',
    title: 'Campeão de Desafios',
    description: 'Complete 3 desafios mensais consecutivos',
    icon: Trophy,
    category: 'especial',
    condition: { type: 'challenge_completed', value: 3 },
    reward: { points: 600, badge: 'Campeão' },
    isVIP: false
  }
]

// Desafios mensais (not directly used in Index.tsx for now, but kept for completeness)
export interface MonthlyChallenge {
  id: string
  month: string
  title: string
  description: string
  goal: {
    type: 'consecutive_days' | 'total_workouts' | 'specific_exercise' | 'time_challenge'
    target: number
    period: 'week' | 'month'
  }
  reward: {
    points: number
    badge: string
    special?: string
  }
  isActive: boolean
  difficulty: 'Fácil' | 'Médio' | 'Difícil'
  exercises?: string[]
}

export const monthlyChallenges: MonthlyChallenge[] = [
  {
    id: 'january_2024',
    month: 'Janeiro 2024',
    title: 'Novo Ano, Novo Eu',
    description: 'Comece o ano com força! Complete 20 treinos em janeiro.',
    goal: { type: 'total_workouts', target: 20, period: 'month' },
    reward: { points: 300, badge: 'Novo Ano Forte' },
    isActive: true,
    difficulty: 'Médio'
  },
  {
    id: 'february_2024',
    month: 'Fevereiro 2024',
    title: 'Amor Próprio',
    description: 'Demonstre amor próprio com 14 dias consecutivos de treino.',
    goal: { type: 'consecutive_days', target: 14, period: 'month' },
    reward: { points: 250, badge: 'Amor Próprio', special: 'Desconto VIP 20%' },
    isActive: false,
    difficulty: 'Difícil'
  },
  {
    id: 'march_2024',
    month: 'Março 2024',
    title: 'Força do Core',
    description: 'Foque no core! Complete 100 repetições de Teaser no mês.',
    goal: { type: 'specific_exercise', target: 100, period: 'month' },
    reward: { points: 200, badge: 'Core de Aço' },
    isActive: false,
    difficulty: 'Médio',
    exercises: ['teaser']
  }
]

// Função para verificar conquistas desbloqueadas
export const checkAchievements = (userStats: {
  completedDays: number[]
  currentStreak: number
  isVIP: boolean
  // completedPhases: string[] // Not directly used as a passed prop, derived internally
  completedChallenges?: string[] // Optional, as it's not fully implemented yet
}): string[] => { // Changed return type to string[]
  if (!userStats || typeof userStats !== 'object') {
    return []
  }

  const safeUserStats = {
    completedDays: Array.isArray(userStats.completedDays) ? userStats.completedDays : [],
    currentStreak: typeof userStats.currentStreak === 'number' ? userStats.currentStreak : 0,
    isVIP: Boolean(userStats.isVIP),
    completedChallenges: Array.isArray(userStats.completedChallenges) ? userStats.completedChallenges : []
  }

  const unlockedAchievementIds: string[] = []

  achievements.forEach(achievement => {
    if (!achievement || !achievement.condition) {
      return
    }

    let conditionMet = false
    try {
      switch (achievement.condition.type) {
        case 'days_completed':
          // Special handling for 'vip_first' and 'all_vip' if needed, otherwise treat as number
          if (typeof achievement.condition.value === 'string') {
            if (achievement.condition.value === 'vip_first') {
              // This would require knowing if a VIP exercise was completed.
              // For now, let's assume it's met if user is VIP and has completed at least one day.
              conditionMet = safeUserStats.isVIP && safeUserStats.completedDays.length > 0;
            } else if (achievement.condition.value === 'all_vip') {
              // This would require knowing all VIP exercises and if they are completed.
              // For simplicity, let's assume it's met if user is VIP and has completed a high number of days (e.g., 25)
              conditionMet = safeUserStats.isVIP && safeUserStats.completedDays.length >= 25; // Placeholder
            }
          } else {
            conditionMet = safeUserStats.completedDays.length >= (achievement.condition.value as number)
          }
          break
        case 'streak':
          conditionMet = safeUserStats.currentStreak >= (achievement.condition.value as number)
          break
        case 'phase_completed':
          // This condition type is now handled by 'days_completed' in the achievement definitions above.
          // If it were still used, it would need to derive phase completion from completedDays.
          conditionMet = false; // Should not be reached with updated achievement definitions
          break
        case 'vip_unlock':
          conditionMet = safeUserStats.isVIP
          break
        case 'challenge_completed':
          conditionMet = safeUserStats.completedChallenges.length >= (achievement.condition.value as number)
          break
        default:
          conditionMet = false
      }
    } catch (error) {
      console.error('Erro ao verificar conquista:', achievement.id, error)
      conditionMet = false
    }
    
    // Only add if condition is met and it's not a VIP achievement for non-VIP users
    if (conditionMet && (!achievement.isVIP || safeUserStats.isVIP)) {
        unlockedAchievementIds.push(achievement.id)
    }
  })

  // Filter out duplicates and return
  return Array.from(new Set(unlockedAchievementIds));
}