/*
  Warnings:

  - You are about to drop the column `confirmedEmail` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `confirmedEmail` on the `Seller` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "confirmedEmail",
ADD COLUMN     "emailConfirmedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "confirmedEmail",
ADD COLUMN     "emailConfirmedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "BlacklistedToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlacklistedToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlacklistedToken_token_key" ON "BlacklistedToken"("token");
