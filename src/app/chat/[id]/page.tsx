import { getBookingInfos } from "@/libs/server-actions";
import { MainLayout } from "@/libs/layout";
import { Link } from "@/libs/ui-components";
import { Chat } from "@/libs/components";
import classes from "./booking.module.css";

export const BookingPage = async ({ params }: { params: { id: string } }) => {
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
