'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Timer, Crown, Lock } from 'lucide-react'

import { checkAchievements } from '@/lib/achievements'
import { exerciseDictionary } from '@/lib/exercises'
import { motivationalMessages, phaseNames } from '@/lib/constants'

import AuthScreen from '@/components/auth/AuthScreen'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import ProgressOverview from '@/components/dashboard/ProgressOverview'
import PhaseProgressSection from '@/components/dashboard/PhaseProgressSection'
import ExerciseCard from '@/components/exercises/ExerciseCard'
import DictionaryCard from '@/components/exercises/DictionaryCard'
import ExerciseDetailView from '@/components/exercises/ExerciseDetailView'
import AchievementsView from '@/components/achievements/AchievementsView'
import VIPView from '@/components/vip/VIPView'
import ProfileView from '@/components/profile/ProfileView'
import CelebrationOverlay from '@/components/common/CelebrationOverlay'
import BottomNavigation from '@/components/navigation/BottomNavigation'
import { Card, CardContent } from './../components/ui/card';
import { Button } from './../components/ui/button';

interface User {
  id: string
  name: string
  email: string
  plan: 'essencial' | 'vip'
  progress: number[]
  achievements: string[] // Array of achievement IDs
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

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export default function VertkalPilates360() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [currentView, setCurrentView] = useState<'dashboard' | 'exercise' | 'profile' | 'achievements' | 'vip'>('dashboard')
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)
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

  const completeExercise = (exercise: Exercise) => {
    if (!currentUser) {
      console.error("Cannot complete exercise: currentUser is null.");
      return;
    }

    // Defensive checks, though types suggest these should always be arrays
    const currentProgress = currentUser.progress || [];
    const currentAchievements = currentUser.achievements || [];

    const dayNumber = exercise.day;
    const updatedProgress = Array.from(new Set([...currentProgress, dayNumber])).sort((a, b) => a - b);

    const currentStreak = calculateStreak(updatedProgress);
    const isVIP = currentUser.plan === 'vip';

    const newAchievementIds = checkAchievements({
      completedDays: updatedProgress,
      currentStreak: currentStreak,
      isVIP: isVIP,
      completedChallenges: []
    });

    const newlyUnlockedAchievements = newAchievementIds.filter(
      (id: string) => !currentAchievements.includes(id)
    );

    const updatedUser = {
      ...currentUser,
      progress: updatedProgress,
      achievements: newAchievementIds,
      points: currentUser.points + 10,
      completedDays: updatedProgress.length,
      streak: currentStreak
    }

    setCurrentUser(updatedUser)

    if (newlyUnlockedAchievements.length > 0) {
      const latestAchievementId = newlyUnlockedAchievements[newlyUnlockedAchievements.length - 1];
      const achievement = (require('@/lib/achievements').achievements).find((a: Achievement) => a.id === latestAchievementId);
      setNewAchievement(achievement);
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setNewAchievement(null);
      }, 3000);
    }
  }

  const calculateStreak = (progress: number[]): number => {
    if (progress.length === 0) return 0

    const sortedProgress = [...progress].sort((a, b) => b - a) // Sorts descending
    let streak = 1

    for (let i = 1; i < sortedProgress.length; i++) {
      if (sortedProgress[i-1] - sortedProgress[i] === 1) { // Checks if previous day is exactly 1 greater than current
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

  const canAccessExercise = (exercise: Exercise) => {
    if (!currentUser) return false;

    // VIP users can access all exercises, including VIP modules
    if (currentUser.plan === 'vip') {
      return true;
    }

    // Essential plan user logic
    if (exercise.isVip) {
      return false; // Essential users cannot access VIP modules
    }

    // For essential (non-VIP) exercises, implement sequential unlock
    const lastCompletedDay = currentUser.completedDays; // This is the count of completed days
    const nextDayToUnlock = lastCompletedDay + 1;

    // A day is accessible if it's already completed OR it's the next day to unlock
    return currentUser.progress.includes(exercise.day) || exercise.day === nextDayToUnlock;
  };

  const getPhaseProgress = (phase: 'perda' | 'definicao' | 'consolidacao') => {
    if (!currentUser) return 0
    const phaseExercises = exercises.filter(ex => ex.phase === phase && !ex.isVip)
    if (phaseExercises.length === 0) {
      return 0
    }
    const completedInPhase = currentUser.progress.filter((day: number) => {
      const exercise = exercises.find(ex => ex.day === day)
      return exercise?.phase === phase && !exercise?.isVip
    }).length
    return Math.round((completedInPhase / phaseExercises.length) * 100)
  }

  if (!isAuthenticated) {
    return (
      <AuthScreen
        authMode={authMode}
        setAuthMode={setAuthMode}
        formData={formData}
        setFormData={setFormData}
        handleAuth={handleAuth}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <DashboardHeader currentUser={currentUser} setCurrentView={setCurrentView} />

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
              className="bg-gradient-to-r from-[#ECA20C]/10 to-orange-500/10 border border-white/10 rounded-xl p-6 text-center"
            >
              <p className="text-lg font-medium text-white break-words">{dailyMessage}</p>
            </motion.div>

            <ProgressOverview currentUser={currentUser} getProgressPercentage={getProgressPercentage} />

            <PhaseProgressSection
              currentUser={currentUser}
              exercises={exercises}
              getPhaseProgress={getPhaseProgress}
            />

            {/* Timeline Tabs */}
            <Tabs defaultValue="todos" className="w-full">
              <TabsList className="flex w-full overflow-x-auto whitespace-nowrap bg-black/30 border border-white/10 p-1 rounded-lg [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <TabsTrigger value="todos" className="flex-shrink-0 px-4 py-2 data-[state=active]:bg-[#ECA20C] data-[state=active]:text-white rounded-md">Todos</TabsTrigger>
                <TabsTrigger value="perda" className="flex-shrink-0 px-4 py-2 data-[state=active]:bg-[#ECA20C] data-[state=active]:text-white rounded-md">Perda</TabsTrigger>
                <TabsTrigger value="definicao" className="flex-shrink-0 px-4 py-2 data-[state=active]:bg-[#ECA20C] data-[state=active]:text-white rounded-md">Definição</TabsTrigger>
                <TabsTrigger value="consolidacao" className="flex-shrink-0 px-4 py-2 data-[state=active]:bg-[#ECA20C] data-[state=active]:text-white rounded-md">Consolidação</TabsTrigger>
                <TabsTrigger value="dicionario" className="flex-shrink-0 px-4 py-2 data-[state=active]:bg-[#ECA20C] data-[state=active]:text-white rounded-md">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Dicionario
                </TabsTrigger>
              </TabsList>

              <TabsContent value="todos" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {exercises.filter(ex => !ex.isVip).map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      currentUser={currentUser}
                      canAccessExercise={canAccessExercise}
                      setSelectedExercise={setSelectedExercise}
                      setCurrentView={setCurrentView}
                    />
                  ))}
                </div>
              </TabsContent>

              {Object.entries(phaseNames).map(([phase]) => (
                <TabsContent key={phase} value={phase} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {exercises.filter(ex => ex.phase === phase && !ex.isVip).map((exercise) => (
                      <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        currentUser={currentUser}
                        canAccessExercise={canAccessExercise}
                        setSelectedExercise={setSelectedExercise}
                        setCurrentView={setCurrentView}
                      />
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

            {/* VIP Modules Section */}
            {currentUser?.plan !== 'vip' && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6 mt-24"
              >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 justify-center">
                  <Crown className="h-6 w-6 text-vipPurple" />
                  Módulos VIP Exclusivos
                </h2>
                <p className="text-white mb-16 text-center">Acelere seus resultados com treinos avançados e conteúdo premium.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {exercises.filter(ex => ex.isVip).map((exercise) => (
                    <motion.div
                      key={exercise.id}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className="bg-gray-900/50 backdrop-blur-sm border border-vipPurple/50 rounded-xl relative overflow-hidden h-full shadow-lg shadow-vipPurple/30"> {/* Adicionado shadow-lg shadow-vipPurple/30 */}
                        <div className="absolute top-4 right-4">
                          <Lock className="h-6 w-6 text-vipPurple" />
                        </div>
                        <CardContent className="p-6 flex flex-col h-full">
                          <h3 className="font-semibold text-white text-lg mb-2 break-words">{exercise.title}</h3>
                          <p className="text-white mb-4 break-words flex-grow">{exercise.description}</p>
                          <div className="flex items-center gap-2 text-sm text-white mb-4">
                            <Timer className="h-4 w-4" />
                            <span>{exercise.duration}</span>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => setCurrentView('vip')}
                            className="mt-auto w-full bg-gradient-to-r from-vipPurple-dark to-vipPurple-light text-white hover:from-vipPurple-dark/90 hover:to-vipPurple-light/90"
                          >
                            <Crown className="h-3 w-3 mr-1" />
                            Desbloquear VIP
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {currentView === 'exercise' && selectedExercise && (
          <ExerciseDetailView
            exercise={selectedExercise}
            onComplete={() => completeExercise(selectedExercise)}
            onBack={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'achievements' && (
          <AchievementsView currentUser={currentUser} onBack={() => setCurrentView('dashboard')} />
        )}

        {currentView === 'vip' && (
          <VIPView exercises={exercises} onBack={() => setCurrentView('dashboard')} />
        )}

        {currentView === 'profile' && (
          <ProfileView
            currentUser={currentUser}
            onBack={() => setCurrentView('dashboard')}
            setCurrentView={setCurrentView}
            setCurrentUser={setCurrentUser}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}
      </main>

      <CelebrationOverlay showCelebration={showCelebration} newAchievement={newAchievement} />

      <BottomNavigation currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  )
}