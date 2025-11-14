// src/pages/rooms/views/RoomsTable.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Estado, Habitacion } from "@pages/rooms/core/roomsTypes";
import { RoomsDropdown } from "@pages/rooms/views/RoomsDropdown";
import { getBedInfo } from "@pages/rooms/core/roomsUtils";

interface Props {
  habitaciones: Habitacion[];
  onStatusSelect: (roomId: number, newStatus: Estado) => void;
}

export const RoomsTable = ({ habitaciones, onStatusSelect }: Props) => (
    <Card className="max-w-[95%] mx-auto mt-4 shadow-lg select-none">
      <CardContent>
        <div className="overflow-x-auto">
          <table className="max-w-[95%] mx-auto text-lg table">
            <thead>
            <tr className="text-gray-700 border-b-2 [&_th]:py-4 text-center border-gray-300">
              <th className="w-[5%]">N° Habitación</th>
              <th className="w-[10%]">Tipo</th>
              <th className="w-[5%]">Cama</th>
              <th className="w-[10%]">Estado</th>
              <th className="w-[15%]">Comodidades</th>
              <th className="w-[5%]">Precio</th>
            </tr>
            </thead>

            <tbody>
            {habitaciones.map((h) => (
                <tr
                    key={h.id}
                    className="hover:bg-gray-50 transition-colors [&_td]:py-4 border-b border-gray-100 last:border-b-0"
                >
                  <td className="font-semibold text-gray-800 text-center">{h.number}</td>
                  <td className="text-gray-800 text-center">{h.roomTypeCategory}</td>
                  <td className="text-gray-800 text-center">{getBedInfo(h)}</td>
                  <td className="text-center">
                    <RoomsDropdown
                        currentStatus={h.currentStatus}
                        onStatusSelect={(newStatus) => onStatusSelect(h.id, newStatus)}
                    />
                  </td>
                  <td className="text-gray-700 text-left">{h.amenities}</td>
                  <td className="text-center font-semibold text-gray-800">${h.nightlyRate.toFixed(2)}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
);
