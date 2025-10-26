"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User as UserIcon } from 'lucide-react';

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

interface DashboardHeaderProps {
  currentUser: User | null;
  setCurrentView: (view: 'dashboard' | 'exercise' | 'profile' | 'achievements' | 'vip') => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentUser, setCurrentView }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-black/30 backdrop-blur-lg border-b border-white/10 p-4 sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <img src="https://i.ibb.co/KzSJqVnk/Logo-Horizontal.png" alt="Vertkal Pilates 360° Logo" className="h-[31px] w-auto" />
        <div className="flex items-center gap-4">
          <motion.div
            className="text-right flex-1 min-w-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-white break-words">Olá, {currentUser?.name}!</p>
            <p className="text-xs text-vipPurple font-medium break-words">{currentUser?.plan === 'vip' ? 'VIP 360°' : 'Plano Essencial'}</p> {/* Changed to text-vipPurple */}
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentView('profile')}
            className="text-white hover:text-white hover:bg-white/10 rounded-full"
          >
            <UserIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;