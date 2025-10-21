import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface User {
  id: string
  name: string
  email: string
  plan: 'Essencial' | 'VIP'
  progress: number
  badges: string[]
  created_at: string
  updated_at: string
}

export interface Exercise {
  id: string
  day: number
  title: string
  duration: string
  image_url: string
  is_vip: boolean
  description: string
  instructions: string[]
  muscles: string[]
  level: 'Iniciante' | 'Intermediário' | 'Avançado'
  cues: string[]
  tags: string[]
}

export interface Challenge {
  id: string
  month: string
  title: string
  description: string
  goal: string
  is_active: boolean
  created_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  day: number
  completed_at: string
  exercise_id: string
}