import { Book, Booking, Proposition } from "@prisma/client";

export type BookData = {
  id: number;
  title: string;
  author: string;
  image: string | null;
  description: string;
  user: string | null | undefined;
  userId: number;
  exchange: boolean;
  give: boolean;
  createdAt: Date;
  updatedAt: Date;
  likes: number[];
  postalCode: string;
  gpsCoordinates: number[];
  requested: boolean;
  proposed?: Proposition[];
  propositionReceived?: Proposition[];
};

export type BookPageData = BookData & { booking: Booking | null };

export type BookedBook = Omit<BookData, "postalCode"> & {
  distance: number;
  bookingId: number;
};

export type PropositionProposed = {
  booking: Booking | null;
  proposed: Proposition[];
  propositionReceived: Proposition[];
} & Book;

export type RequestedExchangeBook = {
  user: string | null;
  postalCode: string;
  gpsCoordinates: number[];
  requested: boolean;
  booking: Booking | null;
  proposed: Proposition[];
  propositionReceived: Proposition[];
} & Book;

export type PropositionGroup = {
  ownedBook: PropositionProposed;
  proposedInExchange: RequestedExchangeBook;
} | null;

export type Propositions = {
  booksExchangePropositionReceived: PropositionGroup[];
  booksAskedForExchange: PropositionGroup[];
};
