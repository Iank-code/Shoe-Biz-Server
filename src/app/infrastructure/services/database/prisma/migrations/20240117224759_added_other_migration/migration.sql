/*
  Warnings:

  - You are about to drop the column `order_Id` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_order_Id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "order_Id",
ADD COLUMN     "customerOrder_Id" TEXT;

-- CreateTable
CREATE TABLE "CustomerOrder" (
    "id" TEXT NOT NULL,
    "shoeSize" TEXT NOT NULL,
    "units" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "CustomerOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomerOrder" ADD CONSTRAINT "CustomerOrder_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_customerOrder_Id_fkey" FOREIGN KEY ("customerOrder_Id") REFERENCES "CustomerOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
