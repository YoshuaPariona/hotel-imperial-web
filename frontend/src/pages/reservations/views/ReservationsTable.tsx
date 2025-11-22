// src/pages/reservations/views/ReservationsTable.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reservation } from "../core/reservationsTypes";
import { ReservationStatusBadge } from "./ReservationStatusBadge";
import {
    formatReservationCode,
    formatGuestName,
    formatDate,
    calculateNights,
    canCancelReservation,
    canEditReservation,
} from "../core/reservationsUtils";
import { Pencil, XCircle } from "lucide-react";

interface Props {
    reservations: Reservation[];
    onEdit: (reservation: Reservation) => void;
    onCancel: (reservation: Reservation) => void;
}

export const ReservationsTable = ({
    reservations,
    onEdit,
    onCancel,
}: Props) => {
    if (reservations.length === 0) {
        return (
            <Card className="max-w-[95%] mx-auto mt-4 shadow-lg">
                <CardContent className="py-10">
                    <p className="text-center text-gray-500 text-lg">
                        No hay reservas registradas
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-[95%] mx-auto mt-4 shadow-lg select-none">
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-lg table">
                        <thead>
                            <tr className="text-gray-700 border-b-2 [&_th]:py-4 text-center border-gray-300">
                                <th className="w-[10%]">Código</th>
                                <th className="w-[15%]">Huésped</th>
                                <th className="w-[10%]">Documento</th>
                                <th className="w-[8%]">Habitación</th>
                                <th className="w-[12%]">Check-in</th>
                                <th className="w-[12%]">Check-out</th>
                                <th className="w-[8%]">Noches</th>
                                <th className="w-[10%]">Estado</th>
                                <th className="w-[15%]">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reservations.map((reservation) => (
                                <tr
                                    key={reservation.id}
                                    className="hover:bg-gray-50 transition-colors [&_td]:py-4 border-b border-gray-100 last:border-b-0"
                                >
                                    <td className="font-semibold text-gray-800 text-center">
                                        {formatReservationCode(reservation.code)}
                                    </td>
                                    <td className="text-gray-800 text-center">
                                        {formatGuestName(reservation.guest)}
                                    </td>
                                    <td className="text-gray-700 text-center">
                                        {reservation.guest.documentType}{" "}
                                        {reservation.guest.documentNumber}
                                    </td>
                                    <td className="text-gray-800 text-center font-semibold">
                                        {reservation.roomNumber || "N/A"}
                                    </td>
                                    <td className="text-gray-700 text-center">
                                        {formatDate(reservation.checkinDateExpected)}
                                    </td>
                                    <td className="text-gray-700 text-center">
                                        {formatDate(reservation.checkoutDateExpected)}
                                    </td>
                                    <td className="text-gray-800 text-center font-semibold">
                                        {calculateNights(
                                            reservation.checkinDateExpected,
                                            reservation.checkoutDateExpected
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <ReservationStatusBadge status={reservation.status} />
                                    </td>
                                    <td className="text-center">
                                        <div className="flex gap-2 justify-center">
                                            {canEditReservation(reservation) && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onEdit(reservation)}
                                                    className="flex items-center gap-1"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                    Editar
                                                </Button>
                                            )}
                                            {canCancelReservation(reservation) && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => onCancel(reservation)}
                                                    className="flex items-center gap-1"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                    Cancelar
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};
