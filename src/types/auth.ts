export type Role = 'admin' | 'director' | 'empleado';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: Role;
}

export interface AuthState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}