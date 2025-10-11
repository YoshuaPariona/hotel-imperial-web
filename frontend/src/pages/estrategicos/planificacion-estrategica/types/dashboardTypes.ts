// src/views/estratégicos/planificacion-estrategica/types/dashboardTypes.ts
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

export interface ReservationStatusStats {
  CONFIRMADO?: number;
  PENDIENTE?: number;
  COMPLETADO?: number;
  CANCELADO?: number;
  NO_SHOW?: number;
  [key: string]: number | undefined;
}

export interface IncidentTypeStats {
  MANTENIMIENTO?: number;
  LIMPIEZA?: number;
  RUIDO?: number;
  DETERIORO_MOBILIARIO?: number;
  FUGA_AGUA?: number;
  ELECTRICIDAD?: number;
  [key: string]: number | undefined;
}
