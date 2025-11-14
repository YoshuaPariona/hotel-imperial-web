// src/pages/rooms/components/RoomTable.tsx
import { Card, CardContent } from "@/components/ui/card";
import {Estado, Habitacion} from "@pages/rooms/roomsTypes";
import { RoomsDropdown } from "@pages/rooms/components/RoomsDropdown";
import { getBedInfo } from "@pages/rooms/roomsUtils";
import { Fragment } from "react";

interface RoomTableProps {
  habitaciones: Habitacion[];
  onStatusSelect: (roomId: number, newStatus: Estado) => void;
}

export const RoomsTable = ({ habitaciones, onStatusSelect }: RoomTableProps) => {
  return (
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
                <th className="min-w-[200px]">Comodidades</th>
                <th className="min-w-[100px]">Precio</th>
              </tr>
              </thead>
              <tbody>
              {habitaciones.map((h) => (
                  <Fragment key={h.id}>
                    <tr className="hover:bg-gray-50 transition-colors [&_td]:py-4">
                      <td className="font-semibold text-gray-800 text-center">{h.number}</td>
                      <td className="text-gray-800 text-center">{h.roomTypeCategory}</td>
                      <td className="text-gray-800 text-center">{getBedInfo(h)}</td>
                      <td className="text-center">
                        <RoomsDropdown
                            currentStatus={h.currentStatus}
                            onStatusSelect={(status) => onStatusSelect(h.id, status)}
                        />
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
                  </Fragment>
              ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
  );
};