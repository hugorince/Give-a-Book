"use client";

import { Button } from "@/libs/ui-components";

export const OpenDrawerButton = ({
  toggleDrawer,
}: {
  toggleDrawer: () => void;
}) => {
  const handleOnClick = () => {
    toggleDrawer();
  };

  return <Button onClick={handleOnClick}>filter</Button>;
};
