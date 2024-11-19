import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface LeaveRequest {
  id: number;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: 'Pendiente' | 'Aprobado' | 'Rechazado';
}

const LeaveManagement: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: 1, employeeName: 'Juan Pérez', leaveType: 'Vacaciones', startDate: '2023-04-15', endDate: '2023-04-20', status: 'Aprobado' },
    { id: 2, employeeName: 'María García', leaveType: 'Permiso por Enfermedad', startDate: '2023-04-12', endDate: '2023-04-13', status: 'Pendiente' },
  ]);

  const [newRequest, setNewRequest] = useState<Omit<LeaveRequest, 'id' | 'status'>>({
    employeeName: '',
    leaveType: '',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeaveRequests((prev) => [...prev, { ...newRequest, id: prev.length + 1, status: 'Pendiente' }]);
    setNewRequest({ employeeName: '', leaveType: '', startDate: '', endDate: '' });
  };

  const handleStatusChange = (id: number, newStatus: 'Aprobado' | 'Rechazado') => {
    setLeaveRequests((prev) =>
      prev.map((request) => (request.id === id ? { ...request, status: newStatus } : request))
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Enviar Solicitud de Permiso</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="employeeName"
            value={newRequest.employeeName}
            onChange={handleInputChange}
            placeholder="Nombre del Empleado"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <select
            name="leaveType"
            value={newRequest.leaveType}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Seleccionar Tipo de Permiso</option>
            <option value="Vacaciones">Vacaciones</option>
            <option value="Permiso por Enfermedad">Permiso por Enfermedad</option>
            <option value="Permiso Personal">Permiso Personal</option>
          </select>
          <input
            type="date"
            name="startDate"
            value={newRequest.startDate}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="date"
            name="endDate"
            value={newRequest.endDate}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Enviar Solicitud
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empleado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Permiso</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Inicio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Fin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">{request.employeeName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.leaveType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.status === 'Aprobado'
                        ? 'bg-green-100 text-green-800'
                        : request.status === 'Rechazado'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {request.status === 'Pendiente' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(request.id, 'Aprobado')}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => handleStatusChange(request.id, 'Rechazado')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagement;