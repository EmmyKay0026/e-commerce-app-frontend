"use client";

import * as React from "react";
import {
  Book,
  BookMarked,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Command,
  Contact,
  FileQuestion,
  Frame,
  LifeBuoy,
  Map,
  PersonStanding,
  PieChart,
  Send,
  Settings2,
  ShoppingCart,
  SquareTerminal,
  StoreIcon,
  Wallet,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Brand from "./molecules/Brand";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { demoWishlist } from "@/constants/product";

// Todo: Manage active state based on current route
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const updateIsOwner = useUserStore((state) => state.updateIsOwner);
  const user = useUserStore((state) => state.user);
  if (!user) {
    router.push("/404");
    return;
  }
  const data = {
    user: {
      name: user?.fullName,
      email: user?.email,
      avatar: user?.profilePicture || "/electronics-store-cover.jpg",
    },
    navMain: [
      {
        title: "Start shopping",
        url: `/user/${user.id}/#`,
        icon: ShoppingCart,
      },
      {
        title: "Contact Information",
        url: `/user/${user.id}/profile`,
        icon: Contact,
        isActive: true,
      },
      {
        title: `Saved for later ${
          demoWishlist.length > 0 ? `(${demoWishlist.length})` : ""
        }`,
        url: `/user/${user.id}/save-for-later`,
        icon: BookMarked,
      },
    ],
    navSecondary: [
      {
        title: "User Guide",
        url: `/user/${user.id}/#`,
        icon: Book,
      },
      {
        title: "FAQ",
        url: `/user/${user.id}/#`,
        icon: FileQuestion,
      },
    ],
    projects: [
      {
        name: "Start Selling",
        url: `/sell`,
        icon: Send,
      },
      {
        name: "Products on sale",
        url: `/user/${user.id}/products`,
        icon: StoreIcon,
      },
      {
        name: "Make money",
        url: `/user/${user.id}/#`,
        icon: Wallet,
      },
    ],
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="items-left">
            <SidebarMenuButton size="lg" asChild>
              <Brand className="w-fit object-contain" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
