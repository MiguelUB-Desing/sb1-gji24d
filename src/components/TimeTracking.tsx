import React, { useState } from 'react';
import { Clock, Calendar, Edit, Trash2 } from 'lucide-react';

interface TimeEntry {
  id: number;
  employeeName: string;
  date: string;
  clockIn: string;
  clockOut: string;
}

const TimeTracking: React.FC = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    { id: 1, employeeName: 'Juan Pérez', date: '2023-04-10', clockIn: '09:00', clockOut: '17:00' },
    { id: 2, employeeName: 'María García', date: '2023-04-10', clockIn: '08:30', clockOut: '16:30' },
  ]);

  const [newEntry, setNewEntry] = useState<Omit<TimeEntry, 'id'>>({
    employeeName: '',
    date: '',
    clockIn: '',
    clockOut: '',
  });

  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEntry) {
      setTimeEntries((prev) =>
        prev.map((entry) => (entry.id === editingEntry.id ? { ...entry, ...newEntry } : entry))
      );
      setEditingEntry(null);
    } else {
      setTimeEntries((prev) => [...prev, { ...newEntry, id: prev.length + 1 }]);
    }
    setNewEntry({ employeeName: '', date: '', clockIn: '', clockOut: '' });
  };

  const handleEdit = (entry: TimeEntry) => {
    setEditingEntry(entry);
    setNewEntry(entry);
  };

  const handleDelete = (id: number) => {
    setTimeEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingEntry ? 'Editar Registro de Tiempo' : 'Agregar Registro de Tiempo'}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="employeeName"
            value={newEntry.employeeName}
            onChange={handleInputChange}
            placeholder="Nombre del Empleado"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="date"
            name="date"
            value={newEntry.date}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="time"
            name="clockIn"
            value={newEntry.clockIn}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="time"
            name="clockOut"
            value={newEntry.clockOut}
            onChange={handleInputChange}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => {
              setEditingEntry(null);
              setNewEntry({ employeeName: '', date: '', clockIn: '', clockOut: '' });
            }}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            {editingEntry ? 'Guardar Cambios' : 'Agregar Entrada'}
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empleado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrada</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salida</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeEntries.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap">{entry.employeeName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.clockIn}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.clockOut}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(entry)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTracking;