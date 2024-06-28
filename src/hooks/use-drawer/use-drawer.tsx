"use client";

import { useState } from "react";

export const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  return { open, isOpen, close, toggleDrawer };
};
