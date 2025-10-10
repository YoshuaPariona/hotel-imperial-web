import React from 'react';

const LogoSection: React.FC = () => {
  return (
    <div className="flex items-center justify-end p-4">
      <img
        src="/imagenes/logo.webp"
        alt="Hotel Imperial Logo"
        className="w-82 md:w-112 h-auto object-contain"
      />
    </div>
  );
};

export default LogoSection;
