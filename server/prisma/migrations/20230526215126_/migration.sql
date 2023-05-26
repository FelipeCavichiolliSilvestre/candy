/*
  Warnings:

  - The primary key for the `employees` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `UnsignedSmallInt` to `Char(36)`.

*/
-- AlterTable
ALTER TABLE `employees` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);
