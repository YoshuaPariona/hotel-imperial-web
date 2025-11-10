import { Routes, Route } from "react-router-dom";
import Layout from "@components/layout/Layout.tsx";
import {Dashboard} from "@components/Dashboard.tsx";

function App() {

  return (
      <>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ia" element={<Dashboard />} />
            <Route path="/rooms" element={<Dashboard />} />
            <Route path="/bookings" element={<Dashboard />} />
            <Route path="/ocupacion" element={<Dashboard />} />
            <Route path="/guests" element={<Dashboard />} />
            <Route path="/payments" element={<Dashboard />} />
            <Route path="/perfil" element={<Dashboard />} />
            <Route path="/ajustes" element={<Dashboard />} />
            <Route path="/logout" element={<Dashboard />} />
          </Routes>
        </Layout>
      </>
  )
}

export default App;
