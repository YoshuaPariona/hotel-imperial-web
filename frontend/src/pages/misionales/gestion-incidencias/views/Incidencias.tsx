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

  useEffect(() => {
    const fetchIncidencias = async () => {
      const response = await fetch("/api/incidencias");
      const data = await response.json();
      setIncidencias(data);
    };
    fetchIncidencias();
  }, []);

  const incidenciasFiltradas = incidencias.filter((incidencia) => {
    return (
      (filtro.equipo ? incidencia.equipo === filtro.equipo : true) &&
      (filtro.estado ? incidencia.estado === filtro.estado : true)
    );
  });

  return (
    <div className="p-6 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Gestión de Incidencias</h1>
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
          <div className="mb-6 grid grid-cols-2 gap-6">
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
          <ul className="space-y-4">
            {incidenciasFiltradas.map((incidencia) => (
              <li key={incidencia.id} className="p-5 border rounded-lg bg-gray-700 text-white border-gray-600 shadow-sm">
                <p><strong>Tipo:</strong> {incidencia.tipo}</p>
                <p><strong>Área:</strong> {incidencia.area}</p>
                <p><strong>Habitación:</strong> {incidencia.habitacion}</p>
                <p><strong>Prioridad:</strong> {incidencia.prioridad}</p>
                <p><strong>Equipo:</strong> {incidencia.equipo}</p>
                <p className={`font-semibold ${incidencia.estado === "pendiente" ? "text-yellow-400" : incidencia.estado === "en_proceso" ? "text-blue-400" : "text-green-400"}`}>
                  <strong>Estado:</strong> {incidencia.estado}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}