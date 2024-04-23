import { MainLayout } from "@/libs/layout";
import classes from "./bookings.module.css";
import { BookingCardContainer } from "@/libs/components/booking-card-container";

export const Bookings = () => {
  return (
    <MainLayout>
      <div className={classes.pageWrapper}>
        <h2>My bookings</h2>
        <BookingCardContainer />
        <h2>My booked books</h2>
      </div>
    </MainLayout>
  );
};

export default Bookings;
