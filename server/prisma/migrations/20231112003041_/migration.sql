-- AlterTable
ALTER TABLE `orders` MODIFY `status` ENUM('PAYMENT_REQUIRED', 'CANCELED', 'EXPIRED', 'PAID') NOT NULL;

-- Create Trigger
CREATE TRIGGER order_inventory_adjustment_trigger
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products SET quantity = quantity - NEW.quantity WHERE id = NEW.product_id;
END;

CREATE TRIGGER  order_status_inventory_adjustment_trigger
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
    IF (NEW.status = "PAYMENT_REQUIRED") THEN
        UPDATE products, order_items SET products.quantity = products.quantity - order_items.quantity
        WHERE products.id = order_items.product_id AND order_items.order_id = OLD.id;
    ELSE
        UPDATE products, order_items SET products.quantity = products.quantity + order_items.quantity
        WHERE products.id = order_items.product_id AND order_items.order_id = OLD.id;
    END IF;
END;