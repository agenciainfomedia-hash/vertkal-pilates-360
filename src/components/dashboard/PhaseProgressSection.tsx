"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';
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

interface PhaseProgressSectionProps {
  currentUser: User | null;
  exercises: Exercise[];
  getPhaseProgress: (phase: 'perda' | 'definicao' | 'consolidacao') => number;
}

const PhaseProgressSection: React.FC<PhaseProgressSectionProps> = ({ getPhaseProgress }) => { // Removed currentUser and exercises
  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-white">
          <TrendingUp className="h-5 w-5 text-[#ECA20C]" />
          Progresso por Fase
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(phaseNames).map(([phase]) => (
            <div key={phase} className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-400 flex-shrink-0">{phaseNames[phase as keyof typeof phaseNames]}</div>
              <div className="flex-1">
                <Progress value={getPhaseProgress(phase as any)} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-[#ECA20C] [&>div]:to-orange-500" />
              </div>
              <div className="w-12 text-right text-sm text-white flex-shrink-0">{getPhaseProgress(phase as any)}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseProgressSection;