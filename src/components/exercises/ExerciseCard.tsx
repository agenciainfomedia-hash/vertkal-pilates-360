"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { CheckCircle, Lock, ChevronRight, Crown } from 'lucide-react';
import { phaseNames } from '@/lib/constants';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'essencial' | 'vip';
  progress: number[];
  achievements: string[];
  points: number;
  streak: number;
  completedDays: number;
}

interface Exercise {
  id: string;
  day: number;
  title: string;
  duration: string;
  description: string;
  instructions: string[];
  isVip: boolean;
  phase: 'perda' | 'definicao' | 'consolidacao';
}

interface ExerciseCardProps {
  exercise: Exercise;
  currentUser: User | null;
  canAccessExercise: (exercise: Exercise) => boolean;
  setSelectedExercise: (exercise: Exercise) => void;
  setCurrentView: (view: 'dashboard' | 'exercise' | 'profile' | 'achievements' | 'vip') => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  currentUser,
  canAccessExercise,
  setSelectedExercise,
  setCurrentView,
}) => {
  const isCompleted = currentUser?.progress.includes(exercise.day);
  const canAccess = canAccessExercise(exercise);
  const isNext = exercise.day === (currentUser?.completedDays || 0) + 1 && !isCompleted && !exercise.isVip;

  const cardClasses = `bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300`;

  const cardContent = (
    <CardContent className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm leading-tight mb-1 break-words">{exercise.title}</h3>
          <p className="text-xs text-white mb-2">{exercise.duration}</p>
          <p className="text-xs text-white leading-tight break-words">{exercise.description}</p>
        </div>
        {isCompleted && <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 ml-2" />}
        {!canAccess && <Lock className={`h-5 w-5 flex-shrink-0 ml-2 ${exercise.isVip ? 'text-[#ECA20C]' : 'text-white'}`} />}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
        <Badge variant="secondary" className={`text-xs flex-shrink-0 bg-white/10 ${
          exercise.phase === 'perda' ? 'text-orange-400' :
          exercise.phase === 'definicao' ? 'text-blue-400' :
          'text-green-400'
        }`}>
          {phaseNames[exercise.phase]}
        </Badge>

        {canAccess ? (
          <Button
            size="sm"
            onClick={() => {
              setSelectedExercise(exercise);
              setCurrentView('exercise');
            }}
            className={`text-xs px-3 py-1 flex-shrink-0 ${
              isNext ? 'bg-[#ECA20C] text-white hover:bg-[#ECA20C]/90' :
              'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isCompleted ? 'Refazer' : isNext ? 'Começar' : 'Ver'}
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        ) : (
          exercise.isVip ? (
            <Button
              size="sm"
              onClick={() => setCurrentView('vip')}
              className="text-xs px-3 py-1 bg-gradient-to-r from-[#ECA20C] to-orange-500 text-white hover:from-[#ECA20C]/90 hover:to-orange-500/90 flex-shrink-0"
            >
              <Crown className="h-3 w-3 mr-1" />
              VIP
            </Button>
          ) : (
            <Button
              size="sm"
              disabled
              className="text-xs px-3 py-1 flex-shrink-0 bg-white/5 text-white cursor-not-allowed"
            >
              <Lock className="h-3 w-3 mr-1" />
              Bloqueado
            </Button>
          )
        )}
      </div>
    </CardContent>
  );

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      {isNext && <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ECA20C] to-orange-500 rounded-xl blur-md opacity-50 animate-pulse"></div>}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild disabled={canAccess}>
            <Card className={`${cardClasses} relative ${
              isCompleted ? 'border-green-400/30' :
              !canAccess ? 'opacity-60' :
              isNext ? 'border-[#ECA20C]' : ''
            }`}>
              {cardContent}
            </Card>
          </TooltipTrigger>
          {!canAccess && !exercise.isVip && (
            <TooltipContent>
              <p>Complete o dia anterior para desbloquear.</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
};

export default ExerciseCard;