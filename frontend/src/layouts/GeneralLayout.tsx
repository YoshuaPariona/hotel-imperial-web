// src/layouts/GeneralLayout.tsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const GeneralLayout: React.FC = () => {
  return (
    <div className="app-layout flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hotel Imperial</h1>
          <nav>
            <Link to="/" className="mr-4 hover:underline">Inicio</Link>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          </nav>
        </div>
      </header>

      {/* Contenido dinámico */}
      <main className="flex-grow container mx-auto p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Hotel Imperial - Sistema de Gestión</p>
      </footer>
    </div>
  );
};

export default GeneralLayout;