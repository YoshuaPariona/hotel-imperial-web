// src/pages/rooms/components/RoomDropdown.tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { estadosPosibles } from "@pages/rooms/roomsTypes";
import { RoomsStatusBadge } from "@pages/rooms/components/RoomsStatusBadge";
import { Estado } from "@pages/rooms/roomsTypes";

interface RoomDropdownProps {
  currentStatus: Estado;
  onStatusSelect: (status: Estado) => void;
}

export const RoomsDropdown = ({ currentStatus, onStatusSelect }: RoomDropdownProps) => {
  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="inline-flex items-center justify-center w-[180px] mx-auto">
            <RoomsStatusBadge estado={currentStatus} />
            <ChevronDown className="sticky text-white right-0 h-5 font-bold -ml-7 z-10" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          {estadosPosibles.map((estado) => (
              <DropdownMenuItem
                  key={estado}
                  onClick={() => onStatusSelect(estado)}
                  className="text-center cursor-pointer"
              >
                {estado.replace("_", " ")}
              </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
  );
};