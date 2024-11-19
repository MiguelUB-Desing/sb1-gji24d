import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useDatabase } from './hooks/useDatabase';
import Login from './components/Login';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './components/Unauthorized';
import EmployeeRegistry from './components/EmployeeRegistry';
import TimeTracking from './components/TimeTracking';
import LeaveManagement from './components/LeaveManagement';
import Reports from './components/Reports';

const App: React.FC = () => {
  const { isReady, error } = useDatabase();
  const { isAuthenticated, user } = useAuthStore();

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Inicializando base de datos...</h2>
          {error && (
            <p className="text-red-600">
              Error al conectar con la base de datos: {error.message}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Determinar la ruta inicial basada en el rol del usuario
  const getInitialRoute = () => {
    if (!isAuthenticated) return '/login';
    if (user?.role === 'empleado') return '/permisos';
    return '/empleados';
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to={getInitialRoute()} replace /> : <Login />
        } />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Navigate to={getInitialRoute()} replace />} />
        
        <Route path="/empleados" element={
          <ProtectedRoute allowedRoles={['admin', 'director']}>
            <Layout>
              <EmployeeRegistry />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/tiempo" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout>
              <TimeTracking />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/permisos" element={
          <ProtectedRoute allowedRoles={['admin', 'director', 'empleado']}>
            <Layout>
              <LeaveManagement />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/informes" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout>
              <Reports />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to={getInitialRoute()} replace />} />
      </Routes>
    </Router>
  );
};

export default App;