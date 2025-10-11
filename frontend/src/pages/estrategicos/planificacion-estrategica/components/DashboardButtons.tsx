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
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
        }`}
      >
        Planificación Estratégica
      </button>
      <button
        onClick={() => setActiveSection('calidad')}
        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
          activeSection === 'calidad'
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
        }`}
      >
        Gestión de Calidad
      </button>
    </div>
  );
};

export default DashboardButtons;
