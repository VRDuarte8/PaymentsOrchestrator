/*
  Warnings:

  - A unique constraint covering the columns `[priority]` on the table `Gateway` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Gateway_priority_key` ON `Gateway`(`priority`);
