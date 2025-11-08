import React from 'react';

interface PerfilButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const PerfilButton: React.FC<PerfilButtonProps> = ({ isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex flex-col items-center px-4 py-3 rounded-md transition-colors duration-300 ${
        isOpen ? 'bg-yellow-400' : 'bg-black'
      }`}
    >
      {/* Líneas paralelas o "X" */}
      <div className="mb-1 relative w-5 h-4">
        <div
          className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ${
            isOpen ? 'rotate-45 top-2' : 'top-0'
          }`}
        ></div>
        <div
          className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ${
            isOpen ? '-rotate-45 top-2' : 'top-2'
          }`}
        ></div>
      </div>
      {/* Texto "PERFIL" o "CERRAR" */}
      <span className={`text-white font-medium text-sm ${isOpen ? 'text-black' : ''}`}>
        {isOpen ? 'CERRAR' : 'PERFIL'}
      </span>
    </button>
  );
};

export default PerfilButton;
