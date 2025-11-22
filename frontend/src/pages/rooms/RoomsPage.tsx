// src/pages/rooms/RoomsPage.tsx
import { RoomsTable } from "@pages/rooms/views/RoomsTable";
import { RoomsStatusModal } from "@pages/rooms/views/RoomsStatusModal";
import { useRooms } from "@pages/rooms/core/useRooms";

export const RoomsPage = () => {
  const {
    habitaciones,
    isLoading,
    isError,
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

  if (isError) {
    return (
      <p className="text-center mt-10 text-xl text-red-600">
        Error al cargar las habitaciones. Por favor, revisa la consola para más detalles.
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
