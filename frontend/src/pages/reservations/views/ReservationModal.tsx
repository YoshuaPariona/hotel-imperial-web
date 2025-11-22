// src/pages/reservations/views/ReservationModal.tsx
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Reservation,
    CreateReservationDTO,
    UpdateReservationDTO,
    reservationStatuses,
    Guest,
} from "../core/reservationsTypes";
import { searchGuests, getAvailableRooms } from "../core/reservationsService";
import { formatGuestName } from "../core/reservationsUtils";
import { useQuery } from "@tanstack/react-query";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateReservationDTO | UpdateReservationDTO) => void;
    reservation?: Reservation | null;
    isLoading?: boolean;
}

const formSchema = z.object({
    guestId: z.number().min(1, "Debes seleccionar un huésped"),
    roomId: z.number().optional(),
    checkinDateExpected: z.string().min(1, "La fecha de check-in es obligatoria"),
    checkoutDateExpected: z.string().min(1, "La fecha de check-out es obligatoria"),
    status: z.enum(["pending", "confirmed", "cancelled", "completed"]).optional(),
    employeeId: z.number().optional(),
}).refine(
    (data) => {
        if (data.checkinDateExpected && data.checkoutDateExpected) {
            return new Date(data.checkinDateExpected) < new Date(data.checkoutDateExpected);
        }
        return true;
    },
    {
        message: "La fecha de check-out debe ser posterior a la de check-in",
        path: ["checkoutDateExpected"],
    }
);

type FormValues = z.infer<typeof formSchema>;

export const ReservationModal = ({
    isOpen,
    onClose,
    onSubmit,
    reservation,
    isLoading = false,
}: Props) => {
    const [guestSearch, setGuestSearch] = useState("");
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            guestId: undefined,
            roomId: undefined,
            checkinDateExpected: "",
            checkoutDateExpected: "",
            status: "pending",
            employeeId: 1, // TODO: Get from auth context
        },
    });

    const checkinDate = form.watch("checkinDateExpected");
    const checkoutDate = form.watch("checkoutDateExpected");

    // Query for guest search
    const { data: guests = [] } = useQuery({
        queryKey: ["guests", guestSearch],
        queryFn: () => searchGuests(guestSearch),
        enabled: guestSearch.length >= 2,
    });

    // Query for available rooms
    const { data: availableRooms = [] } = useQuery({
        queryKey: ["availableRooms", checkinDate, checkoutDate],
        queryFn: () => getAvailableRooms(checkinDate, checkoutDate),
        enabled: !!checkinDate && !!checkoutDate,
    });

    // Populate form when editing
    useEffect(() => {
        if (reservation) {
            form.reset({
                guestId: reservation.guest.id,
                roomId: reservation.roomId,
                checkinDateExpected: reservation.checkinDateExpected,
                checkoutDateExpected: reservation.checkoutDateExpected,
                status: reservation.status,
                employeeId: 1,
            });
            setSelectedGuest(reservation.guest);
        } else {
            form.reset({
                guestId: undefined,
                roomId: undefined,
                checkinDateExpected: "",
                checkoutDateExpected: "",
                status: "pending",
                employeeId: 1,
            });
            setSelectedGuest(null);
        }
    }, [reservation, form]);

    const handleSubmit = form.handleSubmit((data) => {
        onSubmit(data);
    });

    const handleClose = () => {
        form.reset();
        setGuestSearch("");
        setSelectedGuest(null);
        onClose();
    };

    const handleGuestSelect = (guest: Guest) => {
        setSelectedGuest(guest);
        form.setValue("guestId", guest.id);
        setGuestSearch("");
    };

    const handleRoomSelect = (roomId: string) => {
        form.setValue("roomId", Number(roomId));
    };

    const isEditMode = !!reservation;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? "Editar Reserva" : "Nueva Reserva"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? "Modifica los datos de la reserva"
                            : "Completa los datos para crear una nueva reserva"}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    {/* Guest Selection */}
                    <div>
                        <Label htmlFor="guest">Huésped *</Label>
                        {selectedGuest ? (
                            <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50 mt-2">
                                <div>
                                    <p className="font-medium">{formatGuestName(selectedGuest)}</p>
                                    <p className="text-sm text-gray-600">
                                        {selectedGuest.documentType} {selectedGuest.documentNumber}
                                    </p>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setSelectedGuest(null);
                                        form.setValue("guestId", undefined as any);
                                    }}
                                    disabled={isLoading}
                                >
                                    Cambiar
                                </Button>
                            </div>
                        ) : (
                            <div className="mt-2">
                                <Input
                                    placeholder="Buscar huésped por nombre o documento..."
                                    value={guestSearch}
                                    onChange={(e) => setGuestSearch(e.target.value)}
                                    disabled={isLoading}
                                />
                                {guestSearch.length >= 2 && guests.length > 0 && (
                                    <div className="border rounded-md mt-1 max-h-48 overflow-y-auto">
                                        {guests.map((guest) => (
                                            <button
                                                key={guest.id}
                                                type="button"
                                                className="w-full text-left p-3 hover:bg-gray-50 border-b last:border-b-0"
                                                onClick={() => handleGuestSelect(guest)}
                                            >
                                                <p className="font-medium">{formatGuestName(guest)}</p>
                                                <p className="text-sm text-gray-600">
                                                    {guest.documentType} {guest.documentNumber}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {guestSearch.length >= 2 && guests.length === 0 && (
                                    <p className="text-sm text-gray-500 mt-2">
                                        No se encontraron huéspedes
                                    </p>
                                )}
                            </div>
                        )}
                        {form.formState.errors.guestId && (
                            <p className="text-sm text-red-600 mt-1">
                                {form.formState.errors.guestId.message}
                            </p>
                        )}
                    </div>

                    {/* Check-in Date */}
                    <div>
                        <Label htmlFor="checkinDateExpected">Fecha de Check-in *</Label>
                        <Input
                            id="checkinDateExpected"
                            type="date"
                            {...form.register("checkinDateExpected")}
                            disabled={isLoading}
                            className="mt-2"
                        />
                        {form.formState.errors.checkinDateExpected && (
                            <p className="text-sm text-red-600 mt-1">
                                {form.formState.errors.checkinDateExpected.message}
                            </p>
                        )}
                    </div>

                    {/* Check-out Date */}
                    <div>
                        <Label htmlFor="checkoutDateExpected">Fecha de Check-out *</Label>
                        <Input
                            id="checkoutDateExpected"
                            type="date"
                            {...form.register("checkoutDateExpected")}
                            disabled={isLoading}
                            className="mt-2"
                        />
                        {form.formState.errors.checkoutDateExpected && (
                            <p className="text-sm text-red-600 mt-1">
                                {form.formState.errors.checkoutDateExpected.message}
                            </p>
                        )}
                    </div>

                    {/* Room Selection */}
                    {checkinDate && checkoutDate && (
                        <div>
                            <Label htmlFor="roomId">Habitación (Opcional)</Label>
                            <Controller
                                name="roomId"
                                control={form.control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={handleRoomSelect}
                                        value={field.value?.toString()}
                                        disabled={isLoading || availableRooms.length === 0}
                                    >
                                        <SelectTrigger className="mt-2">
                                            <SelectValue placeholder="Seleccionar habitación" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableRooms.map((room) => (
                                                <SelectItem key={room.id} value={room.id.toString()}>
                                                    {room.number} - {room.roomTypeCategory} ({room.currentStatus})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {availableRooms.length === 0 && (
                                <p className="text-sm text-amber-600 mt-1">
                                    No hay habitaciones disponibles para estas fechas
                                </p>
                            )}
                        </div>
                    )}

                    {/* Status */}
                    {isEditMode && (
                        <div>
                            <Label htmlFor="status">Estado</Label>
                            <Controller
                                name="status"
                                control={form.control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger className="mt-2">
                                            <SelectValue placeholder="Seleccionar estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {reservationStatuses.map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={handleClose}
                            type="button"
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading
                                ? "Guardando..."
                                : isEditMode
                                    ? "Actualizar"
                                    : "Crear Reserva"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
