// src/pages/rooms/Room.tsx
import { FC, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  Habitacion,
  habitacionesIniciales,
  estadosPosibles,
  getBadgeColor,
  getBedInfo,
  Estado
} from "@pages/rooms/RoomsData";
import React from "react";

export const Rooms: FC = () => {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>(habitacionesIniciales);

  const cambiarEstado = (id: number, nuevoEstado: Estado) => {
    setHabitaciones((prev) =>
        prev.map((h) => (h.id === id ? { ...h, currentStatus: nuevoEstado } : h))
    );
  };

  return (
      <Card className="max-w-5/6 mx-auto mt-4 shadow-lg select-none">
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
                                    onClick={() => cambiarEstado(h.id, estado)}
                                    className="text-center"
                                >
                                  {estado.replace("_", " ")}
                                </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className="text-gray-700 text-left">{h.amenities}</td>
                      <td className="text-center font-semibold text-gray-800">${h.price.toFixed(2)}</td>
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
  );
};