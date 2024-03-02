"use client";

import { Button } from "@/libs/ui-components";

export const OpenFilterBooksDrawerButton = ({ open }: { open: () => void }) => {
  const handleOnClick = () => {
    open();
  };

  return <Button onClick={handleOnClick}>filter</Button>;
};
