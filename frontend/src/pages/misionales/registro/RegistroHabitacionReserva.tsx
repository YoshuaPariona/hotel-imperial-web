// src/pages/misionales/registro/RegistroHabitacionReserva.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
/*
interface Guest {
  guest_id?: number;
  first_name: string;
  last_name: string;
  doc_type: string;
  document_number: string;
  phone?: string;
  email?: string;
}
*/
interface Room {
  room_id: number;
  room_number: string;
}

export default function RegistroHabitacionReserva() {
  const { mode } = useParams<{ mode: 'reserva' | 'ingreso' }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    guest: {
      first_name: "",
      last_name: "",
      doc_type: "",
      document_number: "",
      phone: "",
      email: ""
    },
    room_number: "",
    check_in: "",
    check_out: mode === 'reserva' ? "" : undefined,
    status: mode === 'reserva' ? 'CONFIRMADO' : 'OCUPADA'
  });

  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = import.meta.env.VITE_API_URL;

  // Obtener habitaciones disponibles
  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        const response = await fetch('${apiBaseUrl}/api/habitaciones?current_status=DISPONIBLE');
        if (!response.ok) {
          throw new Error('Error al cargar las habitaciones disponibles');
        }
        const data = await response.json();
        setAvailableRooms(data);
      } catch (error) {
        console.error('Error fetching available rooms:', error);
        setError('No se pudieron cargar las habitaciones disponibles');
      }
    };

    fetchAvailableRooms();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name in formData.guest) {
      setFormData(prev => ({
        ...prev,
        guest: {
          ...prev.guest,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Primero registrar al huésped si no existe
      let guestId = 0;
      const guestResponse = await fetch('${apiBaseUrl}/api/huespedes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.guest),
      });

      if (!guestResponse.ok) {
        throw new Error('Error al registrar al huésped');
      }

      const guestData = await guestResponse.json();
      guestId = guestData.guest_id;

      // Buscar la habitación seleccionada
      const selectedRoom = availableRooms.find(room => room.room_number === formData.room_number);
      if (!selectedRoom) {
        throw new Error('Habitación no encontrada');
      }

      // Registrar la reserva o ingreso
      const reservationData = {
        room_id: selectedRoom.room_id,
        guest_id: guestId,
        check_in: formData.check_in,
        check_out: formData.check_out,
        status: formData.status
      };

      const reservationResponse = await fetch('${apiBaseUrl}/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!reservationResponse.ok) {
        throw new Error('Error al registrar la reserva/ingreso');
      }

      // Actualizar el estado de la habitación
      const roomStatus = mode === 'reserva' ? 'RESERVADA' : 'OCUPADA';
      await fetch(`${apiBaseUrl}/api/habitaciones/${selectedRoom.room_id}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: roomStatus }),
      });

      // Redirigir según el modo
      navigate(mode === 'reserva' ? '/procesos-misionales/reservas' : '/procesos-misionales/gestion-habitaciones');

    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Ocurrió un error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">
        {mode === 'reserva' ? 'Registrar Reserva' : 'Registrar Ingreso'}
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-800 text-red-100 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-800 rounded-lg shadow-lg text-white border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white">Nombre del Huésped</label>
            <input
              type="text"
              name="first_name"
              value={formData.guest.first_name}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Apellido del Huésped</label>
            <input
              type="text"
              name="last_name"
              value={formData.guest.last_name}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white">Tipo de Documento</label>
            <select
              name="doc_type"
              value={formData.guest.doc_type}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
              required
            >
              <option value="">Selecciona un tipo</option>
              <option value="DNI">DNI</option>
              <option value="PASAPORTE">Pasaporte</option>
            </select>
          </div>

          {formData.guest.doc_type && (
            <div>
              <label className="block text-sm font-medium text-white">
                Número de {formData.guest.doc_type}
              </label>
              <input
                type="text"
                name="document_number"
                value={formData.guest.document_number}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
                placeholder={`Ingrese el número de ${formData.guest.doc_type}`}
                required
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white">Teléfono</label>
            <input
              type="text"
              name="phone"
              value={formData.guest.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.guest.email}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Habitación</label>
          <select
            name="room_number"
            value={formData.room_number}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            required
          >
            <option value="">Selecciona una habitación</option>
            {availableRooms.map(room => (
              <option key={room.room_id} value={room.room_number}>
                {room.room_number}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white">Fecha de Entrada</label>
            <input
              type="datetime-local"
              name="check_in"
              value={formData.check_in}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
              required
            />
          </div>

          {mode === 'reserva' && (
            <div>
              <label className="block text-sm font-medium text-white">Fecha de Salida</label>
              <input
                type="datetime-local"
                name="check_out"
                value={formData.check_out || ""}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
                required
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-yellow-400 text-gray-900 font-bold rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Procesando...' : (mode === 'reserva' ? 'Registrar Reserva' : 'Registrar Ingreso')}
        </button>
      </form>
    </div>
  );
}