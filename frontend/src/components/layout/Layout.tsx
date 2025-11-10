import { SideBar } from "@components/layout/SideBar.tsx"
import { SidebarProvider, SidebarTrigger } from "@components/ui/sidebar.tsx"
import * as React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
      <SidebarProvider>
        <SideBar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
  );
}
