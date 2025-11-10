import { useState, type FC } from "react";
import {
  Home,
  Calendar,
  Users,
  CreditCard,
  BarChart,
  Building2,
  Bot,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@components/ui/sidebar.tsx";

interface MenuItem {
  title: string;
  url: string;
  icon: FC<any>;
}

interface MenuSectionProps {
  label: string;
  items: MenuItem[];
}

const MENU_SECTIONS: Record<string, MenuItem[]> = {
  Estrategicos: [
    { title: "Panel", url: "#", icon: Home },
    { title: "Insights de IA", url: "#", icon: Bot },
  ],
  Misionales: [
    { title: "Habitaciones", url: "#", icon: Building2 },
    { title: "Reservas", url: "#", icon: Calendar },
    { title: "Ocupación", url: "#", icon: BarChart },
  ],
  Apoyo: [
    { title: "Huéspedes", url: "#", icon: Users },
    { title: "Pagos", url: "#", icon: CreditCard },
  ],
};

const MenuSection: FC<MenuSectionProps> = ({ label, items }) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ title, url, icon: Icon }) => (
              <SidebarMenuItem key={title}>
                <SidebarMenuButton asChild className="py-3 px-4">
                  <a href={url} className="flex items-center gap-3">
                    <Icon className="w-6 h-6" />
                    <span className="text-base">{title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <Separator />
      </SidebarGroupContent>
    </SidebarGroup>
);

const Separator: FC = () => (
    <div className="mx-4 my-2 border-b border-zinc-200 dark:border-zinc-800" />
);

interface UserMenuProps {
  open: boolean;
}

const UserMenu: FC<UserMenuProps> = ({ open }) => (
    <div
        className={`absolute bottom-6 left-56 w-36 bg-white dark:bg-zinc-900 shadow-lg rounded-md transition-all ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
    >
      <ul className="py-2 text-sm">
        <UserMenuItem icon={User} label="Perfil" />
        <UserMenuItem icon={Settings} label="Ajustes" />
        <UserMenuItem icon={LogOut} label="Cerrar sesión" />
      </ul>
    </div>
);

interface UserMenuItemProps {
  icon: FC<any>;
  label: string;
}

const UserMenuItem: FC<UserMenuItemProps> = ({ icon: Icon, label }) => (
    <li className="px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer flex items-center gap-2">
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </li>
);

export const SideBar: FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
      <div className="w-64 h-screen fixed left-0 top-0 border-r border-zinc-200 dark:border-zinc-800">
        <Sidebar>
          <div className="p-4 flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800">
            <div className="w-8 h-8 bg-zinc-300 dark:bg-zinc-700 rounded-md" />
            <span className="font-semibold text-lg">Hotel Imperial</span>
          </div>

          <SidebarContent>
            {Object.entries(MENU_SECTIONS).map(([label, items]) => (
                <MenuSection key={label} label={label} items={items} />
            ))}
          </SidebarContent>

          <div className="mt-auto p-3 border-t border-zinc-200 dark:border-zinc-800 relative">
            <button
                className="w-full flex items-center justify-between cursor-pointer"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <div className="flex flex-col leading-tight text-left">
                  <span className="font-medium">Empleado</span>
                  <span className="text-xs text-zinc-500">Rol</span>
                </div>
              </div>
              <ChevronDown className="h-5 w-5" />
            </button>

            <UserMenu open={userMenuOpen} />
          </div>
        </Sidebar>
      </div>
  );
};