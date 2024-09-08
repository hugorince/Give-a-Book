import { getUserBookings, getUserPropositions } from "@/actions";
import { Link } from "@/ui-kit";
import { MainLayout } from "@/layout";
import { BookingCardContainer, PropositionsContainer } from "@/components";
import { ImBooks } from "react-icons/im";
import classes from "./page.module.css";

const Bookings = async () => {
  const bookings = await getUserBookings();
  const propositions = await getUserPropositions();

  const showMyBookings = bookings && bookings?.userRequestedBooks.length > 0;
  const showMyBookedBooks = bookings && bookings?.userBookings.length > 0;
  const showReceivedPropositions =
    propositions && propositions?.booksExchangePropositionReceived.length > 0;
  const showProposedPropositions =
    propositions && propositions?.booksAskedForExchange.length > 0;

  const isEmptyPage =
    !showMyBookedBooks &&
    !showMyBookings &&
    !showProposedPropositions &&
    !showReceivedPropositions;

  return (
    <MainLayout>
      {isEmptyPage ? (
        <div className={classes.noBookingsContainer}>
          <div className={classes.noBookingsImageBox}>
            <ImBooks size={48} color="red" />
            <h2>You have no bookings</h2>
          </div>
          <Link variant="unstyled" href="/books">
            browse all books
          </Link>
        </div>
      ) : (
        <div className={classes.pageWrapper}>
          {showMyBookings && (
            <div>
              <h2>My bookings</h2>
              <BookingCardContainer
                books={bookings.userRequestedBooks}
                isRequestedBook
              />
            </div>
          )}
          {showMyBookedBooks && (
            <div>
              <h2>My booked books</h2>
              <BookingCardContainer books={bookings.userBookings} />
            </div>
          )}
          {showProposedPropositions && (
            <div>
              <h2>My proposed propositions</h2>
              <PropositionsContainer
                propositions={propositions.booksAskedForExchange}
                type="PROPOSED"
              />
            </div>
          )}
          {showReceivedPropositions && (
            <div>
              <h2>My received propositions</h2>
              <PropositionsContainer
                propositions={propositions.booksExchangePropositionReceived}
                type="RECEIVED"
              />
            </div>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default Bookings;
