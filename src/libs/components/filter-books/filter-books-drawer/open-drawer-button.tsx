"use client";

import { Button } from "@/libs/ui-components";

export const OpenDrawerButton = ({ open }: { open: () => void }) => {
  const handleOnClick = () => {
    open();
  };

  return <Button onClick={handleOnClick}>filter</Button>;
};
