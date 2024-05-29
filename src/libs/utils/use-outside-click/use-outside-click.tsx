"use client";

import { type RefObject, useCallback, useEffect, useState } from "react";

export const useOutsideClick = ({
  refs,
}: {
  refs: RefObject<HTMLElement>[];
}) => {
  const [outsideClick, setOutsideClick] = useState(false);

  const handleOutsideClick: EventListener = useCallback(
    (e: Event) => {
      if (
        refs.every(
          (ref) => ref.current && !ref.current.contains(e.target as Node),
        )
      ) {
        setOutsideClick(true);
      } else {
        setOutsideClick(false);
      }
    },
    [refs],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return { outsideClick };
};
