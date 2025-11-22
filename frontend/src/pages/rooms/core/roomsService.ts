// src/pages/rooms/core/roomsService.ts
import { api } from "@/lib/axios";
import { Estado, Habitacion } from "@pages/rooms/core/roomsTypes";

export const getRooms = async (): Promise<Habitacion[]> => {
  const response = await api.get("/rooms");
  // Ensure we always return an array
  const data = response.data;

  // If the response is already an array, return it
  if (Array.isArray(data)) {
    return data;
  }

  // If the response is an object with a 'content' property (paginated response)
  if (data && Array.isArray(data.content)) {
    return data.content;
  }

  // Fallback to empty array if data structure is unexpected
  console.error("Unexpected API response structure:", data);
  return [];
};

export const updateRoomStatus = async (
  roomId: number,
  payload: {
    employeeId: number;
    newStatus: Estado;
    changeReason: string
  }
) => {
  const response = await api.put(`/rooms/${roomId}/status`, payload);
  return response.data;
};
