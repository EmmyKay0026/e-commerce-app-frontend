import { AppSidebar } from "@/components/app-sidebar";
import LeftBar from "@/components/templates/LeftSideBar";
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
    <main className="flex items-start gap-4  bg-gray-200/70 px-6">
      <LeftBar />

      {children}
    </main>
  );
};

export default UserDashboardLayout;
