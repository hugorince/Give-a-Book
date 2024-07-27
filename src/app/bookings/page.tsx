import { MainLayout } from "@/layout";
import { BookingCardContainer, PropositionsContainer } from "@/components";
import { getUserBookings, getUserPropositions } from "@/actions";
import classes from "./page.module.css";

const Bookings = async () => {
  const bookings = await getUserBookings();
  const propositions = await getUserPropositions();

  return (
    <MainLayout>
      <div className={classes.pageWrapper}>
        {bookings?.userRequestedBooks && (
          <div>
            <h2>My bookings</h2>
            <BookingCardContainer
              books={bookings.userRequestedBooks}
              isRequestedBook
            />
          </div>
        )}
        {bookings?.userBookings && (
          <div>
            <h2>My booked books</h2>
            <BookingCardContainer books={bookings.userBookings} />
          </div>
        )}
        {propositions?.booksAskedForExchange && (
          <div>
            <h2>My proposed propositions</h2>
            <PropositionsContainer
              propositions={propositions.booksAskedForExchange}
              type="PROPOSED"
            />
          </div>
        )}
        {propositions?.booksExchangePropositionReceived && (
          <div>
            <h2>My received propositions</h2>
            <PropositionsContainer
              propositions={propositions.booksExchangePropositionReceived}
              type="RECEIVED"
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Bookings;
