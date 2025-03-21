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
