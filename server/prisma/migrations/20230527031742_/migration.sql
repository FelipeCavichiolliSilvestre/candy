-- CreateTable
CREATE TABLE `cart_items` (
    `quantity` INTEGER NOT NULL,
    `product_id` INTEGER UNSIGNED NOT NULL,
    `client_id` CHAR(36) NOT NULL,

    PRIMARY KEY (`product_id`, `client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- Rename client table collumn
ALTER TABLE `clients` RENAME COLUMN `phoneNumber` TO `phone_number`;