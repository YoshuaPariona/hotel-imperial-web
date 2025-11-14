// src/pages/rooms/views/RoomsDropdown.tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { estadosPosibles, Estado } from "@pages/rooms/core/roomsTypes";
import { RoomsStatusBadge } from "@pages/rooms/views/RoomsStatusBadge";
import {getBadgeColor} from "@pages/rooms/core/roomsUtils";

interface Props {
  currentStatus: Estado;
  onStatusSelect: (status: Estado) => void;
}

export const RoomsDropdown = ({ currentStatus, onStatusSelect }: Props) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
        <RoomsStatusBadge estado={currentStatus}/>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="relative left-48 flex flex-col">
        <DropdownMenuItem className="text-sm text-gray-500 pointer-events-none">
          Selecciona el nuevo estado:
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        {estadosPosibles.map((estado) => (
            <DropdownMenuItem
                key={estado}
                onClick={() => onStatusSelect(estado)}
            >
              <div className={`${getBadgeColor(estado)} w-4 h-4 rounded-full`}></div>
              <span>{estado}</span>
            </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
);
