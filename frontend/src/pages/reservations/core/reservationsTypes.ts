// src/pages/reservations/core/reservationsTypes.ts

export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Guest {
    id: number;
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    phone?: string;
    email?: string;
}

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
}

export interface Room {
    id: number;
    number: string;
    roomTypeCategory: string;
    currentStatus: string;
}

export interface Reservation {
    id: number;
    code: string;
    guest: Guest;
    employee: Employee;
    createdAt: string;
    updatedAt: string;
    checkinDateExpected: string;
    checkoutDateExpected: string;
    status: ReservationStatus;
    cancelReason?: string;
    // For display purposes, we'll include room info if available
    roomNumber?: string;
    roomId?: number;
}

export interface CreateReservationDTO {
    guestId: number;
    employeeId: number;
    checkinDateExpected: string;
    checkoutDateExpected: string;
    status?: ReservationStatus;
    roomId?: number;
}

export interface UpdateReservationDTO {
    guestId?: number;
    checkinDateExpected?: string;
    checkoutDateExpected?: string;
    status?: ReservationStatus;
    roomId?: number;
}

export interface CancelReservationDTO {
    cancelReason: string;
}

export const reservationStatuses: ReservationStatus[] = [
    "pending",
    "confirmed",
    "cancelled",
    "completed",
];
