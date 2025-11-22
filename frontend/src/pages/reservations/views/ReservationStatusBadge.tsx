// src/pages/reservations/views/ReservationStatusBadge.tsx
import { ReservationStatus } from "../core/reservationsTypes";
import { getStatusColor, getStatusLabel } from "../core/reservationsUtils";

interface Props {
    status: ReservationStatus;
}

export const ReservationStatusBadge = ({ status }: Props) => {
    const colorClass = getStatusColor(status);
    const label = getStatusLabel(status);

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colorClass}`}
        >
            {label}
        </span>
    );
};
