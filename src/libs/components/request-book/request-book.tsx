"use client";

import { Button } from "@/libs/ui-components";

export const RequestBook = () => {
  const handleOnClick = () => {
    console.log("request book");
  };
  return <Button onClick={handleOnClick}>Request book</Button>;
};
