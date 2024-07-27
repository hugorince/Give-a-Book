"use server";

import { db } from "@/db";

export const deleteProposition = async (propositionId: number) => {
  if (!propositionId) return null;

  await db.proposition.delete({
    where: { id: propositionId },
  });
};
