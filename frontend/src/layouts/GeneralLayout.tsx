import React from 'react';
import { Outlet } from 'react-router-dom';

const GeneralLayout: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-gray-800"> {/* Cambiado a fondo oscuro */}
      {/* Contenido dinámico según la ruta */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      {/* Barra inferior (Footer) */}
      <footer className="bg-gray-900 p-2 text-center text-sm text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Izquierda: Copyright y enlaces legales */}
            <div className="flex space-x-2 mb-2 md:mb-0">
              <span>© 2025 Hotel Imperial</span>
              <a href="#" className="hover:text-yellow-400 mx-1">Términos y Condiciones</a>
              <a href="#" className="hover:text-yellow-400 mx-1">Política de Privacidad</a>
            </div>
            {/* Derecha: Ubicación y teléfono */}
            <div className="flex space-x-2">
              <span>Dirección: Av. Mariscal Castilla 2874, Huancayo, Peru</span>
              <span>Teléfono: 902 500 495</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GeneralLayout;
