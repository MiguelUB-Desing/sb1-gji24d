import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, Clock, Calendar, BarChart2, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      path: '/empleados',
      icon: Users,
      label: 'Empleados',
      roles: ['admin', 'director']
    },
    {
      path: '/tiempo',
      icon: Clock,
      label: 'Control de Tiempo',
      roles: ['admin']
    },
    {
      path: '/permisos',
      icon: Calendar,
      label: 'Gestión de Permisos',
      roles: ['admin', 'director', 'empleado']
    },
    {
      path: '/informes',
      icon: BarChart2,
      label: 'Informes',
      roles: ['admin']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <nav className="bg-indigo-800 text-white w-64 space-y-6 py-7 px-2 flex flex-col">
        <div className="text-white flex items-center space-x-2 px-4">
          <Users className="w-8 h-8" />
          <span className="text-2xl font-extrabold">Gestor RRHH</span>
        </div>

        <div className="px-4 py-2 bg-indigo-900/50 rounded-lg">
          <p className="text-sm text-gray-300">Bienvenido,</p>
          <p className="font-semibold">{user?.name}</p>
          <p className="text-xs text-gray-300 capitalize">Rol: {user?.role}</p>
        </div>

        <ul className="flex-1 space-y-2">
          {menuItems
            .filter(item => item.roles.includes(user?.role || ''))
            .map(item => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <button
                    className={`flex items-center space-x-2 w-full py-2.5 px-4 rounded transition duration-200 ${
                      location.pathname === item.path
                        ? 'bg-indigo-900 text-white'
                        : 'hover:bg-indigo-700 text-gray-300'
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
        </ul>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 w-full py-2.5 px-4 rounded transition duration-200 text-gray-300 hover:bg-indigo-700"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;