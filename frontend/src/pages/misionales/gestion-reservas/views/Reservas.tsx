import { useState, useEffect } from "react";
import TipoReserva from "../components/TipoReserva";

interface Reserva {
  id: number;
  nombreHuesped: string;
  tipoHabitacion: string;
  cantidadCamas: number;
  fechaEntrada: string;
  fechaSalida: string;
  estado: "confirmada" | "cancelada" | "completada";
  correo: string;
  telefono: string;
}

export default function Reservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filtro, setFiltro] = useState({
    estado: "",
    tipoHabitacion: "",
  });
  const [activeTab, setActiveTab] = useState<"registrar" | "listar">("registrar");

  useEffect(() => {
    const fetchReservas = async () => {
      const response = await fetch("/api/reservas");
      const data = await response.json();
      setReservas(data);
    };
    fetchReservas();
  }, []);

  const handleCancelar = async (id: number) => {
    try {
      const response = await fetch(`/api/reservas/${id}/cancelar`, {
        method: "PATCH",
      });
      if (response.ok) {
        setReservas(reservas.map((r) => (r.id === id ? { ...r, estado: "cancelada" } : r)));
      }
    } catch (error) {
      console.error("Error al cancelar:", error);
    }
  };

  const reservasFiltradas = reservas.filter((reserva) => {
    return (
      (filtro.estado ? reserva.estado === filtro.estado : true) &&
      (filtro.tipoHabitacion ? reserva.tipoHabitacion === filtro.tipoHabitacion : true)
    );
  });

  return (
    <div className="p-6 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Gestión de Reservas</h1>
      <div className="flex mb-6 space-x-4">
        <button
          onClick={() => setActiveTab("registrar")}
          className={`px-4 py-2 rounded-md ${activeTab === "registrar" ? "bg-yellow-400 text-gray-900" : "bg-gray-700 text-white"}`}
        >
          Registrar Reserva
        </button>
        <button
          onClick={() => setActiveTab("listar")}
          className={`px-4 py-2 rounded-md ${activeTab === "listar" ? "bg-yellow-400 text-gray-900" : "bg-gray-700 text-white"}`}
        >
          Listar Reservas
        </button>
      </div>
      {activeTab === "registrar" ? (
        <TipoReserva />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Lista de Reservas</h2>
          <div className="mb-6 grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white">Filtrar por Estado</label>
              <select
                value={filtro.estado}
                onChange={(e) => setFiltro({ ...filtro, estado: e.target.value })}
                className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
              >
                <option value="" className="bg-gray-700">Todos</option>
                <option value="confirmada" className="bg-gray-700">Confirmadas</option>
                <option value="cancelada" className="bg-gray-700">Canceladas</option>
                <option value="completada" className="bg-gray-700">Completadas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Filtrar por Tipo</label>
              <select
                value={filtro.tipoHabitacion}
                onChange={(e) => setFiltro({ ...filtro, tipoHabitacion: e.target.value })}
                className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
              >
                <option value="" className="bg-gray-700">Todos</option>
                <option value="simple" className="bg-gray-700">Cama simple</option>
                <option value="matrimonial" className="bg-gray-700">Matrimonial</option>
              </select>
            </div>
          </div>
          <ul className="space-y-4">
            {reservasFiltradas.map((reserva) => (
              <li key={reserva.id} className="p-5 border rounded-lg bg-gray-700 text-white border-gray-600 shadow-sm flex justify-between items-center">
                <div>
                  <p className="font-semibold"><strong>Huésped:</strong> {reserva.nombreHuesped}</p>
                  <p><strong>Habitación:</strong> {reserva.tipoHabitacion === "simple" ? "Cama simple" : "Matrimonial"}</p>
                  <p><strong>Camas:</strong> {reserva.cantidadCamas}
                    {reserva.tipoHabitacion === "matrimonial" && reserva.cantidadCamas === 2 ? " (Doble Matrimonial)" : ""}
                  </p>
                  <p><strong>Entrada:</strong> {new Date(reserva.fechaEntrada).toLocaleDateString()}</p>
                  <p><strong>Salida:</strong> {new Date(reserva.fechaSalida).toLocaleDateString()}</p>
                  <p className={`font-semibold ${reserva.estado === "confirmada" ? "text-green-400" : reserva.estado === "cancelada" ? "text-red-400" : "text-blue-400"}`}>
                    <strong>Estado:</strong> {reserva.estado}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleCancelar(reserva.id)}
                    className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}