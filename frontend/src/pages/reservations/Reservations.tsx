import { FC } from "react";
import { Button } from "@/components/ui/button";
import { ReservationsTable } from "./views/ReservationsTable";
import { ReservationModal } from "./views/ReservationModal";
import { ReservationCancelModal } from "./views/ReservationCancelModal";
import { useReservations } from "./core/useReservations";
import { Plus } from "lucide-react";

export const Reservations: FC = () => {
  const {
    reservations,
    isLoading,
    isError,
    createModalOpen,
    openCreateModal,
    closeCreateModal,
    handleCreateReservation,
    editModalOpen,
    openEditModal,
    closeEditModal,
    handleUpdateReservation,
    cancelModalOpen,
    openCancelModal,
    closeCancelModal,
    handleCancelReservation,
    selectedReservation,
    isCreating,
    isUpdating,
    isCancelling,
  } = useReservations();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-center text-xl text-gray-700">
          Cargando reservas...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-center text-xl text-red-600">
          Error al cargar las reservas. Por favor, intenta nuevamente.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reservas</h1>
          <p className="text-gray-600 mt-1">
            Gestión de reservas del hotel
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="flex items-center gap-2"
          size="lg"
        >
          <Plus className="w-5 h-5" />
          Nueva Reserva
        </Button>
      </div>

      {/* Table */}
      <ReservationsTable
        reservations={reservations}
        onEdit={openEditModal}
        onCancel={openCancelModal}
      />

      {/* Modals */}
      <ReservationModal
        isOpen={createModalOpen}
        onClose={closeCreateModal}
        onSubmit={handleCreateReservation}
        isLoading={isCreating}
      />

      <ReservationModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        onSubmit={handleUpdateReservation}
        reservation={selectedReservation}
        isLoading={isUpdating}
      />

      <ReservationCancelModal
        isOpen={cancelModalOpen}
        onClose={closeCancelModal}
        onConfirm={handleCancelReservation}
        reservation={selectedReservation}
        isLoading={isCancelling}
      />
    </div>
  );
};