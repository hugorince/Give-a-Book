"use client";

import { MainLayout } from "@/layout";
import { ImBooks } from "react-icons/im";
import classes from "./not-found.module.css";

const Error = () => {
  return (
    <MainLayout>
      <main className={classes.container}>
        <div>
          <ImBooks size={48} color="red" />
          <h1>Something wen wrong</h1>
        </div>
        <p>please try again</p>
      </main>
    </MainLayout>
  );
};

export default Error;
