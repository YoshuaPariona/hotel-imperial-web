// src/pages/rooms/components/RoomStatusModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RoomStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  changeReason: string;
  setChangeReason: (reason: string) => void;
}

export const RoomsStatusModal = ({ isOpen, onClose, onConfirm, changeReason, setChangeReason }: RoomStatusModalProps) => {
  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar estado de habitación</DialogTitle>
            <DialogDescription>¿Cuál es la razón del cambio?</DialogDescription>
          </DialogHeader>
          <Input
              placeholder="Escribe la razón..."
              value={changeReason}
              onChange={(e) => setChangeReason(e.target.value)}
              className="mt-2"
          />
          <DialogFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={onConfirm}>
              Guardar cambio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
};