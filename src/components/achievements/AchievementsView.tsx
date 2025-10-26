"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';
import { achievements } from '@/lib/achievements';

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

interface AchievementsViewProps {
  currentUser: User | null;
  onBack: () => void;
}

const AchievementsView: React.FC<AchievementsViewProps> = ({ currentUser, onBack }) => {
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
        <h1 className="text-2xl font-bold text-white">Conquistas</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement: any) => {
          const isUnlocked = currentUser?.achievements.includes(achievement.id);
          return (
            <motion.div
              key={achievement.id}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className={`bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 ${
                isUnlocked ? 'border-yellow-500/50' : 'opacity-60'
              }`}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    isUnlocked ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-white'
                  }`}>
                    <achievement.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-white mb-2 break-words">{achievement.title}</h3>
                  <p className="text-sm text-white mb-4 break-words">{achievement.description}</p>
                  {isUnlocked && (
                    <Badge className="bg-yellow-500 text-white">
                      <Trophy className="h-3 w-3 mr-1" />
                      Desbloqueada
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AchievementsView;