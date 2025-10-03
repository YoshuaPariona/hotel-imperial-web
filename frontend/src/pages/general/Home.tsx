// src/pages/general/Home.tsx
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Hotel Imperial - Menú Principal</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Botón para ir al Dashboard */}
        {/* Botones para futuros procesos (estrategicos, misionales, soporte) */}
        <div className="bg-gray-300 text-gray-500 p-6 rounded-lg shadow-md cursor-not-allowed opacity-70">
          <h2 className="text-xl font-semibold mb-2">Procesos Estratégicos</h2>
          <p>Próximamente: Planificación estratégica y gestión de calidad.</p>
        </div>

        <div className="bg-gray-300 text-gray-500 p-6 rounded-lg shadow-md cursor-not-allowed opacity-70">
          <h2 className="text-xl font-semibold mb-2">Procesos Misionales</h2>
          <p>Próximamente: Gestión de reservas, habitaciones y atención al cliente.</p>
        </div>

        <div className="bg-gray-300 text-gray-500 p-6 rounded-lg shadow-md cursor-not-allowed opacity-70">
          <h2 className="text-xl font-semibold mb-2">Procesos de Soporte</h2>
          <p>Próximamente: Finanzas, administración, limpieza y mantenimiento.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;