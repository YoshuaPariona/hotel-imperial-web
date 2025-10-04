// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GeneralLayout from './layouts/GeneralLayout';
import Home from './pages/general/views/Home';
import ProcesosMisionales from './pages/misionales/views/ProcesosMisionales';
import Habitaciones from './pages/misionales/gestion-habitaciones/views/Habitaciones';
import Reservas from './pages/misionales/gestion-reservas/views/Reservas';
import Incidencias from './pages/misionales/gestion-incidencias/views/Incidencias';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<GeneralLayout />}>
        <Route path="procesos-misionales" element={<ProcesosMisionales />}>
          <Route path="gestion-habitaciones" element={<Habitaciones />} />
          <Route path="reservas" element={<Reservas />} />
          <Route path="incidencias" element={<Incidencias />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
