import { SideBar } from "@components/sidebar/SideBar";
import { SidebarProvider } from "@components/ui/sidebar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
      <SidebarProvider>
        <div className="flex h-screen">
          <SideBar />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </SidebarProvider>
  );
}
