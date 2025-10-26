"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthScreenProps {
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  formData: { name: string; email: string; password: string };
  setFormData: (data: { name: string; email: string; password: string }) => void;
  handleAuth: (e: React.FormEvent) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({
  authMode,
  setAuthMode,
  formData,
  setFormData,
  handleAuth,
}) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img
            src="https://i.ibb.co/d43h5MVn/LOGO.png"
            alt="Vertkal Pilates 360° Logo"
            className="mx-auto mb-8 w-36 h-auto"
          />
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {authMode === 'login' ? 'Bem-vindo de volta!' : 'Comece sua Jornada'}
          </h1>
          <p className="text-white mt-2">
            Transforme seu corpo em 21 dias.
          </p>
        </div>

        <motion.div
          layout
          className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8"
        >
          <Tabs value={authMode} onValueChange={(value: string) => setAuthMode(value as 'login' | 'register')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/5 mb-6 p-1 h-auto rounded-lg">
              <TabsTrigger value="login" className="flex-shrink-0 px-4 py-2 data-[state=active]:bg-[#ECA20C] data-[state=active]:text-white data-[state=inactive]:hover:bg-white/10 transition-all duration-300 rounded-md h-10">Entrar</TabsTrigger>
              <TabsTrigger value="register" className="flex-shrink-0 px-4 py-2 data-[state=active]:bg-[#ECA20C] data-[state=active]:text-white data-[state=inactive]:hover:bg-white/10 transition-all duration-300 rounded-md h-10">Criar Conta</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleAuth} className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={authMode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {authMode === 'register' && (
                    <Input
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
                      className="bg-white/5 border-white/20 focus:border-[#ECA20C] h-12"
                    />
                  )}
                  <Input
                    type="email"
                    placeholder="Seu melhor email"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                    className="bg-white/5 border-white/20 focus:border-[#ECA20C] h-12"
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Senha segura"
                    value={formData.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, password: e.target.value})}
                    className="bg-white/5 border-white/20 focus:border-[#ECA20C] h-12"
                    required
                  />
                </motion.div>
              </AnimatePresence>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#ECA20C] to-orange-500 hover:from-[#ECA20C]/90 hover:to-orange-500/90 text-white font-bold h-12 text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg"
              >
                {authMode === 'login' ? 'Continuar' : 'Criar conta e começar'}
              </Button>
            </form>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthScreen;