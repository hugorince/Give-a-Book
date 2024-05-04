import { getBookingInfos } from "@/libs/database";
import { Chat } from "@/libs/components";
import { MainLayout } from "@/libs/layout";
import classes from "./booking.module.css";

export const BookingPage = async ({ params }: { params: { id: string } }) => {
  const booking = await getBookingInfos(parseInt(params.id));

  if (!booking) return null;

  const book = booking.book;

  if (!book) return null;

  const messages = booking.messages;

  return (
    <MainLayout>
      <div className={classes.bookingPageContainer}>
        {messages && <Chat messages={messages} />}
      </div>
    </MainLayout>
  );
};

export default BookingPage;
