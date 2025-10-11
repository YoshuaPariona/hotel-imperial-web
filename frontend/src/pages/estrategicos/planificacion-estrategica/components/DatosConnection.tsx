// src/views/estratégicos/planificacion-estrategica/components/DatosConnection.tsx
import type { RoomTypeStat, ReservationStatusStats, IncidentTypeStats } from '../types/dashboardTypes';

// Datos mock
const mockRoomTypeStats: RoomTypeStat[] = [
  { id: 1, category: 'STANDARD', bedSize: 'SINGLE', bedQuantity: 1, description: 'Habitación estándar con cama individual', total: 20, occupied: 8, reserved: 5 },
  { id: 2, category: 'MATRIMONIAL', bedSize: 'DOUBLE', bedQuantity: 1, description: 'Habitación matrimonial con cama doble', total: 15, occupied: 10, reserved: 3 },
];

const mockReservationStats: ReservationStatusStats = {
  CONFIRMADO: 12,
  PENDIENTE: 5,
  COMPLETADO: 8,
  CANCELADO: 2,
};

const mockIncidentStats: IncidentTypeStats = {
  MANTENIMIENTO: 12,
  LIMPIEZA: 8,
  RUIDO: 5,
  DETERIORO_MOBILIARIO: 7,
  FUGA_AGUA: 3,
  ELECTRICIDAD: 4,
};

export const fetchRoomTypeStats = async (): Promise<RoomTypeStat[]> => {
  try {
    const response = await fetch('${apiBaseUrl}/api/room-types/stats');
    if (!response.ok) {
      console.error('Error en la respuesta de room-types/stats:', response.status);
      return mockRoomTypeStats;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching room type stats:', error);
    return mockRoomTypeStats;
  }
};

export const fetchIncidentStats = async (): Promise<IncidentTypeStats> => {
  try {
    const response = await fetch('${apiBaseUrl}/api/incidents/stats');
    if (!response.ok) {
      console.error('Error en la respuesta de incidents/stats:', response.status);
      return mockIncidentStats;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching incident stats:', error);
    return mockIncidentStats;
  }
};

export const fetchReservationStats = async (): Promise<ReservationStatusStats> => {
  try {
    const response = await fetch('${apiBaseUrl}/api/reservations/stats');
    if (!response.ok) {
      console.error('Error en la respuesta de reservations/stats:', response.status);
      return mockReservationStats;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching reservation stats:', error);
    return mockReservationStats;
  }
};
