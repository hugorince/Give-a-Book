-- CreateEnum
CREATE TYPE "BookType" AS ENUM ('GIVE', 'EXCHANGE');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "type" "BookType",
ALTER COLUMN "exchange" DROP NOT NULL,
ALTER COLUMN "give" DROP NOT NULL;
