DELIMITER $$

CREATE PROCEDURE ProcessOrder(IN c_id INT, OUT o_id INT)
BEGIN
    INSERT INTO orders (customer_id, status)
    VALUES (c_id, 'pending');
    SET o_id = LAST_INSERT_ID();
END$$

CREATE PROCEDURE AddItemToOrder(
    IN o_id INT,
    IN p_id INT,
    IN qty INT,
    OUT success BOOLEAN
)
BEGIN
    DECLARE stock INT;

    SELECT stock_quantity INTO stock
    FROM products WHERE product_id = p_id;

    IF stock >= qty THEN
        INSERT INTO order_items (order_id, product_id, quantity, unit_price)
        SELECT o_id, p_id, qty, price
        FROM products WHERE product_id = p_id;

        UPDATE products
        SET stock_quantity = stock_quantity - qty
        WHERE product_id = p_id;

        SET success = TRUE;
    ELSE
        SET success = FALSE;
    END IF;
END$$

CREATE PROCEDURE GetSalesReport(IN start_date DATE, IN end_date DATE)
BEGIN
    SELECT DATE(order_date) AS sale_date,
           COUNT(*) AS order_count,
           SUM(total_amount) AS total_revenue,
           AVG(total_amount) AS avg_order_value
    FROM orders
    WHERE order_date BETWEEN start_date AND end_date
    GROUP BY DATE(order_date);
END$$

DELIMITER ;
