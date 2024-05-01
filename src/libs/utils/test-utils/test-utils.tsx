"use client";

import type { ReactNode } from "react";
import { DialogProvider } from "../../ui-components";
import { render as testingLibraryRender } from "@testing-library/react";

export const render = (ui: ReactNode) => {
  return testingLibraryRender(<DialogProvider>{ui}</DialogProvider>);
};
