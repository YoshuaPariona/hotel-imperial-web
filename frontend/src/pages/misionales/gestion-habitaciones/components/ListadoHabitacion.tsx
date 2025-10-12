import { useState, useEffect } from 'react';
import ListarBase from '../../listar/ListarBase';

interface Room {
  id: number;
  roomNumber: string;
  roomTypeCategory: 'STANDARD' | 'MATRIMONIAL';
  currentStatus: 'DISPONIBLE' | 'RESERVADA' | 'OCUPADA' | 'MANTENIMIENTO' | 'LIMPIEZA';
}

export default function ListadoHabitacion() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('TODOS');
  const [filterCategory, setFilterCategory] = useState<string>('TODOS');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const apiBaseUrl = import.meta.env.VITE_API_URL;

  console.log('API base URL:', import.meta.env.VITE_API_URL);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}/api/habitaciones`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al cargar las habitaciones: ${response.status} ${errorText}`);
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    let result = [...rooms];
    if (filterStatus !== 'TODOS') {
      result = result.filter(room => room.currentStatus === filterStatus);
    }
    if (filterCategory !== 'TODOS') {
      result = result.filter(room => room.roomTypeCategory === filterCategory);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(room =>
        room.roomNumber.toLowerCase().includes(term)
      );
    }
    setFilteredRooms(result);
  }, [rooms, filterStatus, filterCategory, searchTerm]);

  const handleStatusChange = async (roomId: number, newStatus: Room['currentStatus']) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/habitaciones/${roomId}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al actualizar el estado: ${response.status} ${errorText}`);
      }
      setRooms(rooms.map(room =>
        room.id === roomId ? { ...room, currentStatus: newStatus } : room
      ));
    } catch (error) {
      console.error('Error updating room status:', error);
    }
  };

  const getRoomTypeDescription = (category: Room['roomTypeCategory']) => {
    return category === 'MATRIMONIAL' ? 'Matrimonial' : 'Standard';
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <ListarBase title="Listado de Habitaciones">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Buscar</label>
          <input
            type="text"
            placeholder="Número de habitación..."
            className="w-full p-2 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Filtrar por estado</label>
          <select
            className="w-full p-2 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="TODOS">Todos</option>
            <option value="DISPONIBLE">Disponible</option>
            <option value="RESERVADA">Reservada</option>
            <option value="OCUPADA">Ocupada</option>
            <option value="MANTENIMIENTO">Mantenimiento</option>
            <option value="LIMPIEZA">Limpieza</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Filtrar por tipo</label>
          <select
            className="w-full p-2 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="TODOS">Todos</option>
            <option value="STANDARD">Standard</option>
            <option value="MATRIMONIAL">Matrimonial</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Número</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <tr key={room.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {room.roomNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {getRoomTypeDescription(room.roomTypeCategory)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    <select
                      value={room.currentStatus}
                      onChange={(e) => handleStatusChange(room.id, e.target.value as Room['currentStatus'])}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        room.currentStatus === 'DISPONIBLE' ? 'bg-green-500 text-white' :
                        room.currentStatus === 'RESERVADA' ? 'bg-yellow-500 text-gray-900' :
                        room.currentStatus === 'OCUPADA' ? 'bg-red-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}
                    >
                      <option value="DISPONIBLE">Disponible</option>
                      <option value="RESERVADA">Reservada</option>
                      <option value="OCUPADA">Ocupada</option>
                      <option value="MANTENIMIENTO">Mantenimiento</option>
                      <option value="LIMPIEZA">Limpieza</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-400 hover:text-indigo-300">Ver Detalles</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-300">
                  No se encontraron habitaciones
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ListarBase>
  );
}
