// src/pages/rooms/RoomData.ts
export type Estado = "DISPONIBLE" | "OCUPADA" | "MANTENIMIENTO";

export interface Habitacion {
  id: number;
  number: string;
  currentStatus: Estado;
  roomTypeCategory: string;
  roomTypeBedSize: string | null;
  roomTypeBedQuantity: number | null;
  amenities: string;
  price: number;
}

export const habitacionesIniciales: Habitacion[] = [
  { id: 1, number: "101", currentStatus: "DISPONIBLE", roomTypeCategory: "MATRIMONIAL", roomTypeBedSize: "SINGLE", roomTypeBedQuantity: null, amenities: "Wi-Fi, TV, Air Conditioning", price: 150 },
  { id: 2, number: "102", currentStatus: "OCUPADA", roomTypeCategory: "MATRIMONIAL", roomTypeBedSize: "DOUBLE", roomTypeBedQuantity: null, amenities: "Wi-Fi, TV, Air Conditioning, Minibar", price: 200 },
  { id: 3, number: "201", currentStatus: "DISPONIBLE", roomTypeCategory: "MATRIMONIAL", roomTypeBedSize: "SINGLE", roomTypeBedQuantity: null, amenities: "Wi-Fi, TV, Air Conditioning, Jacuzzi, Balcón", price: 350 },
  { id: 4, number: "202", currentStatus: "MANTENIMIENTO", roomTypeCategory: "STANDARD", roomTypeBedSize: null, roomTypeBedQuantity: 1, amenities: "Wi-Fi, TV, Air Conditioning, Vista al mar", price: 250 },
  { id: 5, number: "301", currentStatus: "DISPONIBLE", roomTypeCategory: "STANDARD", roomTypeBedSize: null, roomTypeBedQuantity: 2, amenities: "Wi-Fi, TV, Air Conditioning", price: 160 },
  { id: 6, number: "302", currentStatus: "DISPONIBLE", roomTypeCategory: "STANDARD", roomTypeBedSize: null, roomTypeBedQuantity: 3, amenities: "Wi-Fi, TV, Air Conditioning, Minibar", price: 210 },
];

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
