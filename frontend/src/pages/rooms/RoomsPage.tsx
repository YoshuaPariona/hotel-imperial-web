// src/pages/rooms/Rooms.tsx
import { FC, useEffect, useState } from "react";
import { RoomsTable } from "@pages/rooms/components/RoomsTable";
import { RoomsStatusModal } from "@pages/rooms/components/RoomsStatusModal";
import { getRooms, updateRoomStatus } from "@pages/rooms/roomsService";
import { Habitacion, Estado } from "@pages/rooms/roomsTypes";

export const RoomsPage: FC = () => {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [selectedNewStatus, setSelectedNewStatus] = useState<Estado | null>(null);
  const [changeReason, setChangeReason] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Cargar habitaciones al montar el componente
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setHabitaciones(data);
      } catch (error) {
        console.error("Error cargando habitaciones:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms().catch(console.error);
  }, []);

  // Abrir modal para cambiar estado
  const openModal = (roomId: number, newStatus: Estado) => {
    setSelectedRoomId(roomId);
    setSelectedNewStatus(newStatus);
    setModalOpen(true);
  };

  // Actualizar estado de la habitación
  const handleStatusChange = async () => {
    if (!selectedRoomId || !selectedNewStatus) return;
    try {
      await updateRoomStatus(selectedRoomId, {
        employeeId: 1,
        newStatus: selectedNewStatus,
        changeReason,
      });
      setHabitaciones((prev) =>
          prev.map((h) =>
              h.id === selectedRoomId ? { ...h, currentStatus: selectedNewStatus } : h
          )
      );
      setModalOpen(false);
      setChangeReason("");
    } catch (err) {
      console.error("Error al actualizar el estado:", err);
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10 text-xl text-gray-700">Cargando habitaciones...</p>;
  }

  return (
      <>
        <RoomsStatusModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleStatusChange}
            changeReason={changeReason}
            setChangeReason={setChangeReason}
        />
        <RoomsTable
            habitaciones={habitaciones}
            onStatusSelect={openModal}
        />
      </>
  );
};