/*
  Warnings:

  - Added the required column `order_Id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "order_Id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_order_Id_fkey" FOREIGN KEY ("order_Id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
