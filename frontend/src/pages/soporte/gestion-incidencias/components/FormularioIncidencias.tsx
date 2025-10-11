// src/pages/misionales/gestion-incidencias/components/FormularioIncidencias.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormularioIncidencias() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tipo: "",
    area: "",
    habitacion: "",
    descripcion: "",
    prioridad: "media",
    equipo: "",
    fecha: new Date().toISOString().slice(0, 16),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/incidencias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          estado: "pendiente" // Estado inicial según la documentación
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al reportar la incidencia");
      }

      setSuccess(true);
      setFormData({
        tipo: "",
        area: "",
        habitacion: "",
        descripcion: "",
        prioridad: "media",
        equipo: "",
        fecha: new Date().toISOString().slice(0, 16),
      });

      // Redirigir a la lista de incidencias después de 2 segundos
      setTimeout(() => {
        navigate('/procesos-misionales/incidencias?tab=listar');
      }, 2000);

    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "Ocurrió un error al enviar el formulario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-800 rounded-lg shadow-lg text-white border border-gray-700">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Reportar Incidencia</h2>

      {error && (
        <div className="p-3 bg-red-800 text-red-100 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-800 text-green-100 rounded">
          Incidencia reportada con éxito. Redirigiendo...
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-white">Tipo de Incidencia</label>
        <select
          value={formData.tipo}
          onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          required
        >
          <option value="" className="bg-gray-700">Selecciona un tipo</option>
          <option value="mantenimiento" className="bg-gray-700">Mantenimiento</option>
          <option value="limpieza" className="bg-gray-700">Limpieza</option>
          <option value="ruido" className="bg-gray-700">Ruido</option>
          <option value="daño_mobiliario" className="bg-gray-700">Daño en mobiliario</option>
          <option value="fuga_agua" className="bg-gray-700">Fuga de agua</option>
          <option value="electricidad" className="bg-gray-700">Problema eléctrico</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Área Afectada</label>
        <select
          value={formData.area}
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          required
        >
          <option value="" className="bg-gray-700">Selecciona un área</option>
          <option value="habitacion" className="bg-gray-700">Habitación</option>
          <option value="baño" className="bg-gray-700">Baño</option>
          <option value="pasillo" className="bg-gray-700">Pasillo</option>
          <option value="area_comun" className="bg-gray-700">Área común</option>
          <option value="cocina" className="bg-gray-700">Cocina</option>
          <option value="ascensor" className="bg-gray-700">Ascensor</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Número de Habitación/Área</label>
        <input
          type="text"
          value={formData.habitacion}
          onChange={(e) => setFormData({ ...formData, habitacion: e.target.value })}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          placeholder="Ej: 101, Pasillo del 3er piso"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Descripción</label>
        <textarea
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Prioridad</label>
        <select
          value={formData.prioridad}
          onChange={(e) => setFormData({ ...formData, prioridad: e.target.value })}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
        >
          <option value="baja" className="bg-gray-700">Baja</option>
          <option value="media" className="bg-gray-700">Media</option>
          <option value="alta" className="bg-gray-700">Alta</option>
          <option value="critica" className="bg-gray-700">Crítica</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Equipo Responsable</label>
        <select
          value={formData.equipo}
          onChange={(e) => setFormData({ ...formData, equipo: e.target.value })}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          required
        >
          <option value="" className="bg-gray-700">Selecciona un equipo</option>
          <option value="mantenimiento" className="bg-gray-700">Mantenimiento</option>
          <option value="limpieza" className="bg-gray-700">Limpieza</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Fecha y Hora</label>
        <input
          type="datetime-local"
          value={formData.fecha}
          onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-3 bg-yellow-400 text-gray-900 font-bold rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Procesando...' : 'Reportar Incidencia'}
      </button>
    </form>
  );
}