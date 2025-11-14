// src/pages/rooms/RoomsPage.tsx
import { RoomsTable } from "@pages/rooms/views/RoomsTable";
import { RoomsStatusModal } from "@pages/rooms/views/RoomsStatusModal";
import { useRooms } from "@pages/rooms/core/useRooms";

export const RoomsPage = () => {
  const {
    habitaciones,
    isLoading,
    modalOpen,
    openModal,
    closeModal,
    handleStatusChange,
  } = useRooms();

  if (isLoading) {
    return (
        <p className="text-center mt-10 text-xl text-gray-700">
          Cargando habitaciones...
        </p>
    );
  }

  return (
      <>
        <RoomsStatusModal
            isOpen={modalOpen}
            onClose={closeModal}
            onConfirm={handleStatusChange}
        />

        <RoomsTable habitaciones={habitaciones} onStatusSelect={openModal} />
      </>
  );
};
