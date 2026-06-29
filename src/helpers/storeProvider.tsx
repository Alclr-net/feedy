"use client"
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store";
export  function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeref = useRef<AppStore>(undefined);
  if (!storeref.current) {
    storeref.current = makeStore();
  }
  return <Provider store={storeref.current}>{children}</Provider>;
}
