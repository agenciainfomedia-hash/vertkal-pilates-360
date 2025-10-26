"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface CelebrationOverlayProps {
  showCelebration: boolean;
  newAchievement: Achievement | null;
}

const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({ showCelebration, newAchievement }) => {
  return (
    <AnimatePresence>
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            className="bg-gradient-to-br from-[#ECA20C] to-orange-500 text-black p-8 rounded-2xl text-center max-w-md mx-4"
          >
            <Sparkles className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Parabéns!</h2>
            <p className="text-lg mb-4">Você completou mais um treino!</p>
            {newAchievement && (
              <div className="bg-black/20 rounded-lg p-4 mb-4">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                <p className="font-semibold">{newAchievement.title}</p>
                <p className="text-sm opacity-90">{newAchievement.description}</p>
              </div>
            )}
            <p className="text-sm opacity-80">Continue assim!</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CelebrationOverlay;