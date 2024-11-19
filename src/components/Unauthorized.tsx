import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleBack = () => {
    if (user?.role === 'empleado') {
      navigate('/permisos');
    } else {
      navigate('/empleados');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <ShieldAlert className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Acceso No Autorizado
        </h1>
        <p className="text-gray-600 mb-8">
          Lo sentimos, no tienes permisos para acceder a esta sección.
        </p>
        <button
          onClick={handleBack}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver a la página principal
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;