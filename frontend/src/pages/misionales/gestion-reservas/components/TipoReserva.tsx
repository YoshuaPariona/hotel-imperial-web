// src/pages/misionales/gestion-reservas/components/TipoReserva.tsx
import { useNavigate } from "react-router-dom";

export default function TipoReserva() {
  const navigate = useNavigate();

  const handleRegistrarReserva = () => {
    navigate('/procesos-misionales/registro/reserva');
  };

  return (
    <button
      onClick={handleRegistrarReserva}
      className="w-full px-4 py-3 bg-yellow-400 text-gray-900 font-bold rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition duration-200"
    >
      Registrar Reserva
    </button>
  );
}
