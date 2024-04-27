"use server";

import { calculateDistance } from "@/libs/utils";

interface BookingCardDistanceProps {
  ownerPostalCode: string;
  requesterPostalCode: string;
}

export const BookingCardDistance = async ({
  ownerPostalCode,
  requesterPostalCode,
}: BookingCardDistanceProps) => {
  const distance = await calculateDistance(
    ownerPostalCode,
    requesterPostalCode,
  );

  if (!distance) return null;

  return <p>{distance} km from you</p>;
};
