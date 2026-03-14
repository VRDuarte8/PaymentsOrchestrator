/*
  Warnings:

  - You are about to alter the column `amount` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `amount` DECIMAL(10, 2) NOT NULL;
