"use client";

import React, { useState, useEffect } from "react";
import RegisterModal from "@/components/molecules/RegisterModal";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // If the modal is closed, navigate away (so the URL doesn't stay /register)
    if (!open) {
      router.push("/");
    }
  }, [open, router]);

  return <RegisterModal isOpen={open} onClose={() => setOpen(false)} />;
}