import React, { useState } from 'react';
import { getDashboardData } from '../components/DatosConnection';
import DashboardButtons from '../components//DashboardButtons';
import EstrategicaCharts from '../components/DiagramSrategy';
import CalidadChart from '../components/DiagramQuality';

const ViewDashboards: React.FC = () => {
  const { roomTypeStats, incidentTypeStats, reservationStatusStats } = getDashboardData();
  const [activeSection, setActiveSection] = useState<'estrategica' | 'calidad'>('estrategica');

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Dashboard de Procesos
      </h1>

      <DashboardButtons activeSection={activeSection} setActiveSection={setActiveSection} />

      {activeSection === 'estrategica' && (
        <EstrategicaCharts roomTypeStats={roomTypeStats} reservationStatusStats={reservationStatusStats} />
      )}
      {activeSection === 'calidad' && (
        <CalidadChart incidentTypeStats={incidentTypeStats} />
      )}
    </div>
  );
};

export default ViewDashboards;
