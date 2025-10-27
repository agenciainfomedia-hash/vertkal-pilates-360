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

// Adicionando a interface para o dicionário de exercícios, se ainda não estiver definida
// Assumindo que DictionaryExercise é a interface correta para os itens de exerciseDictionary
interface DictionaryExercise {
  id: string;
  name: string;
  image: string;
  description: string;
  reps: string;
  muscles: string[];
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
    {
      id: `day-1`,
      day: 1,
      title: `Dia 1 - Ativação Total`,
      duration: "25-30 min",
      description: "8 movimentos focados em queima de gordura e ativação muscular.",
      instructions: [
        "Aquecimento 3 min",
        "2 séries de 10-12 repetições ou 30s (para isometria/contínuo) para cada exercício:",
        "Marcha na parede (Wall Marches)",
        "Prancha na parede (Wall Plank)",
        "Chute para trás em pé na parede (Standing Glute Kickbacks)",
        "Agachamento isométrico na parede (Wall Sit)",
        "Flexão de braços na parede (Wall Push-Ups)",
        "Torção em pé na parede (Standing Wall Twist)",
        "Anjo na parede (Wall Angel)",
        "Alongamento final: Alongamento de peitoral na parede (Wall Pec Stretch)"
      ],
      isVip: false,
      phase: 'perda' as const
    },
    {
      id: `day-2`,
      day: 2,
      title: `Dia 2 - Queima Acelerada`,
      duration: "25-30 min",
      description: "8 movimentos focados em queima de gordura e resistência.",
      instructions: [
        "Aquecimento 3 min",
        "2 séries de 10-12 repetições ou 30s (para isometria/contínuo) para cada exercício:",
        "Corrida rápida na parede (joelhos altos) (Wall Sprints)",
        "Ponte na parede (Wall Bridge)",
        "Chute de burro na parede (Wall Donkey Kicks)",
        "Abdominal na parede (Wall Crunches)",
        "Elevação de panturrilha na parede (Wall Calf Raises)",
        "Círculos de braço na parede (Wall Arm Circles)",
        "Alongamento “borboleta” na parede (Wall Butterfly Stretch)",
        "Alongamento final: Alongamento de isquiotibiais na parede (Wall Hamstring Stretches)"
      ],
      isVip: false,
      phase: 'perda' as const
    },
    {
      id: `day-3`,
      day: 3,
      title: `Dia 3 - Força e Flexibilidade`,
      duration: "25-30 min",
      description: "8 movimentos focados em força do core e flexibilidade.",
      instructions: [
        "Aquecimento 3 min",
        "2 séries de 10-12 repetições ou 30s (para isometria/contínuo) para cada exercício:",
        "Prancha na parede (Wall Plank)",
        "Agachamento isométrico na parede com elevação de perna (Wall Sit with Leg Lifts)",
        "Flexão na parede com elevação de perna (Wall Push-Ups with Leg Lifts)",
        "Elevação lateral de perna na parede (Wall Side Leg Lifts)",
        "Marcha na parede (Wall Marches)",
        "Torção russa na parede (Wall Russian Twists)",
        "Alongamento de tríceps na parede (Wall Tricep Stretch)",
        "Alongamento final: Alongamento de coluna na parede (The Spine Stretch)"
      ],
      isVip: false,
      phase: 'perda' as const
    },
    {
      id: `day-4`,
      day: 4,
      title: `Dia 4 - Intensidade Crescente`,
      duration: "25-30 min",
      description: "8 movimentos focados em intensidade e definição.",
      instructions: [
        "Aquecimento 3 min",
        "2 séries de 10-12 repetições ou 30s (para isometria/contínuo) para cada exercício:",
        "Agachamento na parede (Wall Squats)",
        "Flexão lateral sentado na parede (Seated Side Bends)",
        "Abdominal na parede (Wall Crunches)",
        "Toques de ombro na parede (Wall Shoulder Taps)",
        "Chute para trás em pé na parede (Standing Glute Kickbacks)",
        "Flexão diamante na parede (Wall Diamond Push-Up)",
        "Alongamento “sapo” na parede (Wall Frog Stretch)",
        "Alongamento final: Alongamento lateral na parede (Wall Side Stretch)"
      ],
      isVip: false,
      phase: 'perda' as const
    },
    {
      id: `day-5`,
      day: 5,
      title: `Dia 5 - Foco no Core`,
      duration: "25-30 min",
      description: "8 movimentos focados em fortalecimento do core e equilíbrio.",
      instructions: [
        "Aquecimento 3 min",
        "2 séries de 10-12 repetições ou 30s (para isometria/contínuo) para cada exercício:",
        "Agachamento isométrico na parede (Wall Sit)",
        "Chute de burro na parede (Wall Donkey Kicks)",
        "Flexão de braços na parede (Wall Push-Ups)",
        "Círculos de perna em pé na parede (Standing Leg Circles)",
        "Torção russa na parede (Wall Russian Twists)",
        "Abdominal bicicleta na parede (Wall Bicycle Crunches)",
        "Alongamento “figura 4” na parede (Wall Figure 4 Stretch)",
        "Alongamento final: Alongamento de isquiotibiais na parede (Wall Hamstring Stretches)"
      ],
      isVip: false,
      phase: 'perda' as const
    },
    {
      id: `day-6`,
      day: 6,
      title: `Dia 6 - Resistência Total`,
      duration: "25-30 min",
      description: "8 movimentos focados em resistência e ativação muscular.",
      instructions: [
        "Aquecimento 3 min",
        "2 séries de 10-12 repetições ou 30s (para isometria/contínuo) para cada exercício:",
        "Marcha na parede (Wall Marches)",
        "Elevação de panturrilha na parede (Wall Calf Raises)",
        "Ponte na parede (Wall Bridge)",
        "Prancha lateral na parede (Wall Side Plank)",
        "Anjo na parede (Wall Angel)",
        "Círculos de braço na parede (Wall Arm Circles)",
        "Alongamento de peitoral na parede (Wall Pec Stretch)",
        "Alongamento final: Alongamento de flexores do quadril na parede (Wall Hip Flexor Stretches)"
      ],
      isVip: false,
      phase: 'perda' as const
    },
    {
      id: `day-7`,
      day: 7,
      title: `Dia 7 - Recap e Recuperação`,
      duration: "25-30 min",
      description: "8 movimentos focados em revisão e recuperação ativa.",
      instructions: [
        "Aquecimento 3 min",
        "2 séries de 10-12 repetições ou 30s (para isometria/contínuo) para cada exercício:",
        "Prancha na parede (Wall Plank)",
        "Agachamento isométrico na parede (Wall Sit)",
        "Elevação lateral de perna na parede (Wall Side Leg Lifts)",
        "Dead bug na parede (Wall Dead Bug)",
        "Flexão de braços na parede (Wall Push-Ups)",
        "Pernas para cima na parede (Legs Up the Wall)",
        "Deslize de coluna na parede (Wall Roll Downs) (alongamento ativo)",
        "Alongamento final: Alongamento “borboleta” na parede (Wall Butterfly Stretch)"
      ],
      isVip: false,
      phase: 'perda' as const
    },

    // Days 8-14: Definição (10 exercises/day)
    {
      id: `day-8`,
      day: 8,
      title: `Dia 8 - Definição Total`,
      duration: "35-40 min",
      description: "10 movimentos para intensificar treinos e acelerar resultados.",
      instructions: [
        "Aquecimento 5 min",
        "3 séries de 12-15 repetições ou 40s (para isometria/contínuo) para cada exercício:",
        "Prancha na parede (Wall Plank)",
        "Flexão na parede com elevação de perna (Wall Push-Ups with Leg Lifts)",
        "Avanço lateral na parede (Wall Side Lunges)",
        "Abdominal na parede (Wall Crunches)",
        "Elevação de panturrilha na parede (Wall Calf Raises)",
        "Chute para trás em pé na parede (Standing Glute Kickbacks)",
        "Chute de burro na parede (Wall Donkey Kicks)",
        "Alongamento de peitoral na parede (Wall Pec Stretch)",
        "Anjo na parede (Wall Angel)",
        "Alongamento final: Alongamento lateral na parede (Wall Side Stretch)"
      ],
      isVip: false,
      phase: 'definicao' as const
    },
    {
      id: `day-9`,
      day: 9,
      title: `Dia 9 - Foco em Core e Glúteos`,
      duration: "35-40 min",
      description: "10 movimentos para fortalecer o core e definir glúteos.",
      instructions: [
        "Aquecimento 5 min",
        "3 séries de 12-15 repetições ou 40s (para isometria/contínuo) para cada exercício:",
        "Agachamento isométrico na parede com elevação de perna (Wall Sit with Leg Lifts)",
        "Elevação lateral de perna na parede (Wall Side Leg Lifts)",
        "Abdominal bicicleta na parede (Wall Bicycle Crunches)",
        "Círculos de braço na parede (Wall Arm Circles)",
        "Ponte na parede (Wall Bridge)",
        "Flexão lateral sentado na parede (Seated Side Bends)",
        "Torção russa na parede (Wall Russian Twists)",
        "Alongamento \"sapo\" na parede (Wall Frog Stretch)",
        "Dead bug na parede (Wall Dead Bug)",
        "Alongamento final: Alongamento \"borboleta\" na parede (Wall Butterfly Stretch)"
      ],
      isVip: false,
      phase: 'definicao' as const
    },
    {
      id: `day-10`,
      day: 10,
      title: `Dia 10 - Resistência e Força`,
      duration: "35-40 min",
      description: "10 movimentos para aumentar a resistência e a força muscular.",
      instructions: [
        "Aquecimento 5 min",
        "3 séries de 12-15 repetições ou 40s (para isometria/contínuo) para cada exercício:",
        "Escalador na parede (Wall Mountain Climbers)",
        "Flexão diamante na parede (Wall Diamond Push-Up)",
        "Marcha na parede (Wall Marches)",
        "Torção em pé na parede (Standing Wall Twist)",
        "Agachamento isométrico na parede (Wall Sit)",
        "Balanço lateral de perna na parede (Wall Lateral Leg Swings)",
        "Flexão de tríceps na parede (Wall Triceps Push-Up)",
        "Alongamento de isquiotibiais na parede (Wall Hamstring Stretches)",
        "Equilíbrio controlado na parede (The Control Balance)",
        "Alongamento final: Alongamento de flexores do quadril na parede (Wall Hip Flexor Stretches)"
      ],
      isVip: false,
      phase: 'definicao' as const
    },
    {
      id: `day-11`,
      day: 11,
      title: `Dia 11 - Equilíbrio e Estabilidade`,
      duration: "35-40 min",
      description: "10 movimentos para melhorar o equilíbrio e a estabilidade do corpo.",
      instructions: [
        "Aquecimento 5 min",
        "3 séries de 12-15 repetições ou 40s (para isometria/contínuo) para cada exercício:",
        "Caminhada na parede (Wall Walks)",
        "Postura do guerreiro III na parede (Warrior 3 Pose)",
        "Flexão de braços na parede (Wall Push-Ups)",
        "Círculos de perna em pé na parede (Standing Leg Circles)",
        "Prancha lateral na parede (Wall Side Plank)",
        "Anjo na parede (Wall Angel)",
        "Abdominal na parede (Wall Crunches)",
        "Alongamento de tríceps na parede (Wall Tricep Stretch)",
        "Alongamento \"figura 4\" na parede (Wall Figure 4 Stretch)",
        "Alongamento final: Alongamento de coluna na parede (The Spine Stretch)"
      ],
      isVip: false,
      phase: 'definicao' as const
    },
    {
      id: `day-12`,
      day: 12,
      title: `Dia 12 - Potência e Agilidade`,
      duration: "35-40 min",
      description: "10 movimentos para desenvolver potência e agilidade.",
      instructions: [
        "Aquecimento 5 min",
        "3 séries de 12-15 repetições ou 40s (para isometria/contínuo) para cada exercício:",
        "Corrida rápida na parede (Wall Sprints)",
        "Agachamento avançado na parede (Wall Squats Level 2)",
        "Toques de ombro na parede (Wall Shoulder Taps)",
        "Chute de burro na parede (Wall Donkey Kicks)",
        "Ponte na parede (Wall Bridge)",
        "Elevação de panturrilha na parede (Wall Calf Raises)",
        "Cão olhando para baixo na parede (Downward Facing Dog)",
        "Alongamento \"borboleta\" na parede (Wall Butterfly Stretch)",
        "Alongamento de peitoral na parede (Wall Pec Stretch)",
        "Alongamento final: Alongamento lateral na parede (Wall Side Stretch)"
      ],
      isVip: false,
      phase: 'definicao' as const
    },
    {
      id: `day-13`,
      day: 13,
      title: `Dia 13 - Foco em Resistência`,
      duration: "35-40 min",
      description: "10 movimentos para aprimorar a resistência muscular.",
      instructions: [
        "Aquecimento 5 min",
        "3 séries de 12-15 repetições ou 40s (para isometria/contínuo) para cada exercício:",
        "Agachamento isométrico na parede (Wall Sit)",
        "Flexão de braços na parede (Wall Push-Ups)",
        "Abdominal na parede (Wall Crunches)",
        "Elevação lateral de perna na parede (Wall Side Leg Lifts)",
        "Prancha na parede (Wall Plank)",
        "Torção russa na parede (Wall Russian Twists)",
        "Círculos de braço na parede (Wall Arm Circles)",
        "Alongamento de isquiotibiais na parede (Wall Hamstring Stretches)",
        "Deslize de coluna na parede (Wall Roll Downs) (alongamento ativo)",
        "Alongamento final: Alongamento \"sapo\" na parede (Wall Frog Stretch)"
      ],
      isVip: false,
      phase: 'definicao' as const
    },
    {
      id: `day-14`,
      day: 14,
      title: `Dia 14 - Super Dia`,
      duration: "35-40 min",
      description: "10 movimentos intensos para um desafio completo.",
      instructions: [
        "Aquecimento 5 min",
        "3 séries de 12-15 repetições ou 40s (para isometria/contínuo) para cada exercício:",
        "Dead bug na parede (Wall Dead Bug)",
        "Escalador na parede (Wall Mountain Climbers)",
        "Ponte na parede (Wall Bridge)",
        "Abdominal bicicleta na parede (Wall Bicycle Crunches)",
        "Toques de ombro na parede (Wall Shoulder Taps)",
        "Agachamento isométrico na parede com elevação de perna (Wall Sit with Leg Lifts)",
        "Afundo alto na parede (High Lunge Pose)",
        "Anjo na parede (Wall Angel)",
        "Alongamento de punho na parede (Wall Wrist Stretches)",
        "Alongamento final: Alongamento lateral na parede (Wall Side Stretch)"
      ],
      isVip: false,
      phase: 'definicao' as const
    },

    // Days 15-21: Consolidação (12 exercises/day)
    {
      id: `day-15`,
      day: 15,
      title: `Dia 15 - Força e Controle`,
      duration: "45-50 min",
      description: "12 exercícios para potencializar ganhos de emagrecimento e definição muscular.",
      instructions: [
        "Aquecimento 5 min",
        "45 segundos por exercício (ou 3 séries de 15-20 repetições) para cada exercício:",
        "Wall Plank",
        "Wall Push-Ups",
        "Wall Sit with Leg Lifts",
        "Wall Crunches",
        "Standing Glute Kickbacks",
        "Wall Side Plank",
        "Wall Donkey Kicks",
        "Wall Side Lunges",
        "Wall Arm Circles",
        "Wall Bridge",
        "Wall Butterfly Stretch",
        "Alongamento final: Wall Pec Stretch"
      ],
      isVip: false,
      phase: 'consolidacao' as const
    },
    {
      id: `day-16`,
      day: 16,
      title: `Dia 16 - Resistência e Mobilidade`,
      duration: "45-50 min",
      description: "12 exercícios para potencializar ganhos de emagrecimento e definição muscular.",
      instructions: [
        "Aquecimento 5 min",
        "45 segundos por exercício (ou 3 séries de 15-20 repetições) para cada exercício:",
        "Wall Walks",
        "Wall Mountain Climbers",
        "Wall Diamond Push-Up",
        "Wall Sit",
        "Wall Dead Bug",
        "Wall Side Leg Lifts",
        "Standing Leg Circles",
        "Wall Marches",
        "Warrior 3 Pose",
        "Wall Frog Stretch",
        "The Spine Stretch",
        "Alongamento final: Wall Triceps Stretch"
      ],
      isVip: false,
      phase: 'consolidacao' as const
    },
    {
      id: `day-17`,
      day: 17,
      title: `Dia 17 - Core e Postura`,
      duration: "45-50 min",
      description: "12 exercícios para potencializar ganhos de emagrecimento e definição muscular.",
      instructions: [
        "Aquecimento 5 min",
        "45 segundos por exercício (ou 3 séries de 15-20 repetições) para cada exercício:",
        "Wall Push-Ups with Leg Lifts",
        "Wall Sprints",
        "Wall Crunches",
        "Wall Angel",
        "Wall Shoulder Taps",
        "Wall Side Stretch",
        "Wall Lateral Leg Swings",
        "Wall Russian Twists",
        "Wall Hip Flexor Stretches",
        "Downward Facing Dog",
        "Wall Butterfly Stretch",
        "Alongamento final: High Lunge Pose"
      ],
      isVip: false,
      phase: 'consolidacao' as const
    },
    {
      id: `day-18`,
      day: 18,
      title: `Dia 18 - Intensivo de Pernas e Glúteos`,
      duration: "45-50 min",
      description: "12 exercícios para potencializar ganhos de emagrecimento e definição muscular.",
      instructions: [
        "Aquecimento 5 min",
        "45 segundos por exercício (ou 3 séries de 15-20 repetições) para cada exercício:",
        "Wall Plank",
        "Wall Side Lunges",
        "Wall Bicycle Crunches",
        "Wall Bridge",
        "Wall Donkey Kicks",
        "Wall Push-Ups",
        "Wall Side Plank",
        "Wall Roll Downs",
        "Wall Dead Bug",
        "Wall Marches",
        "Wall Pec Stretch",
        "Alongamento final: Wall Wrist Stretches"
      ],
      isVip: false,
      phase: 'consolidacao' as const
    },
    {
      id: `day-19`,
      day: 19,
      title: `Dia 19 - Abdômen Definido`,
      duration: "45-50 min",
      description: "12 exercícios para potencializar ganhos de emagrecimento e definição muscular.",
      instructions: [
        "Aquecimento 5 min",
        "45 segundos por exercício (ou 3 séries de 15-20 repetições) para cada exercício:",
        "Wall Mountain Climbers",
        "Wall Sit",
        "Wall Side Leg Lifts",
        "Wall Diamond Push-Up",
        "Standing Wall Twist",
        "Standing Glute Kickbacks",
        "Wall Arm Circles",
        "Wall Crunches",
        "Wall Side Stretch",
        "Wall Frog Stretch",
        "Wall Figure 4 Stretch",
        "Alongamento final: The Control Balance"
      ],
      isVip: false,
      phase: 'consolidacao' as const
    },
    {
      id: `day-20`,
      day: 20,
      title: `Dia 20 - Corpo Inteiro + Queima Calórica`,
      duration: "45-50 min",
      description: "12 exercícios para potencializar ganhos de emagrecimento e definição muscular.",
      instructions: [
        "Aquecimento 5 min",
        "45 segundos por exercício (ou 3 séries de 15-20 repetições) para cada exercício:",
        "Wall Push-Ups with Leg Lifts",
        "Wall Bridge",
        "Wall Russian Twists",
        "Wall Walks",
        "Wall Sit with Leg Lifts",
        "Wall Shoulder Taps",
        "Wall Lateral Leg Swings",
        "Wall Butterfly Stretch",
        "Wall Dead Bug",
        "Wall Angel",
        "Wall Pec Stretch",
        "Alongamento final: High Lunge Pose"
      ],
      isVip: false,
      phase: 'consolidacao' as const
    },
    {
      id: `day-21`,
      day: 21,
      title: `Dia 21 - Fechamento com Integração`,
      duration: "45-50 min",
      description: "12 exercícios para potencializar ganhos de emagrecimento e definição muscular.",
      instructions: [
        "Aquecimento 5 min",
        "45 segundos por exercício (ou 3 séries de 15-20 repetições) para cada exercício:",
        "Wall Plank",
        "Wall Push-Ups",
        "Wall Sit",
        "Wall Mountain Climbers",
        "Wall Side Plank",
        "Wall Marches",
        "Standing Wall Twist",
        "Warrior 3 Pose",
        "Wall Side Stretch",
        "Wall Roll Downs",
        "The Control Balance",
        "Alongamento final: Downward Facing Dog (relaxamento e fechamento)"
      ],
      isVip: false,
      phase: 'consolidacao' as const
    },

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

      <main className="max-w-6xl mx-auto p-4 pb-24">
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
                  {exerciseDictionary.map((exercise: DictionaryExercise) => (
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
                className="space-y-6 mt-64" 
              >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 justify-center mb-4">
                  <Crown className="h-6 w-6 text-vipPurple" />
                  Módulos VIP Exclusivos
                </h2>
                <p className="text-white mb-24 text-center">Acelere seus resultados com treinos avançados e conteúdo premium.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {exercises.filter(ex => ex.isVip).map((exercise) => (
                    <motion.div
                      key={exercise.id}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative"
                    >
                      {/* Div para o efeito de brilho neon */}
                      <div className="absolute inset-0 bg-vipPurple/30 rounded-xl blur-lg opacity-70 z-0"></div>
                      <Card className="bg-gray-900/50 backdrop-blur-sm border border-vipPurple/50 rounded-xl relative overflow-hidden h-full z-10">
                        <div className="absolute top-4 right-4">
                          <Lock className="h-6 w-6 text-vipPurple" />
                        </div>
                        <CardContent className="p-6 flex flex-col h-full">
                          <h3 className="font-semibold text-lg mb-2 break-words text-white">{exercise.title}</h3>
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