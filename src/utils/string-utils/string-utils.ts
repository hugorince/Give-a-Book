import { Notification } from "@prisma/client";

export const capitalize = (str: string) => {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
};

export const memberSince = (date: Date) => {
  return (
    date.toLocaleString("default", {
      month: "long",
    }) +
    " " +
    date.getFullYear()
  );
};

export const postedOn = (date: Date) => {
  return (
    "posted on " +
    date.toLocaleString("default", {
      month: "long",
    }) +
    " " +
    date.getDay() +
    " " +
    date.getFullYear()
  );
};

export const timeSinceString = (date: Date) => {
  const today = new Date();
  const timeDifference = today.getTime() - date.getTime();

  const daysDifference = Math.round(timeDifference / (1000 * 3600 * 24));
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  return daysDifference > 0
    ? `${daysDifference} day(s) ago`
    : `${hoursDifference} hour(s) ago`;
};
