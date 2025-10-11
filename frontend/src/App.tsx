import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GeneralLayout from './layouts/GeneralLayout';
import Home from './pages/general/views/Home';
import Login from './pages/general/views/Login';
import ProcesosMisionales from './pages/misionales/views/ProcesosMisionales';
import Habitaciones from './pages/misionales/gestion-habitaciones/views/Habitaciones';
import Reservas from './pages/misionales/gestion-reservas/views/Reservas';
import ProcesosGenerales from './pages/estrategicos/views/StrategicProcesses';
import RegistroHabitacionReserva from './pages/misionales/registro/RegistroHabitacionReserva';
import ViewDashboards from './pages/estrategicos/planificacion-estrategica/views/ViewDashboards';
import ProcesosSoporte from './pages/soporte/views/ProcesosSoporte';
import Incidencias from './pages/soporte/gestion-incidencias/views/Incidencias';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/*" element={<GeneralLayout />}>
        {/* Rutas para procesos misionales */}
        <Route path="procesos-misionales" element={<ProcesosMisionales />}>
          <Route path="gestion-habitaciones" element={<Habitaciones />} />
          <Route path="reservas" element={<Reservas />} />
          <Route path="incidencias" element={<Incidencias />} />
          <Route path="registro/:mode" element={<RegistroHabitacionReserva />} />
        </Route>
        {/* Ruta para procesos de soporte */}
        <Route path="procesos-soporte" element={<ProcesosSoporte />}>
          <Route path="incidencias" element={<Incidencias />} />
        </Route>
        {/* Ruta para planificación estratégica */}
        <Route path="procesos-generales" element={<ProcesosGenerales />}>
          <Route path="planificacion-estrategica" element={<ViewDashboards />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;



