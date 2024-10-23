export const BOOK_TYPE = {
  GIVE: "GIVE",
  EXCHANGE: "EXCHANGE",
} as const;

export const NOTIFICATION_TYPE = {
  BOOKING_REQUEST: "BOOKING_REQUEST",
  PROPOSITION: "PROPOSITION",
  MESSAGE: "MESSAGE",
} as const;

export const BOOKING_STATUS = {
  REQUESTED: "REQUESTED",
  COMPLETED: "COMPLETED",
} as const;

export const PROPOSITION_STATUS_TYPE = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REFUSED: "REFUSED",
} as const;

export const TOASTER_GENERIC_ERROR_MESSAGE = "An error occurred";

export enum ChipType {
  REQUESTED = "requested",
  COMPLETED = "completed",
  PROPOSED = "proposed",
}
