import { Routes, Route } from "react-router-dom";
import Layout from "@components/layout/Layout.tsx";
import {Dashboard} from "@components/Dashboard.tsx";

function App() {

  return (
      <>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/incidencias" element={<Dashboard />} />
            <Route path="/insights" element={<Dashboard />} />
            <Route path="/habitaciones" element={<Dashboard />} />
            <Route path="/reservas" element={<Dashboard />} />
            <Route path="/ocupacion" element={<Dashboard />} />
            <Route path="/huespedes" element={<Dashboard />} />
            <Route path="/pagos" element={<Dashboard />} />
            <Route path="/perfil" element={<Dashboard />} />
            <Route path="/ajustes" element={<Dashboard />} />
            <Route path="/logout" element={<Dashboard />} />
          </Routes>
        </Layout>
      </>
  )
}

export default App;
