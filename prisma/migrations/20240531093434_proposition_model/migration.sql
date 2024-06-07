-- CreateEnum
CREATE TYPE "PropositionStatusType" AS ENUM ('PENDINING', 'ACCEPTED', 'REFUSED');

-- CreateTable
CREATE TABLE "Proposition" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PropositionStatusType" NOT NULL,
    "proposerId" INTEGER NOT NULL,
    "proposedBookId" INTEGER NOT NULL,
    "receieverId" INTEGER NOT NULL,
    "receiverBookId" INTEGER NOT NULL,

    CONSTRAINT "Proposition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Proposition" ADD CONSTRAINT "Proposition_proposerId_fkey" FOREIGN KEY ("proposerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposition" ADD CONSTRAINT "Proposition_proposedBookId_fkey" FOREIGN KEY ("proposedBookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposition" ADD CONSTRAINT "Proposition_receieverId_fkey" FOREIGN KEY ("receieverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposition" ADD CONSTRAINT "Proposition_receiverBookId_fkey" FOREIGN KEY ("receiverBookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
