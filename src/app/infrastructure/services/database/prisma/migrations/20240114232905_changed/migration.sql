/*
  Warnings:

  - You are about to drop the column `orderId` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_orderId_fkey";

-- DropIndex
DROP INDEX "Customer_orderId_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_customerId_key" ON "Order"("customerId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
