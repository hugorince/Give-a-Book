/*
  Warnings:

  - You are about to drop the `_UserChats` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserChats" DROP CONSTRAINT "_UserChats_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserChats" DROP CONSTRAINT "_UserChats_B_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "ownerId" INTEGER NOT NULL,
ADD COLUMN     "requesterId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_UserChats";

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
