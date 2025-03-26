export interface LoginState {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  logout: () => void;
}
