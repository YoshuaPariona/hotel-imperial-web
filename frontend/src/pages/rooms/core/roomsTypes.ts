// src/pages/rooms/core/roomsTypes.ts

export type Estado = "DISPONIBLE" | "OCUPADA" | "MANTENIMIENTO" | "LIMPIEZA";

export interface Habitacion {
  id: number;
  number: string;
  currentStatus: Estado;
  roomTypeCategory: string;
  roomTypeBedSize: string | null;
  roomTypeBedQuantity: number | null;
  amenities: string;
  nightlyRate: number;
}

export const estadosPosibles: Estado[] = [
  "DISPONIBLE",
  "OCUPADA",
  "MANTENIMIENTO",
  "LIMPIEZA",
];
