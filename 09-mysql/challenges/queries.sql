SELECT p.product_name, c.category_name
FROM products p
JOIN categories c ON p.category_id = c.category_id;

SELECT * FROM orders WHERE customer_id = 1;

UPDATE products
SET stock_quantity = stock_quantity - 1
WHERE product_id = 1;

DELETE FROM orders
WHERE status = 'cancelled'
AND order_date < NOW() - INTERVAL 30 DAY;

SELECT p.product_name, SUM(oi.quantity) AS total_sold
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
GROUP BY p.product_name
ORDER BY total_sold DESC
LIMIT 5;

SELECT c.category_name, SUM(oi.quantity * oi.unit_price) AS revenue
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
JOIN categories c ON p.category_id = c.category_id
GROUP BY c.category_name;

SELECT *
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o
    WHERE o.customer_id = c.customer_id
    AND o.order_date > NOW() - INTERVAL 6 MONTH
);

SELECT * FROM products WHERE stock_quantity < 10;

CREATE VIEW order_summary AS
SELECT o.order_id, c.first_name, p.product_name, oi.quantity, o.total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id;
