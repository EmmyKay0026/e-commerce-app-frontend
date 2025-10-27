"use client";

import React, { useEffect, useState } from "react";
import RegisterModal from "@/components/molecules/RegisterModal";

export default function RegisterModalManager() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-register-modal", handler as EventListener);
    return () =>
      window.removeEventListener(
        "open-register-modal",
        handler as EventListener
      );
  }, []);

  return <RegisterModal isOpen={open} onClose={() => setOpen(false)} />;
}
