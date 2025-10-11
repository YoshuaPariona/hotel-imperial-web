// src/views/estratégicos/planificacion-estrategica/components/DatosEjecutivo.tsx
export interface RoomType {
  id: number;
  category: 'STANDARD' | 'MATRIMONIAL';
  bedSize: 'SINGLE' | 'DOUBLE';
  bedQuantity: number;
  description: string;
}

export interface Room {
  id: number;
  roomNumber: string;
  roomTypeId: number;
  floor: number;
  capacity: number;
  currentStatus: 'DISPONIBLE' | 'RESERVADA' | 'OCUPADA' | 'MANTENIMIENTO' | 'LIMPIEZA';
}

export interface Reservation {
  id: number;
  roomId: number;
  userId: number;
  guestId: number;
  checkIn: string;
  checkOut: string;
  status: 'CONFIRMADO' | 'CANCELADO' | 'COMPLETADO' | 'PENDIENTE' | 'NO_SHOW';
}

export interface Incident {
  id: number;
  type: 'MANTENIMIENTO' | 'LIMPIEZA' | 'RUIDO' | 'DETERIORO_MOBILIARIO' | 'FUGA_AGUA' | 'ELECTRICIDAD';
  area: 'HABITACION' | 'LAVABO' | 'PASILLO' | 'AREA_COMUN' | 'COCINA' | 'ASCENSOR';
  priority: 'BAJA' | 'MEDIA' | 'ALTA' | 'CRITICA';
  status: 'PENDIENTE' | 'EN_PROCESO' | 'RESUELTA';
  reportedAt: string;
}

export interface RoomTypeStat {
  id: number;
  category: 'STANDARD' | 'MATRIMONIAL';
  bedSize: 'SINGLE' | 'DOUBLE';
  bedQuantity: number;
  description: string;
  total: number;
  occupied: number;
  reserved: number;
}

export const mockRoomTypes: RoomType[] = [
  { id: 1, category: 'STANDARD', bedSize: 'SINGLE', bedQuantity: 1, description: 'Habitación estándar con cama individual' },
  { id: 2, category: 'MATRIMONIAL', bedSize: 'DOUBLE', bedQuantity: 1, description: 'Habitación matrimonial con cama doble' },
];

export const mockRooms: Room[] = [
  { id: 1, roomNumber: '101', roomTypeId: 1, floor: 1, capacity: 2, currentStatus: 'DISPONIBLE' },
  { id: 2, roomNumber: '102', roomTypeId: 1, floor: 1, capacity: 2, currentStatus: 'RESERVADA' },
  { id: 3, roomNumber: '201', roomTypeId: 2, floor: 2, capacity: 2, currentStatus: 'OCUPADA' },
  { id: 4, roomNumber: '202', roomTypeId: 2, floor: 2, capacity: 2, currentStatus: 'MANTENIMIENTO' },
];

export const mockReservations: Reservation[] = [
  { id: 1, roomId: 1, userId: 1, guestId: 1, checkIn: '2025-10-15', checkOut: '2025-10-20', status: 'CONFIRMADO' },
  { id: 2, roomId: 2, userId: 2, guestId: 2, checkIn: '2025-10-16', checkOut: '2025-10-18', status: 'COMPLETADO' },
  { id: 3, roomId: 3, userId: 3, guestId: 3, checkIn: '2025-10-17', checkOut: '2025-10-22', status: 'PENDIENTE' },
];

export const mockIncidents: Incident[] = [
  { id: 1, type: 'MANTENIMIENTO', area: 'HABITACION', priority: 'ALTA', status: 'PENDIENTE', reportedAt: '2025-10-01' },
  { id: 2, type: 'LIMPIEZA', area: 'LAVABO', priority: 'MEDIA', status: 'RESUELTA', reportedAt: '2025-10-05' },
  { id: 3, type: 'ELECTRICIDAD', area: 'PASILLO', priority: 'CRITICA', status: 'EN_PROCESO', reportedAt: '2025-10-08' },
];

export const getDashboardData = () => {
  const roomTypeStats: RoomTypeStat[] = mockRoomTypes.map((type: RoomType) => {
    const rooms = mockRooms.filter((r: Room) => r.roomTypeId === type.id);
    const occupied = rooms.filter((r: Room) => r.currentStatus === 'OCUPADA').length;
    const reserved = rooms.filter((r: Room) => r.currentStatus === 'RESERVADA').length;
    return { ...type, total: rooms.length, occupied, reserved };
  });

  const incidentTypeStats = mockIncidents.reduce((acc: Record<string, number>, incident: Incident) => {
    acc[incident.type] = (acc[incident.type] || 0) + 1;
    return acc;
  }, {});

  const reservationStatusStats = mockReservations.reduce((acc: Record<string, number>, reservation: Reservation) => {
    acc[reservation.status] = (acc[reservation.status] || 0) + 1;
    return acc;
  }, {});

  return {
    roomTypeStats,
    incidentTypeStats,
    reservationStatusStats,
  };
};
