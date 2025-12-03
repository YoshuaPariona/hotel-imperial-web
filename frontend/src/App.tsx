import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@components/layout/Layout.tsx";
import { Dashboard } from "@pages/dashboard/Dashboard.tsx";
import { FC } from "react";
import { Quality } from "@pages/quality/Quality";
import { Insights } from "@pages/insights/Insights";
import { Reservations } from "@pages/reservations/Reservations";
import { Occupancy } from "@pages/occupancy/Occupancy";
import { Guest } from "@pages/guests/Guest";
import { Payments } from "@pages/payments/Payments";
import { Profile } from "@pages/profile/Profile";
import { Preferences } from "@pages/preferences/Preferences";
import { Incidents } from "@pages/incidents/Incidents";
import { Auth } from "@pages/auth/Auth";
import { RoomsPage } from "@pages/rooms/RoomsPage";
import { AuthProvider } from "@/contexts/AuthContext";
import { PrivateRoute } from "@/components/auth/PrivateRoute";

const App: FC = () => (
    <AuthProvider>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/incidencias" element={<Incidents />} />
                    <Route path="/insights" element={<Insights />} />
                    <Route path="/habitaciones" element={<RoomsPage />} />
                    <Route path="/calidad" element={<Quality />} />
                    <Route path="/reservas" element={<Reservations />} />
                    <Route path="/ocupacion" element={<Occupancy />} />
                    <Route path="/huespedes" element={<Guest />} />
                    <Route path="/pagos" element={<Payments />} />
                    <Route path="/perfil" element={<Profile />} />
                    <Route path="/ajustes" element={<Preferences />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
        />
      </Routes>
    </AuthProvider>
);

export default App;
