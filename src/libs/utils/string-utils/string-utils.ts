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
