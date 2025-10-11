import React, { useState, useEffect } from 'react';
import ListarBase from '../../listar/ListarBase';

interface Reservation {
  reservation_id: number;
  room_id: number;
  room_number: string;
  guest_id: number;
  guest_name: string;
  user_id: number;
  check_in: string;
  check_out: string;
  status: 'CONFIRMADO' | 'CANCELADO' | 'COMPLETADO' | 'PENDIENTE' | 'NO_SHOW';
  created_at: string;
}

export default function ListarReservas() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('TODOS');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/reservas');
        if (!response.ok) {
          throw new Error('Error al cargar las reservas');
        }
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    let result = [...reservations];

    if (filterStatus !== 'TODOS') {
      result = result.filter(reservation => reservation.status === filterStatus);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(reservation =>
        reservation.guest_name.toLowerCase().includes(term) ||
        reservation.room_number.toLowerCase().includes(term)
      );
    }

    setFilteredReservations(result);
  }, [reservations, filterStatus, searchTerm]);

  const handleCancelReservation = async (reservationId: number) => {
    try {
      const response = await fetch(`/api/reservas/${reservationId}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'CANCELADO' }),
      });

      if (!response.ok) {
        throw new Error('Error al cancelar la reserva');
      }

      setReservations(reservations.filter(reservation => reservation.reservation_id !== reservationId));
    } catch (error) {
      console.error('Error canceling reservation:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <ListarBase title="Listado de Reservas">
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-white mb-1">Buscar</label>
          <input
            type="text"
            placeholder="Nombre de huésped o habitación..."
            className="w-full p-2 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-white mb-1">Filtrar por estado</label>
          <select
            className="w-full p-2 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="TODOS">Todos</option>
            <option value="CONFIRMADO">Confirmado</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="COMPLETADO">Completado</option>
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
                <tr key={reservation.reservation_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{reservation.room_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{reservation.guest_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(reservation.check_in).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(reservation.check_out).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      reservation.status === 'CONFIRMADO' ? 'bg-green-500 text-white' :
                      reservation.status === 'CANCELADO' ? 'bg-red-500 text-white' :
                      reservation.status === 'COMPLETADO' ? 'bg-blue-500 text-white' :
                      reservation.status === 'PENDIENTE' ? 'bg-yellow-500 text-gray-900' :
                      'bg-gray-500 text-white'
                    }`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {reservation.status !== 'CANCELADO' && (
                      <button
                        onClick={() => handleCancelReservation(reservation.reservation_id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Cancelar
                      </button>
                    )}
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
