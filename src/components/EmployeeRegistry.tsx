import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
}

const EmployeeRegistry: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'Juan Pérez', position: 'Ingeniero de Software', department: 'TI', email: 'juan@ejemplo.com' },
    { id: 2, name: 'María García', position: 'Gerente de RRHH', department: 'Recursos Humanos', email: 'maria@ejemplo.com' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({
    name: '',
    position: '',
    department: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editingEmployee.id ? { ...emp, ...newEmployee } : emp))
      );
      setEditingEmployee(null);
    } else {
      setEmployees((prev) => [...prev, { ...newEmployee, id: prev.length + 1 }]);
    }
    setNewEmployee({ name: '', position: '', department: '', email: '' });
    setShowForm(false);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setNewEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar empleados..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <button
          onClick={() => {
            setEditingEmployee(null);
            setNewEmployee({ name: '', position: '', department: '', email: '' });
            setShowForm(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>Agregar Empleado</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingEmployee ? 'Editar Empleado' : 'Agregar Nuevo Empleado'}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
              placeholder="Nombre Completo"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="position"
              value={newEmployee.position}
              onChange={handleInputChange}
              placeholder="Cargo"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="department"
              value={newEmployee.department}
              onChange={handleInputChange}
              placeholder="Departamento"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="email"
              name="email"
              value={newEmployee.email}
              onChange={handleInputChange}
              placeholder="Correo Electrónico"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              {editingEmployee ? 'Guardar Cambios' : 'Agregar Empleado'}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo Electrónico</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.position}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
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

export default EmployeeRegistry;