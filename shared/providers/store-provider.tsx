"use client";

import type React from "react";

import { Provider } from "react-redux";
import { store } from "@/shared/store/store";
import { useEffect, useState } from "react";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setIsClient(true);
    });
  }, []);

  if (!isClient) {
    return null; // or a loading state
  }

  if (!store) {
    throw new Error("Store is not initialized on client side");
  }

  return <Provider store={store}>{children}</Provider>;
}
