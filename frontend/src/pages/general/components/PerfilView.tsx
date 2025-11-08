import React from 'react';

interface PerfilViewProps {
  onClose: () => void;
}

const PerfilView: React.FC<PerfilViewProps> = ({ onClose }) => {
  const handleLogout = () => {
    onClose(); // Cierra la vista del perfil
    window.location.href = '/login'; // Redirige al login
  };

  return (
    <div className="relative z-10 flex justify-center items-center h-full px-5 md:px-10 text-white">
      {/* Contenedor principal */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Información del perfil */}
        <div className="space-y-4 text-lg md:text-xl">
          <p><strong>Nombre:</strong> Logan Yoshua</p>
          <p><strong>Correo:</strong> admin@hotelimperial.com</p>
          <p><strong>Número:</strong> +51987654321</p>
          <p><strong>Rol:</strong> GERENTE</p>
        </div>
        {/* Ícono de perfil */}
        <div className="w-32 h-32 flex items-center justify-center bg-yellow-400 rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      </div>
      {/* Botón para cerrar sesión */}
      <button
        onClick={handleLogout}
        className="absolute bottom-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 font-bold py-2 px-6 rounded-full hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default PerfilView;
