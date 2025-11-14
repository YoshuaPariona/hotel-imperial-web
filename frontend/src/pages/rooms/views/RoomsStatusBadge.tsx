// src/pages/rooms/views/RoomsStatusBadge.tsx
import { Badge } from "@/components/ui/badge";
import { Estado } from "@pages/rooms/core/roomsTypes";
import { getBadgeColor, formatEstado } from "@pages/rooms/core/roomsUtils";
import { Pencil } from "lucide-react";

interface Props {
  estado: Estado;
  onClick?: () => void;
}

export const RoomsStatusBadge = ({ estado, onClick }: Props) => (
    <>
      <Badge
          className={`${getBadgeColor(estado)} cursor-pointer w-52 py-2 px-4`}
          onClick={onClick}
      >
        <span className="flex-1">{formatEstado(estado)}</span>
        <Pencil className="!h-5 !w-5" />
      </Badge>

  </>
);
