/*
  Warnings:

  - Made the column `cardLastNumbers` on table `transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `transaction` MODIFY `cardLastNumbers` VARCHAR(191) NOT NULL;
