// src/pages/rooms/views/RoomsStatusModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (changeReason: string) => void;
}

const formSchema = z.object({
  changeReason: z
      .string()
      .min(3, "Debes escribir al menos 3 caracteres.")
      .max(200, "La razón no puede exceder 200 caracteres."),
});

type FormValues = z.infer<typeof formSchema>;

export const RoomsStatusModal = ({
                                   isOpen,
                                   onClose,
                                   onConfirm,
                                 }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      changeReason: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onConfirm(data.changeReason);

    toast.success("Estado actualizado exitosamente");

    form.reset();
    onClose();
  });

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cambiar estado de habitación</DialogTitle>
            <DialogDescription>
              Indica la razón por la cual se realizará el cambio.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <Input
                placeholder="Escribe la razón..."
                {...form.register("changeReason")}
            />
            {form.formState.errors.changeReason && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.changeReason.message}
                </p>
            )}

            <DialogFooter>
              <Button variant="ghost" onClick={onClose} type="button">
                Cancelar
              </Button>
              <Button type="submit">Guardar cambio</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  );
};
