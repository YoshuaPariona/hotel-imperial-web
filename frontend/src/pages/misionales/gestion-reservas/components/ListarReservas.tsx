import { useState, useEffect } from 'react';
import ListarBase from '../../listar/ListarBase';

interface Reservation {
  id: number;               // Ajusta a reservation_id si tu API usa snake_case
  roomId: number;           // Ajusta a room_id si tu API usa snake_case
  roomNumber: string;       // Ajusta a room_number si tu API usa snake_case
  guestId: number;          // Ajusta a guest_id si tu API usa snake_case
  guestName: string;        // Ajusta a guest_name si tu API usa snake_case
  userId: number;           // Ajusta a user_id si tu API usa snake_case
  checkIn: string;          // Ajusta a check_in si tu API usa snake_case
  checkOut: string;         // Ajusta a check_out si tu API usa snake_case
  status: 'CONFIRMADO' | 'CANCELADO' | 'COMPLETADO' | 'PENDIENTE';
  createdAt: string;        // Ajusta a created_at si tu API usa snake_case
}

export default function ListarReservas() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('TODOS');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchType, setSearchType] = useState<'guest' | 'room'>('guest');
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = import.meta.env.VITE_API_URL;
  // ✅ Cargar reservas al montar el componente (usando proxy de Vite)
  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiBaseUrl}/api/reservas`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al cargar las reservas: ${response.status} ${errorText}`);
        }
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError('No se pudieron cargar las reservas');
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  // 🔹 Filtros dinámicos
  useEffect(() => {
    let result = [...reservations];
    if (filterStatus !== 'TODOS') {
      result = result.filter((r) => r.status === filterStatus);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = searchType === 'guest'
        ? result.filter((r) => r.guestName.toLowerCase().includes(term))
        : result.filter((r) => r.roomNumber.toLowerCase().includes(term));
    }
    setFilteredReservations(result);
  }, [reservations, filterStatus, searchTerm, searchType]);

  // 🔹 Función para cancelar reserva (comentada temporalmente)
  /*
  const handleCancelReservation = async (reservationId: number) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/reservas/${reservationId}/estado`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CANCELADO' }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al cancelar la reserva: ${response.status} ${errorText}`);
      }
      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservationId ? { ...r, status: 'CANCELADO' } : r
        )
      );
    } catch (error) {
      console.error('Error canceling reservation:', error);
      setError('No se pudo cancelar la reserva');
    }
  };
  */

  if (loading) return <div>Cargando...</div>;

  return (
    <ListarBase title="Listado de Reservas">
      {error && (
        <div className="mb-4 p-3 bg-red-800 text-red-100 rounded">
          {error}
        </div>
      )}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Selector de tipo de búsqueda */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">Buscar por</label>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as 'guest' | 'room')}
            className="w-full p-2 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          >
            <option value="guest" className="bg-gray-700">Nombre de Huésped</option>
            <option value="room" className="bg-gray-700">Número de Habitación</option>
          </select>
        </div>
        {/* Campo de búsqueda */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            {searchType === 'guest' ? 'Nombre de Huésped' : 'Número de Habitación'}
          </label>
          <input
            type="text"
            placeholder={searchType === 'guest' ? 'Ej: Juan Pérez' : 'Ej: 101'}
            className="w-full p-2 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Filtro por estado */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">Estado</label>
          <select
            className="w-full p-2 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="TODOS">Todos</option>
            <option value="CONFIRMADO">Confirmado</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="COMPLETADO">Completado</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Habitación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Huésped</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Entrada</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Salida</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {filteredReservations.length > 0 ? (
              filteredReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {reservation.roomNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {reservation.guestName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(reservation.checkIn).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(reservation.checkOut).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      reservation.status === 'CONFIRMADO' ? 'bg-green-500 text-white' :
                      reservation.status === 'CANCELADO' ? 'bg-red-500 text-white' :
                      reservation.status === 'COMPLETADO' ? 'bg-blue-500 text-white' :
                      'bg-yellow-500 text-gray-900'
                    }`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* Botón cancelar comentado temporalmente */}
                    {/* {reservation.status !== 'CANCELADO' && (
                      <button
                        onClick={() => handleCancelReservation(reservation.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Cancelar
                      </button>
                    )} */}
                    {/* Mensaje informativo */}
                    <span className="text-gray-400 text-xs">Acciones no disponibles</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-300">
                  No se encontraron reservas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ListarBase>
  );
}
