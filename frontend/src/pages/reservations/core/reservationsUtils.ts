// src/pages/reservations/core/reservationsUtils.ts
import { ReservationStatus, Reservation, Guest } from "./reservationsTypes";

export const formatReservationCode = (code: string): string => {
    return code.toUpperCase();
};

export const getStatusColor = (status: ReservationStatus): string => {
    const colors: Record<ReservationStatus, string> = {
        pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
        confirmed: "bg-green-100 text-green-800 border-green-300",
        cancelled: "bg-red-100 text-red-800 border-red-300",
        completed: "bg-blue-100 text-blue-800 border-blue-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-300";
};

export const getStatusLabel = (status: ReservationStatus): string => {
    const labels: Record<ReservationStatus, string> = {
        pending: "Pendiente",
        confirmed: "Confirmada",
        cancelled: "Cancelada",
        completed: "Completada",
    };
    return labels[status] || status;
};

export const calculateNights = (
    checkinDate: string,
    checkoutDate: string
): number => {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const diffTime = Math.abs(checkout.getTime() - checkin.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export const isReservationActive = (reservation: Reservation): boolean => {
    return reservation.status === "confirmed" || reservation.status === "pending";
};

export const formatGuestName = (guest: Guest): string => {
    return `${guest.firstName} ${guest.lastName}`;
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-PE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
};

export const formatDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("es-PE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const canCancelReservation = (reservation: Reservation): boolean => {
    return reservation.status === "pending" || reservation.status === "confirmed";
};

export const canEditReservation = (reservation: Reservation): boolean => {
    return reservation.status !== "cancelled" && reservation.status !== "completed";
};
