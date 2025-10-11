// src/views/estratégicos/planificacion-estrategica/components/DashboardButtons.tsx
import React from 'react';

interface DashboardButtonsProps {
  activeSection: 'estrategica' | 'calidad';
  setActiveSection: (section: 'estrategica' | 'calidad') => void;
}

const DashboardButtons: React.FC<DashboardButtonsProps> = ({ activeSection, setActiveSection }) => {
  return (
    <div className="flex justify-center space-x-4 mb-8">
      <button
        onClick={() => setActiveSection('estrategica')}
        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
          activeSection === 'estrategica'
            ? 'bg-yellow-500 text-gray-900 shadow-lg'
            : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
        }`}
      >
        Planificación Estratégica
      </button>
      <button
        onClick={() => setActiveSection('calidad')}
        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
          activeSection === 'calidad'
            ? 'bg-yellow-500 text-gray-900 shadow-lg'
            : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
        }`}
      >
        Gestión de Calidad
      </button>
    </div>
  );
};

export default DashboardButtons;
