"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon, Timer } from 'lucide-react';

interface DictionaryExercise {
  id: string;
  name: string;
  image: string;
  description: string;
  reps: string;
  muscles: string[];
}

interface DictionaryCardProps {
  exercise: DictionaryExercise;
}

const DictionaryCard: React.FC<DictionaryCardProps> = ({ exercise }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:border-[#ECA20C]/50 h-full">
        <CardContent className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-16 h-16 bg-black/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <ImageIcon className="h-8 w-8 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-sm leading-tight mb-1 break-words">{exercise.name}</h3>
              <p className="text-xs text-gray-300 leading-tight mb-2 break-words">{exercise.description}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Timer className="h-3 w-3" />
                <span>{exercise.reps}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {exercise.muscles.map((muscle, index) => (
              <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400">
                {muscle}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DictionaryCard;