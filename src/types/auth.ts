import { Session } from '@supabase/supabase-js';

export interface User {
  id: string;
  nickname: string;
  email: string;
  created_at: string;
}

export interface AuthState {
  isLogin: boolean;
  user: User | null;
  token: string | null;
  setLogin: (user: User, token: string) => void;
  setLogout: () => void;
  setToken: (token: string) => void;
}

export interface SignupOptions {
  email: string;
  password: string;
  nickname: string;
}

export interface LoginOptions {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: string | null;
}
