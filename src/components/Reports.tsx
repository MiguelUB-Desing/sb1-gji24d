import React, { useState } from 'react';
import { BarChart2, PieChart, LineChart } from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>('employeeDistribution');

  const renderReport = () => {
    switch (selectedReport) {
      case 'employeeDistribution':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Distribución de Empleados por Departamento</h3>
            <div className="flex items-center justify-center">
              <PieChart className="w-64 h-64 text-indigo-600" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="font-semibold">TI</div>
                <div className="text-2xl font-bold text-indigo-600">35%</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">RRHH</div>
                <div className="text-2xl font-bold text-indigo-600">15%</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">Ventas</div>
                <div className="text-2xl font-bold text-indigo-600">25%</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">Marketing</div>
                <div className="text-2xl font-bold text-indigo-600">25%</div>
              </div>
            </div>
          </div>
        );
      case 'leaveAnalysis':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Análisis de Permisos</h3>
            <div className="flex items-center justify-center">
              <BarChart2 className="w-64 h-64 text-indigo-600" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span>Vacaciones</span>
                <span className="font-semibold">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Permiso por Enfermedad</span>
                <span className="font-semibold">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Permiso Personal</span>
                <span className="font-semibold">25%</span>
              </div>
            </div>
          </div>
        );
      case 'attendanceTrends':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Tendencias de Asistencia</h3>
            <div className="flex items-center justify-center">
              <LineChart className="w-64 h-64 text-indigo-600" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span>Tasa Promedio de Asistencia</span>
                <span className="font-semibold">95%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Llegadas Tardías</span>
                <span className="font-semibold">3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Salidas Tempranas</span>
                <span className="font-semibold">2%</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar Tipo de Informe
        </label>
        <select
          id="reportType"
          value={selectedReport}
          onChange={(e) => setSelectedReport(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="employeeDistribution">Distribución de Empleados</option>
          <option value="leaveAnalysis">Análisis de Permisos</option>
          <option value="attendanceTrends">Tendencias de Asistencia</option>
        </select>
      </div>
      {renderReport()}
    </div>
  );
};

export default Reports;