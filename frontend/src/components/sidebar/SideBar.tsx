import { useState, type FC } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@components/ui/sidebar";
import {type MenuItem, SIDEBAR_ITEMS, USER_MENU_ITEMS} from "@components/sidebar/SideBarData.ts";

const Separator: FC = () => (
    <div className="mx-4 my-2 border-b border-zinc-200 dark:border-zinc-800" />
);

interface MenuSectionProps {
  label: string;
  items: readonly MenuItem[];
}

const MenuSectionComponent: FC<MenuSectionProps> = ({ label, items }) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ title, url, icon: Icon }) => (
              <SidebarMenuItem key={title}>
                <SidebarMenuButton asChild className="py-3 px-4">
                  <Link to={url} className="flex items-center gap-3">
                    <Icon className="w-6 h-6" />
                    <span className="text-base">{title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <Separator />
      </SidebarGroupContent>
    </SidebarGroup>
);

interface UserMenuProps {
  open: boolean;
}

const UserMenu: FC<UserMenuProps> = ({ open }) => (
    <div
        className={`absolute bottom-6 left-56 w-40 bg-white dark:bg-zinc-900 shadow-lg rounded-md transition-all ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
    >
      <ul className="py-2 text-sm">
        {USER_MENU_ITEMS.map(({ title, icon: Icon }) => (
            <li
                key={title}
                className="px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              <span>{title}</span>
            </li>
        ))}
      </ul>
    </div>
);

// ---------- Main Sidebar Component ----------
export const SideBar: FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
      <div className="h-screen border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <Sidebar>
          {/* Header */}
          <div className="p-6 flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800">
            <img
                src="/images/logo.webp"
                alt="Hotel Imperial"
                className="w-8 h-8 rounded-md object-cover"
            />
            <span className="font-semibold text-xl">Hotel Imperial</span>
          </div>

          {/* Sidebar items */}
          <SidebarContent>
            {Object.entries(SIDEBAR_ITEMS).map(([key, { section, items }]) => (
                <MenuSectionComponent key={key} label={section} items={items} />
            ))}
          </SidebarContent>

          {/* User Section */}
          <div className="mt-auto p-3 border-t border-zinc-200 dark:border-zinc-800 relative hover:bg-zinc-100 dark:hover:bg-zinc-800">
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
