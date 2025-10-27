"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Lock, Timer, Zap, Target, Award, Sparkles } from 'lucide-react';
import { vipBenefits } from '@/lib/constants';

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

interface VIPViewProps {
  onBack: () => void;
  exercises: Exercise[];
}

const iconMap: { [key: string]: React.ElementType } = {
  Zap: Zap,
  Crown: Crown,
  Target: Target,
  Award: Award,
  Sparkles: Sparkles,
};

const VIPView: React.FC<VIPViewProps> = ({ onBack, exercises }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="text-white hover:text-white">
          ← Voltar
        </Button>
        <h1 className="text-2xl font-bold text-white">VIP 360°</h1>
      </div>

      <Card className="bg-gray-900/50 backdrop-blur-sm border-vipPurple/30 rounded-xl">
        <CardContent className="p-8 text-center">
          <Crown className="h-16 w-16 text-vipPurple mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4 break-words">Desbloqueie seu Potencial Máximo</h2>
          <p className="text-lg text-white mb-8 break-words">Acesse módulos exclusivos e acelere seus resultados com o plano VIP 360°</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {vipBenefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-black/20 rounded-lg"
                >
                  {IconComponent && <IconComponent className="h-8 w-8 text-vipPurple flex-shrink-0" />}
                  <p className="text-white font-medium text-left flex-1 break-words">{benefit.text}</p>
                </motion.div>
              );
            })}
          </div>

          <Button className="w-full bg-gradient-to-r from-vipPurple-dark to-vipPurple-light hover:from-vipPurple-dark/90 hover:to-vipPurple-light/90 text-white font-bold px-6 py-3 text-base sm:px-12 sm:py-4 sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Crown className="h-5 w-5 mr-2" />
            Upgrade Agora - R$ 67,90/mês
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
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-vipPurple/30 rounded-xl relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Lock className="h-6 w-6 text-vipPurple" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-white text-lg mb-2 break-words">{exercise.title}</h3>
                <p className="text-white mb-4 break-words">{exercise.description}</p>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Timer className="h-4 w-4" />
                  <span>{exercise.duration}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default VIPView;