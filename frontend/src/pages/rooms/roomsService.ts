import axios from "axios";
import {Estado, Habitacion} from "@pages/rooms/roomsTypes";

const API_URL = "http://localhost:8080/rooms";

export const getRooms = async (): Promise<Habitacion[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateRoomStatus = async (
    roomId: number,
    payload: { employeeId: number; newStatus: Estado; changeReason: string }
) => {
  await axios.put(`${API_URL}/${roomId}/status`, payload);
};