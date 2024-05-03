import { MainLayout } from "@/libs/layout";
import classes from "./bookings.module.css";
import { BookingCardContainer } from "@/libs/components/booking-card-container";
import { getUserBookedBooks, getUserRequestedBooks } from "@/libs/database";

export const Bookings = async () => {
  const requestedBooks = await getUserRequestedBooks();
  const bookedBooks = await getUserBookedBooks();

  return (
    <MainLayout>
      <div className={classes.pageWrapper}>
        <div>
          <h2>My bookings</h2>
          {requestedBooks && <BookingCardContainer books={requestedBooks} />}
        </div>
        <div>
          <h2>My booked books</h2>
          {bookedBooks && <BookingCardContainer books={bookedBooks} />}
        </div>
      </div>
    </MainLayout>
  );
};

export default Bookings;
