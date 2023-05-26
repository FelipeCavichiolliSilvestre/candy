/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password_hash` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clients` ADD COLUMN `password_hash` CHAR(65) NOT NULL,
    ADD COLUMN `username` VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `clients_username_key` ON `clients`(`username`);
