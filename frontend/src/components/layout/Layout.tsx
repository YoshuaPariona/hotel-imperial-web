import { FC, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SideBar } from "@components/sidebar/SideBar";
import { SidebarProvider } from "@components/ui/sidebar";
import { Input } from "@components/ui/input";
import { Search, LogOut } from "lucide-react";
import { Button } from "@components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const title =
      location.pathname === "/dashboard"
          ? "Dashboard"
          : location.pathname
              .replace("/", "")
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
      <SidebarProvider>
        <div className="flex h-screen w-screen">
          <SideBar />
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Header horizontal */}
            <div className="p-6 border-b flex items-center justify-between bg-white">
              <h1 className="text-3xl font-bold">{title}</h1>
              <div className="flex items-center gap-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar..." className="pl-8" />
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      logout();
                      navigate("/auth");
                    }}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {/* Contenido dinámico */}
            <div className="flex-1 overflow-auto p-6 bg-gray-50">{children}</div>
          </main>
        </div>
      </SidebarProvider>
  );
};

export default Layout;
