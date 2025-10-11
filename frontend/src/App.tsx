import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GeneralLayout from './layouts/GeneralLayout';
import Home from './pages/general/views/Home';
import Login from './pages/general/views/Login';
import ProcesosMisionales from './pages/misionales/views/ProcesosMisionales';
import Habitaciones from './pages/misionales/gestion-habitaciones/views/Habitaciones';
import Reservas from './pages/misionales/gestion-reservas/views/Reservas';
import Incidencias from './pages/misionales/gestion-incidencias/views/Incidencias';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/home" element={<Home />} />
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
