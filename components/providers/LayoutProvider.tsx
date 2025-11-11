"use client";

import React from "react";
import { useFetchDataOnMount } from "@/store/useUserStore";

export default function LayoutProvider() {
  
  useFetchDataOnMount();

  return null;
}
