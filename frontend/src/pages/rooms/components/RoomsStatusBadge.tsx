// src/pages/rooms/components/RoomStatusBadge.tsx
import { Badge } from "@/components/ui/badge";
import { getBadgeColor } from "@pages/rooms/roomsUtils";
import { Estado } from "@pages/rooms/roomsTypes";

interface RoomStatusBadgeProps {
  estado: Estado;
  onClick?: () => void;
}

export const RoomsStatusBadge = ({ estado, onClick }: RoomStatusBadgeProps) => {
  return (
      <Badge
          className={`${getBadgeColor(estado)} cursor-pointer text-base w-full py-2`}
          onClick={onClick}
      >
        {estado.replace("_", " ")}
      </Badge>
  );
};