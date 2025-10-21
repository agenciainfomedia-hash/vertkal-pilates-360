"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Crown, Medal, Target, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CelebrationModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'day_completed' | 'achievement_unlocked' | 'phase_completed' | 'vip_unlocked'
  data: {
    title: string
    description: string
    points?: number
    badge?: string
    icon?: string
  }
}

export function CelebrationModal({ isOpen, onClose, type, data }: CelebrationModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'day_completed':
        return <Target className="w-16 h-16 text-[#eca20c]" />
      case 'achievement_unlocked':
        return <Trophy className="w-16 h-16 text-[#eca20c]" />
      case 'phase_completed':
        return <Medal className="w-16 h-16 text-[#eca20c]" />
      case 'vip_unlocked':
        return <Crown className="w-16 h-16 text-[#eca20c]" />
      default:
        return <Star className="w-16 h-16 text-[#eca20c]" />
    }
  }

  const getEmoji = () => {
    switch (type) {
      case 'day_completed':
        return '🎯'
      case 'achievement_unlocked':
        return '🏆'
      case 'phase_completed':
        return '🎖️'
      case 'vip_unlocked':
        return '👑'
      default:
        return '⭐'
    }
  }

  const confettiVariants = {
    initial: { scale: 0, rotate: 0 },
    animate: { 
      scale: [0, 1, 0.8, 1],
      rotate: [0, 180, 360],
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const modalVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          {/* Confetes animados */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                variants={confettiVariants}
                initial="initial"
                animate="animate"
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`
                }}
              >
                {['🎉', '✨', '🌟', '💫', '🎊'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative"
          >
            <Card className="bg-gray-900 border-[#eca20c] max-w-md w-full">
              <CardContent className="p-8 text-center">
                {/* Ícone principal */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-6"
                >
                  <div className="w-20 h-20 bg-[#eca20c] rounded-full flex items-center justify-center mx-auto mb-4">
                    {getIcon()}
                  </div>
                  <div className="text-6xl mb-4">{getEmoji()}</div>
                </motion.div>

                {/* Título */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-white mb-3"
                >
                  {data.title}
                </motion.h2>

                {/* Descrição */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-300 mb-6"
                >
                  {data.description}
                </motion.p>

                {/* Recompensas */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center gap-4 mb-6"
                >
                  {data.points && (
                    <Badge className="bg-[#eca20c] text-black px-4 py-2">
                      <Zap className="w-4 h-4 mr-1" />
                      +{data.points} pontos
                    </Badge>
                  )}
                  {data.badge && (
                    <Badge variant="outline" className="border-[#eca20c] text-[#eca20c] px-4 py-2">
                      <Medal className="w-4 h-4 mr-1" />
                      {data.badge}
                    </Badge>
                  )}
                </motion.div>

                {/* Botão de fechar */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={onClose}
                  className="bg-[#eca20c] hover:bg-[#d4941a] text-black font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Continuar
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Componente para animação de progresso
interface ProgressAnimationProps {
  from: number
  to: number
  duration?: number
  className?: string
}

export function ProgressAnimation({ from, to, duration = 1000, className = "" }: ProgressAnimationProps) {
  const [currentValue, setCurrentValue] = useState(from)

  useState(() => {
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const value = from + (to - from) * easeOutQuart
      
      setCurrentValue(Math.round(value))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    animate()
  })

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={className}
    >
      {currentValue}%
    </motion.div>
  )
}

// Componente para badge animado
interface AnimatedBadgeProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function AnimatedBadge({ children, delay = 0, className = "" }: AnimatedBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        delay, 
        type: "spring", 
        stiffness: 200,
        damping: 10
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Componente para card de dia com animação
interface AnimatedDayCardProps {
  children: React.ReactNode
  isCompleted: boolean
  isUnlocked: boolean
  onClick?: () => void
  delay?: number
}

export function AnimatedDayCard({ 
  children, 
  isCompleted, 
  isUnlocked, 
  onClick, 
  delay = 0 
}: AnimatedDayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={isUnlocked ? { scale: 1.02, y: -2 } : {}}
      whileTap={isUnlocked ? { scale: 0.98 } : {}}
      onClick={onClick}
      className="cursor-pointer"
    >
      <motion.div
        animate={isCompleted ? {
          boxShadow: [
            "0 0 0 0 rgba(236, 162, 12, 0.4)",
            "0 0 0 10px rgba(236, 162, 12, 0)",
            "0 0 0 0 rgba(236, 162, 12, 0)"
          ]
        } : {}}
        transition={{ duration: 2, repeat: isCompleted ? Infinity : 0 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}