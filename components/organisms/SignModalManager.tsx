"use client";

import React, { useEffect, useState } from "react";
import SignInModal from "@/components/molecules/SignModal";

export default function SignModalManager() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-signin-modal", handler as EventListener);
    return () => window.removeEventListener("open-signin-modal", handler as EventListener);
  }, []);

  return <SignInModal isOpen={open} onClose={() => setOpen(false)} />;
}