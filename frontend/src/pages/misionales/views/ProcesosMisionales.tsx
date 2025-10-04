import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const ProcesosMisionales: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-full w-full flex">
      {/* Contenedor de la barra lateral */}
      <div className={`h-full transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
        {/* Barra de navegación lateral */}
        <nav className={`h-full flex flex-col p-4 transition-all duration-300 fixed bg-gray-200 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
          {/* Contenedor del título y botón */}
          <div className="flex justify-between items-center mb-8">
            {isSidebarOpen ? (
              <>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400">
                  Hotel Imperial
                </h1>
                <button onClick={toggleSidebar} className="p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            ) : (
              <button onClick={toggleSidebar} className="p-1 mx-auto mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
          {/* Elementos del menú */}
          {isSidebarOpen && (
            <ul className="space-y-3">
              <li className="px-3 py-2 rounded relative group">
                <Link
                  to="gestion-habitaciones"
                  className="text-gray-800 hover:text-yellow-600 block relative overflow-hidden"
                >
                  <span className="relative z-10">Gestión de Habitaciones</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li className="px-3 py-2 rounded relative group">
                <Link
                  to="reservas"
                  className="text-gray-800 hover:text-yellow-600 block relative overflow-hidden"
                >
                  <span className="relative z-10">Gestión de Reservas</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li className="px-3 py-2 rounded relative group">
                <Link
                  to="incidencias"
                  className="text-gray-800 hover:text-yellow-600 block relative overflow-hidden"
                >
                  <span className="relative z-10">Gestión de Incidencias</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
      {/* Contenido principal */}
      <div className={`flex-1 p-4 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'} bg-gray-800`}>
        <Outlet />
      </div>
    </div>
  );
};

export default ProcesosMisionales;
