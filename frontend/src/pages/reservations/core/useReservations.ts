// src/pages/reservations/core/useReservations.ts
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getReservations,
    createReservation,
    updateReservation,
    cancelReservation,
} from "./reservationsService";
import {
    Reservation,
    CreateReservationDTO,
    UpdateReservationDTO,
    CancelReservationDTO,
} from "./reservationsTypes";
import { toast } from "sonner";

export const useReservations = () => {
    const queryClient = useQueryClient();

    // --- Estado UI ---
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] =
        useState<Reservation | null>(null);

    // --- Query para reservas ---
    const {
        data: reservations = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["reservations"],
        queryFn: getReservations,
    });

    // --- Mutation para crear reserva ---
    const createMutation = useMutation({
        mutationFn: (data: CreateReservationDTO) => createReservation(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reservations"] });
            toast.success("Reserva creada exitosamente");
            closeCreateModal();
        },
        onError: (error: any) => {
            toast.error(
                error.response?.data?.message || "Error al crear la reserva"
            );
        },
    });

    // --- Mutation para actualizar reserva ---
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateReservationDTO }) =>
            updateReservation(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reservations"] });
            toast.success("Reserva actualizada exitosamente");
            closeEditModal();
        },
        onError: (error: any) => {
            toast.error(
                error.response?.data?.message || "Error al actualizar la reserva"
            );
        },
    });

    // --- Mutation para cancelar reserva ---
    const cancelMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: CancelReservationDTO }) =>
            cancelReservation(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reservations"] });
            toast.success("Reserva cancelada exitosamente");
            closeCancelModal();
        },
        onError: (error: any) => {
            toast.error(
                error.response?.data?.message || "Error al cancelar la reserva"
            );
        },
    });

    // --- Handlers para modales ---
    const openCreateModal = () => {
        setCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setCreateModalOpen(false);
    };

    const openEditModal = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedReservation(null);
    };

    const openCancelModal = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setCancelModalOpen(true);
    };

    const closeCancelModal = () => {
        setCancelModalOpen(false);
        setSelectedReservation(null);
    };

    // --- Handlers para acciones ---
    const handleCreateReservation = (data: CreateReservationDTO | UpdateReservationDTO) => {
        // For create, ensure employeeId is present
        const createData = {
            ...data,
            employeeId: (data as CreateReservationDTO).employeeId || 1,
        } as CreateReservationDTO;
        createMutation.mutate(createData);
    };

    const handleUpdateReservation = (data: CreateReservationDTO | UpdateReservationDTO) => {
        if (!selectedReservation) return;
        updateMutation.mutate({ id: selectedReservation.id, data: data as UpdateReservationDTO });
    };

    const handleCancelReservation = (cancelReason: string) => {
        if (!selectedReservation) return;
        cancelMutation.mutate({
            id: selectedReservation.id,
            data: { cancelReason },
        });
    };

    return {
        reservations,
        isLoading,
        isError,

        // Create modal
        createModalOpen,
        openCreateModal,
        closeCreateModal,
        handleCreateReservation,

        // Edit modal
        editModalOpen,
        openEditModal,
        closeEditModal,
        handleUpdateReservation,

        // Cancel modal
        cancelModalOpen,
        openCancelModal,
        closeCancelModal,
        handleCancelReservation,

        selectedReservation,

        // Loading states
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isCancelling: cancelMutation.isPending,
    };
};
