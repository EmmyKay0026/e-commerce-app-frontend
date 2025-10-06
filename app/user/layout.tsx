import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Settings } from "lucide-react";
import { ReactNode } from "react";

const UserDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" />

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default UserDashboardLayout;
