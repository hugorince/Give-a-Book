/*
  Warnings:

  - The values [PENDINING] on the enum `PropositionStatusType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PropositionStatusType_new" AS ENUM ('PENDING', 'ACCEPTED', 'REFUSED');
ALTER TABLE "Proposition" ALTER COLUMN "status" TYPE "PropositionStatusType_new" USING ("status"::text::"PropositionStatusType_new");
ALTER TYPE "PropositionStatusType" RENAME TO "PropositionStatusType_old";
ALTER TYPE "PropositionStatusType_new" RENAME TO "PropositionStatusType";
DROP TYPE "PropositionStatusType_old";
COMMIT;
