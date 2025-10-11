import { useNavigate } from "react-router-dom";
import ListadoHabitacion from "../components/ListadoHabitacion";

export default function Habitaciones() {
  const navigate = useNavigate();

  const handleRegistrarIngreso = () => {
    navigate('/procesos-misionales/registro/ingreso');
  };

  return (
    <div className="p-6">
      <button
        onClick={handleRegistrarIngreso}
        className="px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-md hover:bg-yellow-500 transition duration-200 mb-6"
      >
        Registrar Ingreso
      </button>
      <ListadoHabitacion />
    </div>
  );
}