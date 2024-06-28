"use client";

import type { ReactNode } from "react";
import { DialogProvider } from "../ui-kit";

export const UiComponentsProvider = ({ children }: { children: ReactNode }) => {
  return <DialogProvider>{children}</DialogProvider>;
};
