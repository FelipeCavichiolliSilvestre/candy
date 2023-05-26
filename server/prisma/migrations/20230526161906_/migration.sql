
CREATE TRIGGER product_price_trigger 
AFTER INSERT ON products_price_history 
FOR EACH ROW
BEGIN
	UPDATE products SET price = NEW.price WHERE id = NEW.product_id;
END;

CREATE TRIGGER product_inventory_adjustment_trigger 
AFTER INSERT ON product_inventory_adjustments
FOR EACH ROW
BEGIN
	UPDATE products SET quantity = quantity + NEW.quantity WHERE id = NEW.product_id;
END;
