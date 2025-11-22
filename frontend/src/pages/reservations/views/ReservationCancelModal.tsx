// src/pages/reservations/views/ReservationCancelModal.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Reservation } from "../core/reservationsTypes";
import { formatReservationCode, formatGuestName } from "../core/reservationsUtils";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (cancelReason: string) => void;
    reservation: Reservation | null;
    isLoading?: boolean;
}

const formSchema = z.object({
    cancelReason: z
        .string()
        .min(10, "La razón debe tener al menos 10 caracteres.")
        .max(500, "La razón no puede exceder 500 caracteres."),
});

type FormValues = z.infer<typeof formSchema>;

export const ReservationCancelModal = ({
    isOpen,
    onClose,
    onConfirm,
    reservation,
    isLoading = false,
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cancelReason: "",
        },
    });

    const handleSubmit = form.handleSubmit((data) => {
        onConfirm(data.cancelReason);
        form.reset();
    });

    const handleClose = () => {
        form.reset();
        onClose();
    };

    if (!reservation) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Cancelar Reserva</DialogTitle>
                    <DialogDescription>
                        ¿Estás seguro de que deseas cancelar esta reserva?
                    </DialogDescription>
                </DialogHeader>

                <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
                    <p>
                        <span className="font-semibold">Código:</span>{" "}
                        {formatReservationCode(reservation.code)}
                    </p>
                    <p>
                        <span className="font-semibold">Huésped:</span>{" "}
                        {formatGuestName(reservation.guest)}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Razón de cancelación *
                        </label>
                        <Textarea
                            placeholder="Escribe la razón de la cancelación..."
                            rows={4}
                            {...form.register("cancelReason")}
                            disabled={isLoading}
                        />
                        {form.formState.errors.cancelReason && (
                            <p className="text-sm text-red-600 mt-1">
                                {form.formState.errors.cancelReason.message}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={handleClose}
                            type="button"
                            disabled={isLoading}
                        >
                            Cerrar
                        </Button>
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={isLoading}
                        >
                            {isLoading ? "Cancelando..." : "Confirmar Cancelación"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
