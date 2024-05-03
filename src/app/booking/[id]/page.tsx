import { getBookingInfos } from "@/libs/database";
import { Chat } from "@/libs/components";

export const BookingPage = async ({ params }: { params: { id: string } }) => {
  const booking = await getBookingInfos(parseInt(params.id));

  if (!booking) return null;

  const book = booking.book;

  if (!book) return null;

  const messages = booking.messages;

  return (
    <>
      <h1>Booking Page {book.title}</h1>
      {messages && <Chat messages={messages} />}
    </>
  );
};

export default BookingPage;
