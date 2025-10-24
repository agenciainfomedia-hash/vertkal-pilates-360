import { Trophy, Zap, Flame, Crown } from 'lucide-react';

export const achievements = [
  { id: 'first_step', title: 'Primeiro Passo', description: 'Complete seu primeiro treino.', icon: Trophy },
  { id: 'week_one', title: 'Semana 1 Concluída', description: 'Complete 7 dias de treino.', icon: Zap },
  { id: 'streak_three', title: 'Em Chamas!', description: 'Mantenha uma sequência de 3 dias.', icon: Flame },
  { id: 'vip_member', title: 'Membro VIP', description: 'Faça upgrade para o plano VIP.', icon: Crown },
];

interface CheckAchievementsParams {
  completedDays: number[];
  currentStreak: number;
  isVIP: boolean;
  completedChallenges: string[];
}

export const checkAchievements = ({ completedDays, currentStreak, isVIP }: CheckAchievementsParams): string[] => {
  const unlocked: string[] = [];
  if (completedDays.length >= 1) unlocked.push('first_step');
  if (completedDays.length >= 7) unlocked.push('week_one');
  if (currentStreak >= 3) unlocked.push('streak_three');
  if (isVIP) unlocked.push('vip_member');
  return unlocked;
};