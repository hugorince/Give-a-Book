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
        <div>
          <h2>My bookings</h2>
          {bookings?.userRequestedBooks && (
            <BookingCardContainer books={bookings.userRequestedBooks} />
          )}
        </div>
        <div>
          <h2>My booked books</h2>
          {bookings?.userBookings && (
            <BookingCardContainer books={bookings.userBookings} />
          )}
        </div>
        {propositions && (
          <>
            <div>
              <h2>My proposed propositions</h2>
              {propositions.booksAskedForExchange && (
                <PropositionsContainer
                  propositions={propositions.booksAskedForExchange}
                />
              )}
            </div>
            <div>
              <h2>My received propositions</h2>
              {propositions.booksExchangePropositionReceived && (
                <PropositionsContainer
                  propositions={propositions.booksExchangePropositionReceived}
                />
              )}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Bookings;
