"use client";

import { type RefObject, useCallback, useEffect, useState } from "react";

export const useOutsideClick = ({ ref }: { ref: RefObject<HTMLElement> }) => {
  const [outsideClick, setOutsideClick] = useState(false);

  const handleOutsideClick: EventListener = useCallback(
    (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOutsideClick(true);
      }
    },
    [ref],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return { outsideClick };
};
