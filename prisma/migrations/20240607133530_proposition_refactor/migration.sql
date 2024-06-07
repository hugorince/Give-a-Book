/*
  Warnings:

  - A unique constraint covering the columns `[proposedBookId]` on the table `Proposition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receiverBookId]` on the table `Proposition` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Proposition_proposedBookId_key" ON "Proposition"("proposedBookId");

-- CreateIndex
CREATE UNIQUE INDEX "Proposition_receiverBookId_key" ON "Proposition"("receiverBookId");
