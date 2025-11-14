// src/pages/rooms/roomUtils.ts
import { Estado, Habitacion } from "@pages/rooms/roomsTypes";

export const getBadgeColor = (estado: Estado): string => {
  switch (estado) {
    case "DISPONIBLE":
      return "bg-green-500 hover:bg-green-600";
    case "OCUPADA":
      return "bg-gray-500 hover:bg-gray-600";
    case "MANTENIMIENTO":
      return "bg-red-500 hover:bg-red-600";
    case "LIMPIEZA":
      return "bg-blue-500 hover:bg-blue-600";
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