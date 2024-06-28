import { Navbar } from "@/components";
import type { ReactNode } from "react";
import classes from "./main-layout.module.css";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className={classes.pageWrapper}>{children}</main>
    </>
  );
};
