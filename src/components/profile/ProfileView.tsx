"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User as UserIcon, Trophy, Crown, LogOut } from 'lucide-react';

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

interface ProfileViewProps {
  currentUser: User | null;
  onBack: () => void;
  setCurrentView: (view: 'dashboard' | 'exercise' | 'profile' | 'achievements' | 'vip') => void;
  setCurrentUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  onBack,
  setCurrentView,
  setCurrentUser,
  setIsAuthenticated,
}) => {
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

      <Card className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-[#ECA20C] rounded-full flex items-center justify-center flex-shrink-0">
              <UserIcon className="h-10 w-10 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-white break-words">{currentUser?.name}</h2>
              <p className="text-gray-400 break-words">{currentUser?.email}</p>
              <Badge className={`mt-2 ${currentUser?.plan === 'vip' ? 'bg-[#ECA20C] text-black' : 'bg-white/10 text-white'}`}>
                {currentUser?.plan === 'vip' ? 'VIP 360°' : 'Plano Essencial'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-[#ECA20C]">{currentUser?.points || 0}</div>
              <div className="text-sm text-gray-400">Pontos</div>
            </div>
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-500">{currentUser?.streak || 0}</div>
              <div className="text-sm text-gray-400">Sequência</div>
            </div>
          </div>

          <Button
            onClick={() => setCurrentView('achievements')}
            variant="outline"
            className="w-full justify-start border-white/20 text-white hover:bg-white/10"
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
              setCurrentUser(null);
              setIsAuthenticated(false);
              setCurrentView('dashboard');
            }}
            variant="outline"
            className="w-full justify-start border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sair
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileView;