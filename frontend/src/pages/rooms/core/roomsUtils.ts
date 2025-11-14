// src/pages/rooms/core/roomsUtils.ts
import { Estado, Habitacion } from "./roomsTypes";

export const getBadgeColor = (estado: Estado): string => {
  const colors = {
    DISPONIBLE: "bg-green-500 hover:bg-green-600",
    OCUPADA: "bg-amber-500 hover:bg-amber-600",
    MANTENIMIENTO: "bg-red-600 hover:bg-red-700",
    LIMPIEZA: "bg-blue-500 hover:bg-blue-600",
  } as const;

  return colors[estado];
};

export const formatEstado = (estado: Estado) =>
  estado.replace("_", " ");

export const getBedInfo = (h: Habitacion): string => {
  return h.roomTypeCategory === "MATRIMONIAL"
    ? h.roomTypeBedSize || "N/A"
    : h.roomTypeBedQuantity
    ? `${h.roomTypeBedQuantity} camas`
    : "N/A";
};
