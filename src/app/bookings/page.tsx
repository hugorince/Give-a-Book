import { MainLayout } from "@/layout";
import { BookingCardContainer, PropositionsContainer } from "@/components";
import {
  getUserBookedBooks,
  getUserPropositions,
  getUserRequestedBooks,
} from "@/actions";
import classes from "./bookings.module.css";

const Bookings = async () => {
  const requestedBooks = await getUserRequestedBooks();
  const bookedBooks = await getUserBookedBooks();
  const propositions = await getUserPropositions();

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
