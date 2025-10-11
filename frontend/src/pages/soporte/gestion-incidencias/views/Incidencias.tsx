// src/pages/misionales/gestion-incidencias/views/Incidencias.tsx
import { useState, useEffect } from "react";
import FormularioIncidencias from "../components/FormularioIncidencias";

interface Incidencia {
  id: number;
  tipo: string;
  area: string;
  habitacion: string;
  descripcion: string;
  prioridad: string;
  equipo: string;
  fecha: string;
  estado: "pendiente" | "en_proceso" | "resuelta";
}

export default function Incidencias() {
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [filtro, setFiltro] = useState({
    equipo: "",
    estado: "",
  });
  const [activeTab, setActiveTab] = useState<"registrar" | "listar">("registrar");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchIncidencias = async () => {
      setLoading(true);
      try {
        const response = await fetch('${apiBaseUrl}/api/incidencias');
        if (!response.ok) {
          throw new Error('Error al cargar las incidencias');
        }
        const data = await response.json();
        setIncidencias(data);
      } catch (error) {
        console.error('Error fetching incidencias:', error);
        setError('No se pudieron cargar las incidencias');
      } finally {
        setLoading(false);
      }
    };

    fetchIncidencias();
  }, []);

  const handleChangeEstado = async (incidenciaId: number, nuevoEstado: Incidencia['estado']) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/incidencias/${incidenciaId}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el estado de la incidencia');
      }

      // Actualizar el estado localmente
      setIncidencias(incidencias.map(incidencia =>
        incidencia.id === incidenciaId ? { ...incidencia, estado: nuevoEstado } : incidencia
      ));
    } catch (error) {
      console.error('Error updating incidencia status:', error);
      setError('No se pudo actualizar el estado de la incidencia');
    }
  };

  const incidenciasFiltradas = incidencias.filter((incidencia) => {
    return (
      (filtro.equipo ? incidencia.equipo === filtro.equipo : true) &&
      (filtro.estado ? incidencia.estado === filtro.estado : true)
    );
  });

  // Función para formatear el estado con colores
  const getEstadoStyle = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return "text-yellow-400";
      case "en_proceso":
        return "text-blue-400";
      case "resuelta":
        return "text-green-400";
      default:
        return "text-white";
    }
  };

  // Función para formatear la prioridad con colores
  const getPrioridadStyle = (prioridad: string) => {
    switch (prioridad.toLowerCase()) {
      case "alta":
        return "text-red-400";
      case "media":
        return "text-yellow-400";
      case "baja":
        return "text-green-400";
      case "critica":
        return "text-purple-400";
      default:
        return "text-white";
    }
  };

  // Función para obtener las opciones de estado según el estado actual
  const getEstadoOptions = (currentEstado: string) => {
    const options = [
      { value: "pendiente", label: "Pendiente" },
      { value: "en_proceso", label: "En proceso" },
      { value: "resuelta", label: "Resuelta" }
    ];

    // Si está resuelta, no permitir cambiar a otro estado
    if (currentEstado === "resuelta") {
      return [{ value: "resuelta", label: "Resuelta" }];
    }

    // Si está en proceso, no permitir volver a pendiente
    if (currentEstado === "en_proceso") {
      return options.filter(opt => opt.value !== "pendiente");
    }

    return options;
  };

  if (loading) {
    return <div className="p-6 bg-gray-800 text-white">Cargando incidencias...</div>;
  }

  return (
    <div className="p-6 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Gestión de Incidencias</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-800 text-red-100 rounded">
          {error}
        </div>
      )}

      <div className="flex mb-6 space-x-4">
        <button
          onClick={() => setActiveTab("registrar")}
          className={`px-4 py-2 rounded-md ${activeTab === "registrar" ? "bg-yellow-400 text-gray-900" : "bg-gray-700 text-white"}`}
        >
          Registrar Incidencia
        </button>
        <button
          onClick={() => setActiveTab("listar")}
          className={`px-4 py-2 rounded-md ${activeTab === "listar" ? "bg-yellow-400 text-gray-900" : "bg-gray-700 text-white"}`}
        >
          Listar Incidencias
        </button>
      </div>

      {activeTab === "registrar" ? (
        <FormularioIncidencias />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Lista de Incidencias</h2>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white">Filtrar por Equipo</label>
              <select
                value={filtro.equipo}
                onChange={(e) => setFiltro({ ...filtro, equipo: e.target.value })}
                className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
              >
                <option value="" className="bg-gray-700">Todos</option>
                <option value="mantenimiento" className="bg-gray-700">Mantenimiento</option>
                <option value="limpieza" className="bg-gray-700">Limpieza</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Filtrar por Estado</label>
              <select
                value={filtro.estado}
                onChange={(e) => setFiltro({ ...filtro, estado: e.target.value })}
                className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
              >
                <option value="" className="bg-gray-700">Todos</option>
                <option value="pendiente" className="bg-gray-700">Pendiente</option>
                <option value="en_proceso" className="bg-gray-700">En proceso</option>
                <option value="resuelta" className="bg-gray-700">Resuelta</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Área</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Habitación</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Descripción</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Prioridad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Equipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {incidenciasFiltradas.length > 0 ? (
                  incidenciasFiltradas.map((incidencia) => (
                    <tr key={incidencia.id} className="hover:bg-gray-600">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{incidencia.tipo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{incidencia.area}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{incidencia.habitacion}</td>
                      <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate" title={incidencia.descripcion}>
                        {incidencia.descripcion}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getPrioridadStyle(incidencia.prioridad)}`}>
                        {incidencia.prioridad}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{incidencia.equipo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(incidencia.fecha).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoStyle(incidencia.estado)}`}>
                          {incidencia.estado.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <select
                          value={incidencia.estado}
                          onChange={(e) => handleChangeEstado(incidencia.id, e.target.value as Incidencia['estado'])}
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            incidencia.estado === 'pendiente' ? 'bg-yellow-500 text-gray-900' :
                            incidencia.estado === 'en_proceso' ? 'bg-blue-500 text-white' :
                            'bg-green-500 text-white'
                          }`}
                          disabled={incidencia.estado === 'resuelta'}
                        >
                          {getEstadoOptions(incidencia.estado).map(option => (
                            <option key={option.value} value={option.value} className="bg-gray-700">
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-sm text-gray-300">
                      No se encontraron incidencias
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}