/*
  Warnings:

  - The primary key for the `order_items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `product_invetory_adjustments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `order_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_productId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `product_invetory_adjustments` DROP FOREIGN KEY `product_invetory_adjustments_productId_fkey`;

-- AlterTable
ALTER TABLE `order_items` DROP PRIMARY KEY,
    DROP COLUMN `orderId`,
    DROP COLUMN `productId`,
    ADD COLUMN `order_id` CHAR(36) NOT NULL,
    ADD COLUMN `product_id` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`order_id`, `product_id`);

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `clientId`,
    ADD COLUMN `client_id` CHAR(36) NOT NULL;

-- DropTable
DROP TABLE `product_invetory_adjustments`;

-- CreateTable
CREATE TABLE `product_inventory_adjustments` (
    `quantity` INTEGER NOT NULL,
    `type` ENUM('COOKED', 'RECOUNTED', 'EXPIRED') NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `product_id` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`product_id`, `date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WhatsappHooks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `content` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_inventory_adjustments` ADD CONSTRAINT `product_inventory_adjustments_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
