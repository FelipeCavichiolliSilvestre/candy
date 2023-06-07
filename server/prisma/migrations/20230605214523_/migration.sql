/*
  Warnings:

  - Added the required column `address` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('PAYMENT_REQUIRED', 'CANCELED', 'EXPIRED') NOT NULL;
