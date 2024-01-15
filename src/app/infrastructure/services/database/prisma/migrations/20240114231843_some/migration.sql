/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "orderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_orderId_key" ON "Customer"("orderId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
