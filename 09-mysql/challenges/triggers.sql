DELIMITER $$

CREATE TRIGGER trg_order_audit
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
    INSERT INTO order_audit
    (order_id, action, old_status, new_status, old_total, new_total, changed_by)
    VALUES
    (OLD.order_id, 'UPDATE', OLD.status, NEW.status,
     OLD.total_amount, NEW.total_amount, USER());
END$$

CREATE TRIGGER trg_validate_order_item
BEFORE INSERT ON order_items
FOR EACH ROW
BEGIN
    DECLARE stock INT;

    SELECT stock_quantity INTO stock
    FROM products WHERE product_id = NEW.product_id;

    IF stock IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Product does not exist';
    END IF;

    IF NEW.quantity > stock THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient stock';
    END IF;
END$$

CREATE TRIGGER trg_update_order_total
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE orders
    SET total_amount = (
        SELECT SUM(quantity * unit_price)
        FROM order_items
        WHERE order_id = NEW.order_id
    )
    WHERE order_id = NEW.order_id;
END$$

CREATE TRIGGER trg_low_stock_alert
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    IF NEW.stock_quantity < 10 THEN
        INSERT INTO stock_alerts (product_id, product_name, current_quantity)
        VALUES (NEW.product_id, NEW.product_name, NEW.stock_quantity);
    END IF;
END$$

DELIMITER ;
