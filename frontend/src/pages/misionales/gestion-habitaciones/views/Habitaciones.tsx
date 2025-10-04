// src/pages/misionales/gestion-habitaciones/views/RegistroHabitacion.tsx
import { useState } from "react";

export default function RegistroHabitacion() {
  const [habitacion, setHabitacion] = useState({
    numero: "",
    estado: "Libre",
    descripcion: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/habitaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(habitacion),
      });
      if (response.ok) {
        alert("Habitación registrada con éxito");
        setHabitacion({
          numero: "",
          estado: "Libre",
          descripcion: "",
        });
      } else {
        alert("Error al registrar la habitación");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al enviar el formulario");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-800 rounded-lg shadow-lg text-white border border-gray-700">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Registrar Habitación</h2>
      <div>
        <label className="block text-sm font-medium text-white">Número de Habitación</label>
        <input
          type="text"
          value={habitacion.numero}
          onChange={(e) => setHabitacion({ ...habitacion, numero: e.target.value })}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white">Estado</label>
        <select
          value={habitacion.estado}
          onChange={(e) => setHabitacion({ ...habitacion, estado: e.target.value })}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          required
        >
          <option value="Libre" className="bg-gray-700">Libre</option>
          <option value="Ocupado" className="bg-gray-700">Ocupado</option>
          <option value="Reservado" className="bg-gray-700">Reservado</option>
          <option value="En limpieza/mantenimiento" className="bg-gray-700">En limpieza/mantenimiento</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-white">Descripción</label>
        <textarea
          value={habitacion.descripcion}
          onChange={(e) => setHabitacion({ ...habitacion, descripcion: e.target.value })}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-3 bg-yellow-400 text-gray-900 font-bold rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition duration-200"
      >
        Registrar Habitación
      </button>
    </form>
  );
}
