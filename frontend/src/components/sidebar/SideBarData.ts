import type { FC } from "react";
import {
  Hotel,
  CalendarCheck,
  Users,
  CreditCard,
  ConciergeBell,
  Bed,
  Bot,
  User,
  Settings,
  LogOut,
  TriangleAlert,
  BadgeCheck,
} from "lucide-react";

export interface MenuItem {
  title: string;
  url: string;
  icon: FC<any>;
}

export interface MenuSection {
  section: string;
  items: readonly MenuItem[];
}

export const SIDEBAR_ITEMS: Record<string, MenuSection> = {
  strategy: {
    section: "Procesos Estratégicos",
    items: [
      { title: "Dashboard", url: "/", icon: Hotel },
      { title: "Calidad", url: "/calidad", icon: BadgeCheck },
      { title: "Insights de IA", url: "/insights", icon: Bot },
    ],
  },
  mission: {
    section: "Procesos Misionales",
    items: [
      { title: "Habitaciones", url: "/habitaciones", icon: Bed },
      { title: "Reservas", url: "/reservas", icon: CalendarCheck },
      { title: "Ocupación", url: "/ocupacion", icon: ConciergeBell },
    ],
  },
  support: {
    section: "Procesos de Apoyo",
    items: [
      { title: "Incidencias", url: "/incidencias", icon: TriangleAlert },
      { title: "Huéspedes", url: "/huespedes", icon: Users },
      { title: "Pagos", url: "/pagos", icon: CreditCard },
    ],
  },
} as const;

export const USER_MENU_ITEMS: readonly MenuItem[] = [
  { title: "Perfil", url: "/perfil", icon: User },
  { title: "Ajustes", url: "/ajustes", icon: Settings },
  { title: "Cerrar sesión", url: "/logout", icon: LogOut },
] as const;
