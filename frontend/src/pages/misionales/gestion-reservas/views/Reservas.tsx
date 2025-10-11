import { useNavigate } from "react-router-dom";
import ListarReservas from "../components/ListarReservas";



export default function Reservas() {
  const navigate = useNavigate();

  const handleRegistrarReserva = () => {
    navigate('/procesos-misionales/registro/reserva');
  };

  return (
    <div>
      <button
        onClick={handleRegistrarReserva}
        className="px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-md hover:bg-yellow-500 transition duration-200 mb-6"
      >
        Registrar Reserva
      </button>
      <ListarReservas />
    </div>
  );
}