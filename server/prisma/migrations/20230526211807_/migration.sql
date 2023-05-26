/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clients` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` CHAR(11) NOT NULL,
    MODIFY `username` VARCHAR(60) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `clients_email_key` ON `clients`(`email`);
