import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const ProcesosGenerales: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const goBack = ()=> {
    navigate(-1);
  };

  return (
    <div className="h-full w-full flex">
      {/* Barra lateral */}
      <div className={`h-full transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'} fixed`}>
        <nav className={`h-full flex flex-col p-4 transition-all duration-300 bg-gray-200 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
          {/* Título y botón de toggle */}
          <div className="flex justify-between items-center mb-8">
            {isSidebarOpen ? (
              <>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400">
                  Procesos Estratégicos
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
          {/* Menú */}
          {isSidebarOpen && (
            <ul className="space-y-3 flex-grow">
              <li className="px-3 py-2 rounded relative group">
                <Link
                  to="planificacion-estrategica"
                  className="text-gray-800 hover:text-yellow-600 block relative overflow-hidden"
                >
                  <span className="relative z-10">Dashboards</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          )}
          {/* Botón de retroceso */}
          <div className="mt-auto py-4">
            <button
              onClick={goBack}
              className={`flex items-center w-full px-3 py-2 text-gray-800 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all duration-300 font-medium ${!isSidebarOpen && 'justify-center'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {isSidebarOpen && <span className="ml-2">Retroceder</span>}
            </button>
          </div>
        </nav>
      </div>
      {/* Contenido principal */}
      <div
        className={`flex-1 p-4 overflow-y-auto transition-all duration-300 bg-white`}
        style={{ marginLeft: isSidebarOpen ? '16rem' : '4rem' }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default ProcesosGenerales;
