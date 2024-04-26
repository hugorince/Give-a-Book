export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/books/post-book", "/bookings"],
};
