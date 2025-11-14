import axios from "axios";
import { Habitacion } from "@pages/rooms/RoomsData";

const API_URL = "http://localhost:8080/rooms"; // cámbialo si tu backend usa otro endpoint

export const getRooms = async (): Promise<Habitacion[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateRoomStatus = async (
    roomId: number,
    payload: {
      employeeId: number;
      newStatus: string;
      changeReason: string;
    }
) => {
  await axios.put(`${API_URL}/${roomId}/status`, payload);
};