import { AuthState } from '@/types/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  isLogin: false,
  user: null,
  token: null
};

// Zustand 스토어 생성
export const useAuthStore = create<AuthState>()(
  // persist로 상태를 로컬 스토리지에 저장해, 새로고침시에도 유지되게 한다.
  persist(
    (set) => ({
      ...initialState,
      setLogin: (user, token) => set({ isLogin: true, user, token }),
      setLogout: () => set(initialState),
      setToken: (token) => set({ token })
    }),
    { name: 'auth-storage' }
  )
);
