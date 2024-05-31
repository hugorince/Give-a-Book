"use server";

import { redirect } from "next/navigation";

const redirectToBooks = (filter: string) => {
  const param = filter ? new URLSearchParams([["filter", filter]]) : "";
  redirect(`/books${param ? `?${param}` : ""}`);
};

export const filterBooks = async (formData: FormData) => {
  const exchange = formData.get("exchange");
  const give = formData.get("give");
  const liked = formData.get("liked");

  switch (true) {
    case exchange && !give && !liked:
      redirectToBooks("exchange");
      break;
    case give && !exchange && !liked:
      redirectToBooks("give");
      break;
    case liked && !exchange && !give:
      redirectToBooks("liked");
      break;
    case exchange && give && !liked:
      redirectToBooks("exchange,give");
      break;
    case exchange && liked && !give:
      redirectToBooks("exchange,liked");
      break;
    case liked && give && !exchange:
      redirectToBooks("liked,give");
      break;
    case liked !== null && give !== null && exchange !== null:
      redirectToBooks("liked,give,exchange");
      break;
    default:
      redirect("/books");
  }
};
