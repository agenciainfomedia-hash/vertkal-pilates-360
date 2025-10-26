"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, Flame, Award } from 'lucide-react';

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

interface ProgressOverviewProps {
  currentUser: User | null;
  getProgressPercentage: () => number;
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ currentUser, getProgressPercentage }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="h-8 w-8 text-[#ECA20C]" />
            <span className="text-3xl font-bold text-white">{getProgressPercentage()}%</span>
          </div>
          <p className="text-sm text-white mb-2">Progresso Geral</p>
          <Progress value={getProgressPercentage()} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-[#ECA20C] [&>div]:to-orange-500" />
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Flame className="h-8 w-8 text-orange-500" />
            <span className="text-3xl font-bold text-white">{currentUser?.streak || 0}</span>
          </div>
          <p className="text-sm text-white">Sequência Atual</p>
          <p className="text-xs text-white mt-1">dias consecutivos</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Award className="h-8 w-8 text-yellow-500" />
            <span className="text-3xl font-bold text-white">{currentUser?.achievements.length || 0}</span>
          </div>
          <p className="text-sm text-white">Conquistas</p>
          <p className="text-xs text-white mt-1">desbloqueadas</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressOverview;