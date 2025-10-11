// src/views/estratégicos/planificacion-estrategica/views/ViewDashboards.tsx
import React, { useState } from 'react';
import DashboardButtons from '../components/DashboardButtons';
import DiagramQuality from '../components/DiagramQuality';
import DiagramStrategy from '../components/DiagramStrategy';

const ViewDashboards: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'estrategica' | 'calidad'>('estrategica');

  return (
    <div className="p-6 space-y-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white text-center mb-2">
        Dashboard de Procesos
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Visualización de datos estratégicos para el Hotel Imperial
      </p>

      <DashboardButtons
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        {activeSection === 'estrategica' && <DiagramStrategy />}
        {activeSection === 'calidad' && <DiagramQuality />}
      </div>
    </div>
  );
};

export default ViewDashboards;
