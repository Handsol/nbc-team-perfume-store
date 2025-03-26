import { LoginState } from '@/types/login-state';
import { create } from 'zustand';

export const useLoginState = create<LoginState>((set) => ({
  loggedIn: false,
  setLoggedIn: (value) => set({ loggedIn: value }),
  logout: () => set({ loggedIn: false })
}));
