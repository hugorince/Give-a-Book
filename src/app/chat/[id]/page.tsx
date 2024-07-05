import type { PageProps } from "../../../../.next/types/app/page";
import { getBookingInfos } from "@/actions";
import { MainLayout } from "@/layout";
import { Link } from "@/ui-kit";
import { Chat } from "@/components";
import classes from "./booking.module.css";

const BookingPage = async ({ params }: PageProps) => {
  const booking = await getBookingInfos(parseInt(params.id));

  if (!booking) return null;

  const book = booking.book;

  if (!book) return null;

  const messages = booking.messages;

  return (
    <MainLayout>
      <Link variant="unstyled" href="/bookings">
        ← back to my bookings
      </Link>
      <h1>{book.title}</h1>
      <div className={classes.bookingPageContainer}>
        {messages && <Chat messages={messages} />}
      </div>
    </MainLayout>
  );
};

export default BookingPage;
