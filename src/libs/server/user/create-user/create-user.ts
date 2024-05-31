"use server";

import { db } from "@/libs/server";
import { SignUpFormSchema } from "@/libs/types";
import { hash } from "bcrypt";
import { z } from "zod";

export const createUser = async (values: z.infer<typeof SignUpFormSchema>) => {
  try {
    const existingUserByEmail = await db.user.findUnique({
      where: { email: values.email },
    });

    if (existingUserByEmail) {
      return null;
    }

    const existingUserByUsername = await db.user.findUnique({
      where: { username: values.username },
    });

    if (existingUserByUsername) {
      return null;
    }

    const encryptedPassword = await hash(values.password, 10);

    const gpsCoordinates = await fetchGpsCoordinates(values.postalCode);

    await db.user.create({
      data: {
        email: values.email,
        username: values.username,
        postalCode: values.postalCode,
        gpsCoordinates: gpsCoordinates,
        password: encryptedPassword,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const fetchGpsCoordinates = async (postalCode: string) => {
  const response = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${postalCode}&type=municipality&autocomplete=0&limit=1`,
  );

  const data = await response.json();
  return data.features[0].geometry.coordinates;
};

export const verifyPostalCode = async (postalCode: string) => {
  const getPostalData = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${postalCode}&type=&autocomplete=0`,
  );
  const postalData = await getPostalData.json();
  return postalData.features[0] !== undefined;
};
