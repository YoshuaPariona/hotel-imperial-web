// src/pages/rooms/core/roomsService.ts
import { api } from "@/lib/axios";
import { Estado, Habitacion } from "@pages/rooms/core/roomsTypes";

export const getRooms = async (): Promise<Habitacion[]> => {
  const response = await api.get("/rooms");
  return response.data;
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
