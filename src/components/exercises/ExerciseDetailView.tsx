"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, CheckCircle } from 'lucide-react';

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

interface ExerciseDetailViewProps {
  exercise: Exercise;
  onComplete: () => void;
  onBack: () => void;
}

const ExerciseDetailView: React.FC<ExerciseDetailViewProps> = ({ exercise, onComplete, onBack }) => {
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
        <h1 className="text-2xl font-bold text-white break-words">{exercise.title}</h1>
      </div>

      <Card className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl">
        <CardContent className="p-6">
          <div className="aspect-video bg-black/30 rounded-lg mb-6 flex items-center justify-center">
            <div className="text-center">
              <Play className="h-16 w-16 text-[#ECA20C] mx-auto mb-4" />
              <p className="text-white">Vídeo do exercício</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Instruções</h3>
              <div className="space-y-2">
                {exercise.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#ECA20C] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-white break-words flex-1">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={onComplete}
                className="flex-1 bg-gradient-to-r from-[#ECA20C] to-orange-500 hover:from-[#ECA20C]/90 hover:to-orange-500/90 text-white font-bold py-3"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Completar Treino
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExerciseDetailView;