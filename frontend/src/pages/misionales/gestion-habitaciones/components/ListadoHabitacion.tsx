// src/pages/misionales/gestion-habitaciones/components/ListadoHabitacion.tsx
import { useState, useEffect } from "react";

interface Habitacion {
  id: number;
  numero: string;
  estado: string;
  descripcion: string;
}

export default function ListadoHabitacion() {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [filtro, setFiltro] = useState({
    estado: "",
    numeroMin: "",
    numeroMax: "",
  });

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await fetch("/api/habitaciones");
        const data = await response.json();
        setHabitaciones(data);
      } catch (error) {
        console.error("Error al cargar las habitaciones:", error);
      }
    };
    fetchHabitaciones();
  }, []);

  const habitacionesFiltradas = habitaciones.filter((habitacion) => {
    return (
      (filtro.estado ? habitacion.estado === filtro.estado : true) &&
      (filtro.numeroMin ? parseInt(habitacion.numero) >= parseInt(filtro.numeroMin) : true) &&
      (filtro.numeroMax ? parseInt(habitacion.numero) <= parseInt(filtro.numeroMax) : true)
    );
  });

  return (
    <div className="p-6 bg-gray-800 text-white">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">Lista de Habitaciones</h2>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-white">Filtrar por Estado</label>
          <select
            value={filtro.estado}
            onChange={(e) => setFiltro({ ...filtro, estado: e.target.value })}
            className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          >
            <option value="" className="bg-gray-700">Todos</option>
            <option value="Libre" className="bg-gray-700">Libre</option>
            <option value="Ocupado" className="bg-gray-700">Ocupado</option>
            <option value="Reservado" className="bg-gray-700">Reservado</option>
            <option value="En limpieza/mantenimiento" className="bg-gray-700">En limpieza/mantenimiento</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Número Mínimo</label>
          <input
            type="number"
            value={filtro.numeroMin}
            onChange={(e) => setFiltro({ ...filtro, numeroMin: e.target.value })}
            className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            placeholder="Mínimo"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Número Máximo</label>
          <input
            type="number"
            value={filtro.numeroMax}
            onChange={(e) => setFiltro({ ...filtro, numeroMax: e.target.value })}
            className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            placeholder="Máximo"
            min="0"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded-lg">
          <thead className="bg-gray-800">
            <tr>
              <th className="py-3 px-4 text-left">Número</th>
              <th className="py-3 px-4 text-left">Estado</th>
              <th className="py-3 px-4 text-left">Descripción</th>
              <th className="py-3 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {habitacionesFiltradas.map((habitacion) => (
              <tr key={habitacion.id} className="border-t border-gray-600 hover:bg-gray-600">
                <td className="py-3 px-4">{habitacion.numero}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    habitacion.estado === 'Libre' ? 'bg-green-500' :
                    habitacion.estado === 'Ocupado' ? 'bg-red-500' :
                    habitacion.estado === 'Reservado' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}>
                    {habitacion.estado}
                  </span>
                </td>
                <td className="py-3 px-4">{habitacion.descripcion}</td>
                <td className="py-3 px-4 space-x-2">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-3 py-1 rounded text-sm">
                    Editar
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm">
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
