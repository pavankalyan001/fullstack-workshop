DELIMITER $$

CREATE FUNCTION CalculateOrderTotal(o_id INT)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE total DECIMAL(10,2);
    SELECT SUM(quantity * unit_price) INTO total
    FROM order_items WHERE order_id = o_id;

    IF total IS NULL THEN
        RETURN 0;
    END IF;

    RETURN total * 1.08;
END$$

CREATE FUNCTION GetCustomerLevel(c_id INT)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE total DECIMAL(10,2);
    SELECT SUM(total_amount) INTO total FROM orders WHERE customer_id = c_id;

    IF total > 1000 THEN
        RETURN 'Gold';
    ELSEIF total > 500 THEN
        RETURN 'Silver';
    ELSE
        RETURN 'Bronze';
    END IF;
END$$

CREATE FUNCTION FormatProductCode(p_id INT)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE prefix VARCHAR(3);

    SELECT LEFT(c.category_name,3)
    INTO prefix
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    WHERE p.product_id = p_id;

    RETURN CONCAT(UPPER(prefix), '-', LPAD(p_id,5,'0'));
END$$

DELIMITER ;
