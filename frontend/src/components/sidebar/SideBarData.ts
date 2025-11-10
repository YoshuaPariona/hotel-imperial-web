import type { FC } from "react";
import {
  Home,
  Calendar,
  Users,
  CreditCard,
  BarChart,
  Building2,
  Bot,
  User,
  Settings,
  LogOut,
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
      { title: "Panel", url: "/", icon: Home },
      { title: "Insights de IA", url: "/ia", icon: Bot },
    ],
  },
  mission: {
    section: "Procesos Misionales",
    items: [
      { title: "Habitaciones", url: "/rooms", icon: Building2 },
      { title: "Reservas", url: "/bookings", icon: Calendar },
      { title: "Ocupación", url: "/ocupacion", icon: BarChart },
    ],
  },
  support: {
    section: "Procesos de Apoyo",
    items: [
      { title: "Huéspedes", url: "/guests", icon: Users },
      { title: "Pagos", url: "/payments", icon: CreditCard },
    ],
  },
} as const;

export const USER_MENU_ITEMS: readonly MenuItem[] = [
  { title: "Perfil", url: "/perfil", icon: User },
  { title: "Ajustes", url: "/ajustes", icon: Settings },
  { title: "Cerrar sesión", url: "/logout", icon: LogOut },
] as const;
