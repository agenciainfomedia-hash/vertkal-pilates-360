'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Trophy, 
  Star, 
  Lock, 
  Play, 
  CheckCircle, 
  Calendar, 
  Target, 
  Zap,
  Crown,
  Flame,
  Award,
  TrendingUp,
  Heart,
  Timer,
  User,
  LogOut,
  Share2,
  Gift,
  Sparkles,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react'
import { achievements, checkAchievements, getNextAchievement } from '@/lib/achievements'
import { exerciseDictionary } from '@/lib/exercises'

interface User {
  id: string
  name: string
  email: string
  plan: 'essencial' | 'vip'
  progress: number[]
  achievements: string[]
  points: number
  streak: number
  completedDays: number
}

interface Exercise {
  id: string
  day: number
  title: string
  duration: string
  description: string
  instructions: string[]
  isVip: boolean
  phase: 'perda' | 'definicao' | 'consolidacao'
}

interface DictionaryExercise {
  id: string
  name: string
  image: string
  description: string
  reps: string
  muscles: string[]
}

const motivationalMessages = [
  "Hoje você escreve mais uma linha da sua evolução",
  "Seu corpo vai agradecer por isso",
  "Cada movimento te aproxima do seu objetivo",
  "Você está mais forte do que ontem",
  "Hoje é o dia de se superar",
  "Sua determinação é sua maior força",
  "Cada treino é um investimento em você"
]

const vipBenefits = [
  { icon: Zap, text: "Resultados 30% mais rápidos", highlight: true },
  { icon: Crown, text: "Séries exclusivas para definição", highlight: false },
  { icon: Target, text: "Treinos personalizados", highlight: false },
  { icon: Award, text: "Badges e conquistas especiais", highlight: true },
  { icon: Sparkles, text: "Acesso antecipado a novos conteúdos", highlight: false }
]

const phaseColors = {
  perda: "from-orange-500/20 to-red-500/20 border-orange-500/30",
  definicao: "from-blue-500/20 to-purple-500/20 border-blue-500/30", 
  consolidacao: "from-green-500/20 to-emerald-500/20 border-green-500/30"
}

const phaseNames = {
  perda: "Perda de Peso",
  definicao: "Definição Muscular", 
  consolidacao: "Consolidação"
}

export default function VertkalPilates360() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [currentView, setCurrentView] = useState<'dashboard' | 'exercise' | 'profile' | 'achievements' | 'vip'>('dashboard')
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [newAchievement, setNewAchievement] = useState<any>(null)
  const [dailyMessage, setDailyMessage] = useState("")
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })

  // Mock exercises data - 21 days program + VIP modules
  const exercises: Exercise[] = [
    // Days 1-7: Perda de Peso (8 exercises/day)
    ...Array.from({ length: 7 }, (_, i) => ({
      id: `day-${i + 1}`,
      day: i + 1,
      title: `Dia ${i + 1} - Queima Intensa`,
      duration: "25-30 min",
      description: "8 movimentos focados em queima de gordura",
      instructions: ["Aquecimento 3 min", "8 exercícios x 2 séries", "Descanso 30s entre séries", "Alongamento 5 min"],
      isVip: false,
      phase: 'perda' as const
    })),
    
    // Days 8-14: Definição (10 exercises/day)
    ...Array.from({ length: 7 }, (_, i) => ({
      id: `day-${i + 8}`,
      day: i + 8,
      title: `Dia ${i + 8} - Definição Total`,
      duration: "35-40 min",
      description: "10 movimentos para definição muscular",
      instructions: ["Aquecimento 5 min", "10 exercícios x 3 séries", "Descanso 45s entre séries", "Alongamento 7 min"],
      isVip: false, // Changed to false for essential plan
      phase: 'definicao' as const
    })),
    
    // Days 15-21: Consolidação (12 exercises/day)
    ...Array.from({ length: 7 }, (_, i) => ({
      id: `day-${i + 15}`,
      day: i + 15,
      title: `Dia ${i + 15} - Consolidação Avançada`,
      duration: "45-50 min", 
      description: "12 exercícios para consolidação completa",
      instructions: ["Aquecimento 5 min", "12 exercícios x 3 séries", "Descanso 60s entre séries", "Alongamento 10 min"],
      isVip: false, // Changed to false for essential plan
      phase: 'consolidacao' as const
    })),

    // VIP Modules
    {
      id: 'vip-abdomen-powerhouse',
      day: 22,
      title: 'Ativação de Abdômen — Power House',
      duration: '40 min',
      description: 'Treino avançado para fortalecimento completo do core abdominal.',
      instructions: ['Aquecimento dinâmico 5 min', '6 exercícios específicos x 4 séries', 'Descanso 45s entre séries', 'Alongamento profundo 8 min'],
      isVip: true,
      phase: 'consolidacao' as const
    },
    {
      id: 'vip-bumbum-redondo',
      day: 23,
      title: 'Pilates para Bumbum Redondo',
      duration: '35 min',
      description: 'Sequências focadas em glúteos para definição e elevação.',
      instructions: ['Aquecimento 4 min', '8 exercícios direcionados x 3 séries', 'Descanso 40s entre séries', 'Alongamento 6 min'],
      isVip: true,
      phase: 'consolidacao' as const
    },
    {
      id: 'vip-respiracao-queima-gordura',
      day: 24,
      title: 'Respiração Queima-Gordura',
      duration: '20 min',
      description: 'Técnicas simples para aumentar o gasto calórico sem esforço.',
      instructions: ['Respiração consciente 5 min', 'Sequências ritmadas 10 min', 'Prática integrada 5 min'],
      isVip: true,
      phase: 'consolidacao' as const
    },
    {
      id: 'vip-termogenese-natural',
      day: 25,
      title: 'Guia Completo da Termogênese Natural',
      duration: '30 min',
      description: 'Como fazer o corpo queimar gordura sozinho.',
      instructions: ['Introdução teórica 10 min', 'Exercícios práticos 15 min', 'Integração diária 5 min'],
      isVip: true,
      phase: 'consolidacao' as const
    }
  ]

  useEffect(() => {
    setDailyMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)])
  }, [])

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name || 'Usuário',
      email: formData.email,
      plan: 'essencial',
      progress: [],
      achievements: [],
      points: 0,
      streak: 0,
      completedDays: 0
    }
    
    setCurrentUser(newUser)
    setIsAuthenticated(true)
    setCurrentView('dashboard')
  }

  const completeExercise = (exerciseId: string) => {
    if (!currentUser) return

    const updatedProgress = [...currentUser.progress, parseInt(exerciseId.split('-')[1])]
    const newAchievements = checkAchievements(updatedProgress, currentUser.achievements)
    
    const updatedUser = {
      ...currentUser,
      progress: updatedProgress,
      achievements: newAchievements,
      points: currentUser.points + 10,
      completedDays: updatedProgress.length,
      streak: calculateStreak(updatedProgress)
    }
    
    setCurrentUser(updatedUser)
    
    // Check for new achievements
    const latestAchievement = newAchievements.find(a => !currentUser.achievements.includes(a))
    if (latestAchievement) {
      const achievement = achievements.find(a => a.id === latestAchievement)
      setNewAchievement(achievement)
    }
    
    setShowCelebration(true)
    setTimeout(() => {
      setShowCelebration(false)
      setNewAchievement(null)
    }, 3000)
  }

  const calculateStreak = (progress: number[]): number => {
    if (progress.length === 0) return 0
    
    const sortedProgress = [...progress].sort((a, b) => b - a)
    let streak = 1
    
    for (let i = 1; i < sortedProgress.length; i++) {
      if (sortedProgress[i-1] - sortedProgress[i] === 1) {
        streak++
      } else {
        break
      }
    }
    
    return streak
  }

  const getProgressPercentage = () => {
    if (!currentUser) return 0
    return Math.round((currentUser.progress.length / 21) * 100)
  }

  const getNextExercise = () => {
    if (!currentUser) return exercises[0]
    const nextDay = currentUser.progress.length + 1
    return exercises.find(ex => ex.day === nextDay) || exercises[0]
  }

  const canAccessExercise = (exercise: Exercise) => {
    if (!currentUser) return false
    if (currentUser.plan === 'essencial') return exercise.day <= currentUser.progress.length + 1
    if (exercise.isVip && currentUser.plan !== 'vip') return false
    return exercise.day <= currentUser.progress.length + 1
  }

  const getPhaseProgress = (phase: 'perda' | 'definicao' | 'consolidacao') => {
    if (!currentUser) return 0
    const phaseExercises = exercises.filter(ex => ex.phase === phase && !ex.isVip)
    const completedInPhase = currentUser.progress.filter(day => {
      const exercise = exercises.find(ex => ex.day === day)
      return exercise?.phase === phase && !exercise?.isVip
    }).length
    return Math.round((completedInPhase / phaseExercises.length) * 100)
  }

  // Component Functions
  const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
    const isCompleted = currentUser?.progress.includes(exercise.day)
    const canAccess = canAccessExercise(exercise)
    const isNext = exercise.day === (currentUser?.progress.length || 0) + 1

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className={`bg-[#1A1A1A] border-gray-800 transition-all duration-300 ${
          isCompleted ? 'border-green-500/50 bg-green-500/5' : 
          !canAccess ? 'border-gray-600 opacity-60' : 
          isNext ? 'border-[#ECA20C] shadow-lg shadow-[#ECA20C]/20' : ''
        }`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-white text-sm leading-tight mb-1">{exercise.title}</h3>
                <p className="text-xs text-gray-400 mb-2">{exercise.duration}</p>
                <p className="text-xs text-gray-300 leading-tight">{exercise.description}</p>
              </div>
              {isCompleted && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 ml-2" />}
              {!canAccess && <Lock className="h-5 w-5 text-gray-500 flex-shrink-0 ml-2" />}
            </div>

            <div className="flex items-center justify-between">
              <Badge variant="secondary" className={`text-xs ${
                exercise.phase === 'perda' ? 'bg-orange-500/20 text-orange-400' :
                exercise.phase === 'definicao' ? 'bg-blue-500/20 text-blue-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {phaseNames[exercise.phase]}
              </Badge>

              {canAccess ? (
                <Button 
                  size="sm" 
                  onClick={() => {
                    setSelectedExercise(exercise)
                    setCurrentView('exercise')
                  }}
                  className={`text-xs px-3 py-1 ${
                    isNext ? 'bg-[#ECA20C] text-black hover:bg-[#ECA20C]/90' : 
                    'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {isCompleted ? 'Refazer' : isNext ? 'Começar' : 'Ver'}
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  onClick={() => setCurrentView('vip')}
                  className="text-xs px-3 py-1 bg-gradient-to-r from-[#ECA20C] to-orange-500 text-black hover:from-[#ECA20C]/90 hover:to-orange-500/90"
                >
                  <Crown className="h-3 w-3 mr-1" />
                  VIP
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const DictionaryCard = ({ exercise }: { exercise: DictionaryExercise }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="bg-[#1A1A1A] border-gray-800 transition-all duration-300 hover:border-[#ECA20C]/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white text-sm leading-tight mb-1">{exercise.name}</h3>
                <p className="text-xs text-gray-300 leading-tight mb-2">{exercise.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Timer className="h-3 w-3" />
                  <span>{exercise.reps}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {exercise.muscles.map((muscle, index) => (
                <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                  {muscle}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const ExerciseView = ({ exercise, onComplete, onBack }: { exercise: Exercise, onComplete: () => void, onBack: () => void }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white">
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold text-white">{exercise.title}</h1>
        </div>

        <Card className="bg-[#1A1A1A] border-gray-800">
          <CardContent className="p-6">
            <div className="aspect-video bg-gray-800 rounded-lg mb-6 flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-[#ECA20C] mx-auto mb-4" />
                <p className="text-gray-400">Vídeo do exercício</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Instruções</h3>
                <div className="space-y-2">
                  {exercise.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[#ECA20C] text-black rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-300">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={onComplete}
                  className="flex-1 bg-gradient-to-r from-[#ECA20C] to-orange-500 hover:from-[#ECA20C]/90 hover:to-orange-500/90 text-black font-bold py-3"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Completar Treino
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const AchievementsView = ({ onBack }: { onBack: () => void }) => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white">
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold text-white">Conquistas</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => {
            const isUnlocked = currentUser?.achievements.includes(achievement.id)
            return (
              <motion.div
                key={achievement.id}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className={`bg-[#1A1A1A] border-gray-800 transition-all duration-300 ${
                  isUnlocked ? 'border-yellow-500/50 bg-yellow-500/5' : 'opacity-60'
                }`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      isUnlocked ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-gray-500'
                    }`}>
                      <achievement.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{achievement.description}</p>
                    {isUnlocked && (
                      <Badge className="bg-yellow-500 text-black">
                        <Trophy className="h-3 w-3 mr-1" />
                        Desbloqueada
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    )
  }

  const VIPView = ({ onBack }: { onBack: () => void }) => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white">
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold text-white">VIP 360°</h1>
        </div>

        <Card className="bg-gradient-to-br from-[#ECA20C]/10 to-orange-500/10 border-[#ECA20C]/30">
          <CardContent className="p-8 text-center">
            <Crown className="h-16 w-16 text-[#ECA20C] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Desbloqueie seu Potencial Máximo</h2>
            <p className="text-lg text-gray-300 mb-8">Acesse módulos exclusivos e acelere seus resultados com o plano VIP 360°</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {vipBenefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-black/20 rounded-lg"
                >
                  <benefit.icon className="h-8 w-8 text-[#ECA20C] flex-shrink-0" />
                  <p className="text-white font-medium">{benefit.text}</p>
                </motion.div>
              ))}
            </div>

            <Button className="bg-gradient-to-r from-[#ECA20C] to-orange-500 hover:from-[#ECA20C]/90 hover:to-orange-500/90 text-black font-bold px-12 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Crown className="h-5 w-5 mr-2" />
              Upgrade Agora - R$ 97/mês
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercises.filter(ex => ex.isVip).map((exercise) => (
            <motion.div
              key={exercise.id}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-[#1A1A1A] border-[#ECA20C]/30 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Lock className="h-6 w-6 text-[#ECA20C]" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white text-lg mb-2">{exercise.title}</h3>
                  <p className="text-gray-300 mb-4">{exercise.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Timer className="h-4 w-4" />
                    <span>{exercise.duration}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  const ProfileView = ({ onBack }: { onBack: () => void }) => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white">
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold text-white">Perfil</h1>
        </div>

        <Card className="bg-[#1A1A1A] border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-[#ECA20C] rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{currentUser?.name}</h2>
                <p className="text-gray-400">{currentUser?.email}</p>
                <Badge className={`mt-2 ${currentUser?.plan === 'vip' ? 'bg-[#ECA20C] text-black' : 'bg-gray-700 text-white'}`}>
                  {currentUser?.plan === 'vip' ? 'VIP 360°' : 'Plano Essencial'}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-[#ECA20C]">{currentUser?.points || 0}</div>
                <div className="text-sm text-gray-400">Pontos</div>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-orange-500">{currentUser?.streak || 0}</div>
                <div className="text-sm text-gray-400">Sequência</div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => setCurrentView('achievements')}
                variant="outline" 
                className="w-full justify-start border-gray-700 text-white hover:bg-gray-800"
              >
                <Trophy className="h-5 w-5 mr-3" />
                Ver Conquistas
              </Button>

              {currentUser?.plan !== 'vip' && (
                <Button 
                  onClick={() => setCurrentView('vip')}
                  className="w-full bg-gradient-to-r from-[#ECA20C] to-orange-500 hover:from-[#ECA20C]/90 hover:to-orange-500/90 text-black font-bold"
                >
                  <Crown className="h-5 w-5 mr-3" />
                  Upgrade para VIP
                </Button>
              )}

              <Button 
                onClick={() => {
                  setCurrentUser(null)
                  setIsAuthenticated(false)
                  setCurrentView('dashboard')
                }}
                variant="outline" 
                className="w-full justify-start border-red-700 text-red-400 hover:bg-red-900/20"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="h-20 w-auto mx-auto mb-6 flex items-center justify-center">
              <div className="text-4xl font-bold text-[#ECA20C]">VERTIKAL</div>
            </div>
            <motion.p 
              className="text-gray-300 mt-4 text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Transforme seu corpo em 21 dias
            </motion.p>
          </div>

          <Card className="bg-[#1A1A1A] border-gray-800 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center text-xl">
                {authMode === 'login' ? 'Bem-vindo de volta!' : 'Comece sua jornada!'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'register' && (
                  <Input
                    placeholder="Seu nome incrível"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-black border-gray-700 focus:border-[#ECA20C] transition-colors"
                  />
                )}
                <Input
                  type="email"
                  placeholder="Seu melhor email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-black border-gray-700 focus:border-[#ECA20C] transition-colors"
                  required
                />
                <Input
                  type="password"
                  placeholder="Senha segura"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="bg-black border-gray-700 focus:border-[#ECA20C] transition-colors"
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#ECA20C] to-orange-500 hover:from-[#ECA20C]/90 hover:to-orange-500/90 text-black font-bold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {authMode === 'login' ? 'Entrar e continuar' : 'Começar transformação!'}
                </Button>
              </form>
              
              <div className="text-center mt-6">
                <button
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-[#ECA20C] hover:text-orange-400 transition-colors font-medium"
                >
                  {authMode === 'login' ? 'Não tem conta? Crie agora!' : 'Já tem conta? Entre aqui!'}
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-[#1A1A1A] border-b border-gray-800 p-4 sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-[#ECA20C]">VERTIKAL</div>
          <div className="flex items-center gap-4">
            <motion.div 
              className="text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-gray-400">Olá, {currentUser?.name}!</p>
              <p className="text-xs text-[#ECA20C] font-medium">{currentUser?.plan === 'vip' ? 'VIP 360°' : 'Plano Essencial'}</p>
            </motion.div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentView('profile')}
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 pb-20">
        {currentView === 'dashboard' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Daily Message */}
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-r from-[#ECA20C]/10 to-orange-500/10 border border-[#ECA20C]/20 rounded-xl p-6 text-center"
            >
              <p className="text-lg font-medium text-white">{dailyMessage}</p>
            </motion.div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div 
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-[#1A1A1A] border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Target className="h-8 w-8 text-[#ECA20C]" />
                      <span className="text-2xl font-bold text-white">{getProgressPercentage()}%</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">Progresso Geral</p>
                    <Progress value={getProgressPercentage()} className="h-2" />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-[#1A1A1A] border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Flame className="h-8 w-8 text-orange-500" />
                      <span className="text-2xl font-bold text-white">{currentUser?.streak || 0}</span>
                    </div>
                    <p className="text-sm text-gray-400">Sequência Atual</p>
                    <p className="text-xs text-gray-500 mt-1">dias consecutivos</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-[#1A1A1A] border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Award className="h-8 w-8 text-yellow-500" />
                      <span className="text-2xl font-bold text-white">{currentUser?.achievements.length || 0}</span>
                    </div>
                    <p className="text-sm text-gray-400">Conquistas</p>
                    <p className="text-xs text-gray-500 mt-1">desbloqueadas</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Phase Progress */}
            <motion.div 
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-[#1A1A1A] border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#ECA20C]" />
                    Progresso por Fase
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(phaseNames).map(([phase, name]) => (
                      <div key={phase} className="flex items-center gap-4">
                        <div className="w-24 text-sm text-gray-400">{name}</div>
                        <div className="flex-1">
                          <Progress value={getPhaseProgress(phase as any)} className="h-2" />
                        </div>
                        <div className="w-12 text-right text-sm text-white">{getPhaseProgress(phase as any)}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Timeline Tabs */}
            <motion.div 
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Tabs defaultValue="todos" className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-[#1A1A1A] border border-gray-800">
                  <TabsTrigger value="todos" className="data-[state=active]:bg-[#ECA20C] data-[state=active]:text-black">Todos</TabsTrigger>
                  <TabsTrigger value="perda" className="data-[state=active]:bg-[#ECA20C] data-[state=active]:text-black">Perda</TabsTrigger>
                  <TabsTrigger value="definicao" className="data-[state=active]:bg-[#ECA20C] data-[state=active]:text-black">Definição</TabsTrigger>
                  <TabsTrigger value="consolidacao" className="data-[state=active]:bg-[#ECA20C] data-[state=active]:text-black">Consolidação</TabsTrigger>
                  <TabsTrigger value="dicionario" className="data-[state=active]:bg-[#ECA20C] data-[state=active]:text-black">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Dicionario
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="todos" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {exercises.map((exercise) => (
                      <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                  </div>
                </TabsContent>

                {Object.entries(phaseNames).map(([phase, name]) => (
                  <TabsContent key={phase} value={phase} className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {exercises.filter(ex => ex.phase === phase).map((exercise) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                      ))}
                    </div>
                  </TabsContent>
                ))}

                <TabsContent value="dicionario" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {exerciseDictionary.map((exercise) => (
                      <DictionaryCard key={exercise.id} exercise={exercise} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* VIP Banner */}
            {currentUser?.plan !== 'vip' && (
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-[#ECA20C]/20 to-orange-500/20 border border-[#ECA20C]/30 rounded-xl p-6 text-center"
              >
                <Crown className="h-12 w-12 text-[#ECA20C] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Desbloqueie seu Potencial Máximo!</h3>
                <p className="text-gray-300 mb-4">Acesse módulos exclusivos e acelere seus resultados</p>
                <Button 
                  onClick={() => setCurrentView('vip')}
                  className="bg-gradient-to-r from-[#ECA20C] to-orange-500 hover:from-[#ECA20C]/90 hover:to-orange-500/90 text-black font-bold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Upgrade para VIP 360°
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}

        {currentView === 'exercise' && selectedExercise && (
          <ExerciseView exercise={selectedExercise} onComplete={() => completeExercise(selectedExercise.id)} onBack={() => setCurrentView('dashboard')} />
        )}

        {currentView === 'achievements' && (
          <AchievementsView onBack={() => setCurrentView('dashboard')} />
        )}

        {currentView === 'vip' && (
          <VIPView onBack={() => setCurrentView('dashboard')} />
        )}

        {currentView === 'profile' && (
          <ProfileView onBack={() => setCurrentView('dashboard')} />
        )}
      </main>

      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="bg-gradient-to-br from-[#ECA20C] to-orange-500 text-black p-8 rounded-2xl text-center max-w-md mx-4"
            >
              <Sparkles className="h-16 w-16 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Parabéns!</h2>
              <p className="text-lg mb-4">Você completou mais um treino!</p>
              {newAchievement && (
                <div className="bg-black/20 rounded-lg p-4 mb-4">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                  <p className="font-semibold">{newAchievement.title}</p>
                  <p className="text-sm opacity-90">{newAchievement.description}</p>
                </div>
              )}
              <p className="text-sm opacity-80">Continue assim!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-gray-800 p-4"
      >
        <div className="max-w-6xl mx-auto flex justify-around">
          <Button 
            variant={currentView === 'dashboard' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('dashboard')}
            className={currentView === 'dashboard' ? 'bg-[#ECA20C] text-black' : 'text-gray-400 hover:text-white'}
          >
            <Calendar className="h-5 w-5" />
          </Button>
          <Button 
            variant={currentView === 'achievements' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('achievements')}
            className={currentView === 'achievements' ? 'bg-[#ECA20C] text-black' : 'text-gray-400 hover:text-white'}
          >
            <Trophy className="h-5 w-5" />
          </Button>
          <Button 
            variant={currentView === 'vip' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('vip')}
            className={currentView === 'vip' ? 'bg-[#ECA20C] text-black' : 'text-gray-400 hover:text-white'}
          >
            <Crown className="h-5 w-5" />
          </Button>
        </div>
      </motion.nav>
    </div>
  )
}