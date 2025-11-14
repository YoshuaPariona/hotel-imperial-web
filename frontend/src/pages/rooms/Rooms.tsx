// src/pages/rooms/Room.tsx
import {FC, useEffect, useState} from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  Habitacion,
  estadosPosibles,
  getBadgeColor,
  getBedInfo, Estado
} from "@pages/rooms/RoomsData";
import React from "react";
import {getRooms, updateRoomStatus} from "@pages/rooms/RoomService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Rooms: FC = () => {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [selectedNewStatus, setSelectedNewStatus] = useState<Estado | null>(null);
  const [changeReason, setChangeReason] = useState("");

  const openModal = (roomId: number, newStatus: Estado) => {
    setSelectedRoomId(roomId);
    setSelectedNewStatus(newStatus);
    setModalOpen(true);
  };

  const cambiarEstado = (id: number, nuevoEstado: Estado) => {
    setHabitaciones((prev) =>
        prev.map((h) => (h.id === id ? { ...h, currentStatus: nuevoEstado } : h))
    );
  };

  const handleStatusChange = async () => {
    if (!selectedRoomId || !selectedNewStatus) return;

    try {
      await updateRoomStatus(selectedRoomId, {
        employeeId: 1,
        newStatus: selectedNewStatus,
        changeReason
      });

      cambiarEstado(selectedRoomId, selectedNewStatus);
      setModalOpen(false);
      setChangeReason("");

    } catch (err) {
      console.error("Error al actualizar el estado:", err);
    }
  };



  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setHabitaciones(data);
      } catch (error) {
        console.error("Error cargando habitaciones:", error);
      }
    };

    fetchRooms().catch(console.error);
  }, []);



  if (habitaciones.length === 0) {
    return <p className="text-center mt-10 text-xl text-gray-700">Cargando habitaciones...</p>;
  }

  return (
      <>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cambiar estado de habitación</DialogTitle>
            </DialogHeader>

            <DialogHeader>
              <DialogTitle>Cambiar estado de habitación</DialogTitle>
              <DialogDescription>
                ¿Cuál es la razón del cambio?
              </DialogDescription>
            </DialogHeader>

            <Input
                placeholder="Escribe la razón..."
                value={changeReason}
                onChange={(e) => setChangeReason(e.target.value)}
                className="mt-2"
            />

            <DialogFooter>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleStatusChange}>
                Guardar cambio
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className="max-w-7/8 mx-auto mt-4 shadow-lg select-none">
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-lg border-collapse">
                <thead>
                <tr className="text-gray-700 border-b-2 [&_th]:pb-2 [&_th]:text-center border-gray-300">
                  <th className="min-w-[80px]">N° Habitación</th>
                  <th className="min-w-[120px]">Tipo</th>
                  <th className="min-w-[120px]">Cama</th>
                  <th className="min-w-[180px]">Estado</th>
                  <th className="min-w-[250px]">Comodidades</th>
                  <th className="min-w-[100px]">Precio</th>
                </tr>
                </thead>
                <tbody>
                {habitaciones.map((h) => (
                    <React.Fragment key={h.id}>
                      <tr className="hover:bg-gray-50 transition-colors [&_td]:py-4">
                        <td className="font-semibold text-gray-800 text-center">{h.number}</td>
                        <td className="text-gray-800 text-center">{h.roomTypeCategory}</td>
                        <td className="text-gray-800 text-center">{getBedInfo(h)}</td>
                        <td className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="inline-flex items-center justify-center w-[180px] mx-auto">
                                <Badge className={`${getBadgeColor(h.currentStatus)} cursor-pointer text-base w-full py-2`}>
                                  {h.currentStatus.replace("_", " ")}
                                </Badge>
                                <ChevronDown className="sticky text-white right-0 h-5 font-bold -ml-7 z-10" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center">
                              {estadosPosibles.map((estado) => (
                                  <DropdownMenuItem
                                      key={estado}
                                      onClick={() => openModal(h.id, estado)}
                                      className="text-center"
                                  >
                                    {estado.replace("_", " ")}
                                  </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                        <td className="text-gray-700 text-left">{h.amenities}</td>
                        <td className="text-center font-semibold text-gray-800">
                          ${h.nightlyRate.toFixed(2)}
                        </td>
                      </tr>
                      {h.id !== habitaciones[habitaciones.length - 1].id && (
                          <tr key={`divider-${h.id}`}>
                            <td colSpan={6} className="py-1">
                              <div className="h-px bg-gray-200"></div>
                            </td>
                          </tr>
                      )}
                    </React.Fragment>
                ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </>
  );
};