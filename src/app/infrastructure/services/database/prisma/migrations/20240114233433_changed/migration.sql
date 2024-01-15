-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_order_Id_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "order_Id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_order_Id_fkey" FOREIGN KEY ("order_Id") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
