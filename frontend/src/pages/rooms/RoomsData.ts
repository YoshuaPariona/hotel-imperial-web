// src/pages/rooms/RoomData.ts
export type Estado = "DISPONIBLE" | "OCUPADA" | "MANTENIMIENTO" | "RESERVADA";

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

export const estadosPosibles: Estado[] = ["DISPONIBLE", "OCUPADA", "MANTENIMIENTO"];

export const getBadgeColor = (estado: Estado): string => {
  switch (estado) {
    case "DISPONIBLE":
      return "bg-blue-600 hover:bg-blue-700";
    case "OCUPADA":
      return "bg-gray-500 hover:bg-gray-600";
    case "MANTENIMIENTO":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

export const getBedInfo = (habitacion: Habitacion): string => {
  if (habitacion.roomTypeCategory === "MATRIMONIAL") {
    return habitacion.roomTypeBedSize || "N/A";
  } else {
    return habitacion.roomTypeBedQuantity ? `${habitacion.roomTypeBedQuantity} camas` : "N/A";
  }
};
