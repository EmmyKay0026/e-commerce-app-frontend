import LeftBar from "@/components/templates/LeftSideBar";
import TopBar from "@/components/templates/TopBar";
import { ReactNode } from "react";

const UserDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-200/70 lg:px-6 overflow-y-auto">
      <LeftBar />
      <div className="flex-1 flex flex-col w-full overflow-y-auto">
        <TopBar />
        <div className="flex-1 lg:p-4 overflow-y-auto">{children}</div>
      </div>
    </main>
  );
};

export default UserDashboardLayout;
