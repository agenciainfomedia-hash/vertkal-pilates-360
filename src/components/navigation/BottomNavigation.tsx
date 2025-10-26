"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Trophy, Crown } from 'lucide-react';

interface BottomNavigationProps {
  currentView: 'dashboard' | 'exercise' | 'profile' | 'achievements' | 'vip';
  setCurrentView: (view: 'dashboard' | 'exercise' | 'profile' | 'achievements' | 'vip') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentView, setCurrentView }) => {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-lg border-t border-white/10 p-2"
    >
      <div className="max-w-md mx-auto flex justify-around">
        <Button
          variant="ghost"
          onClick={() => setCurrentView('dashboard')}
          className={`rounded-full w-16 h-12 transition-colors ${currentView === 'dashboard' ? 'bg-[#ECA20C] text-white' : 'text-white hover:text-white'}`}
        >
          <Calendar className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => setCurrentView('achievements')}
          className={`rounded-full w-16 h-12 transition-colors ${currentView === 'achievements' ? 'bg-[#ECA20C] text-white' : 'text-white hover:text-white'}`}
        >
          <Trophy className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => setCurrentView('vip')}
          className={`rounded-full w-16 h-12 transition-colors ${currentView === 'vip' ? 'bg-vipPurple text-white' : 'text-white hover:text-white'}`}
        > {/* Changed to bg-vipPurple */}
          <Crown className="h-5 w-5" />
        </Button>
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;