import { create } from 'zustand';
import { AuthState, User } from '../types/auth';

const usuarios: User[] = [
  {
    id: 1,
    email: 'admin@ejemplo.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin'
  },
  {
    id: 2,
    email: 'director@ejemplo.com',
    password: 'director123',
    name: 'Director',
    role: 'director'
  },
  {
    id: 3,
    email: 'empleado@ejemplo.com',
    password: 'empleado123',
    name: 'Empleado',
    role: 'empleado'
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (email: string, password: string) => {
    const user = usuarios.find(u => u.email === email && u.password === password);
    if (user) {
      set({ user, isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));