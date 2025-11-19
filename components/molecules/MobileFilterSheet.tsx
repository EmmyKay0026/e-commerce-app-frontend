// components/molecules/MobileFilterSheet.tsx
"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import SidebarFilter from "./SidebarFilter";

export default function MobileFilterSheet({
  children,
  ...filterProps
}: {
  children: React.ReactNode;
} & React.ComponentProps<typeof SidebarFilter>) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>Filter & Sort</SheetTitle>
        </SheetHeader>
        <div className="p-6 overflow-y-auto">
          <SidebarFilter {...filterProps} />
        </div>
      </SheetContent>
    </Sheet>
  );
}