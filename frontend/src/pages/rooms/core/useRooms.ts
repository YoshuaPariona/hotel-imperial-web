// src/pages/rooms/core/useRooms.ts
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRooms, updateRoomStatus } from "./roomsService";
import { Estado } from "./roomsTypes";

export const useRooms = () => {
  const queryClient = useQueryClient();

  // --- Estado UI ---
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [selectedNewStatus, setSelectedNewStatus] = useState<Estado | null>(null);

  // --- Query para habitaciones ---
  const {
    data: habitaciones = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  // --- Mutation para actualizar estado ---
  const updateStatusMutation = useMutation({
    mutationFn: ({
                   roomId,
                   newStatus,
                   changeReason,
                 }: {
      roomId: number;
      newStatus: Estado;
      changeReason: string;
    }) =>
        updateRoomStatus(roomId, {
          employeeId: 1,
          newStatus,
          changeReason,
        }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      closeModal();
    },
  });

  const openModal = (roomId: number, newStatus: Estado) => {
    setSelectedRoomId(roomId);
    setSelectedNewStatus(newStatus);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleStatusChange = (reason: string) => {
    if (!selectedRoomId || !selectedNewStatus) return;

    updateStatusMutation.mutate({
      roomId: selectedRoomId,
      newStatus: selectedNewStatus,
      changeReason: reason,
    });
  };

  return {
    habitaciones,
    isLoading,
    isError,

    modalOpen,
    openModal,
    closeModal,
    handleStatusChange,

    isUpdating: updateStatusMutation.isPending,
  };
};
