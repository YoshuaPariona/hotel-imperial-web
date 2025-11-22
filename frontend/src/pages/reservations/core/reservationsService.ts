// src/pages/reservations/core/reservationsService.ts
import { api } from "@/lib/axios";
import {
    Reservation,
    CreateReservationDTO,
    UpdateReservationDTO,
    CancelReservationDTO,
    Guest,
    Room,
} from "./reservationsTypes";

export const getReservations = async (): Promise<Reservation[]> => {
    const response = await api.get("/reservations");
    return response.data;
};

export const getReservationById = async (id: number): Promise<Reservation> => {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
};

export const createReservation = async (
    data: CreateReservationDTO
): Promise<Reservation> => {
    const response = await api.post("/reservations", data);
    return response.data;
};

export const updateReservation = async (
    id: number,
    data: UpdateReservationDTO
): Promise<Reservation> => {
    const response = await api.put(`/reservations/${id}`, data);
    return response.data;
};

export const cancelReservation = async (
    id: number,
    data: CancelReservationDTO
): Promise<Reservation> => {
    const response = await api.put(`/reservations/${id}/cancel`, data);
    return response.data;
};

export const updateReservationStatus = async (
    id: number,
    status: string
): Promise<Reservation> => {
    const response = await api.put(`/reservations/${id}/status`, { status });
    return response.data;
};

// Helper services for autocomplete
export const searchGuests = async (query: string): Promise<Guest[]> => {
    const response = await api.get("/guests/search", {
        params: { q: query },
    });
    return response.data;
};

export const getAvailableRooms = async (
    checkinDate: string,
    checkoutDate: string
): Promise<Room[]> => {
    const response = await api.get("/rooms/available", {
        params: {
            checkinDate,
            checkoutDate,
        },
    });
    return response.data;
};
