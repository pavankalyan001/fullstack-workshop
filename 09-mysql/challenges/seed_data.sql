USE ecommerce_db;

INSERT INTO customers (first_name, last_name, email, phone) VALUES
('Pavan','Ankam','pavan@gmail.com','9991112222'),
('Rahul','Sharma','rahul@gmail.com','9992223333'),
('Sneha','Patel','sneha@gmail.com','9993334444'),
('Amit','Kumar','amit@gmail.com','9994445555'),
('Neha','Singh','neha@gmail.com','9995556666');

INSERT INTO categories VALUES
(1,'Electronics','Electronic items'),
(2,'Clothing','Wearables'),
(3,'Books','Books and magazines'),
(4,'Home','Home appliances'),
(5,'Sports','Sports equipment');

INSERT INTO products (product_name, description, price, stock_quantity, category_id) VALUES
('Laptop','Gaming Laptop',80000,20,1),
('Headphones','Wireless Headphones',5000,50,1),
('T-Shirt','Cotton T-Shirt',800,100,2),
('SQL Book','SQL Guide',1200,30,3),
('Football','Standard Football',1500,15,5);

INSERT INTO orders (customer_id, status, shipping_address) VALUES
(1,'pending','Hyderabad'),
(2,'processing','Delhi'),
(3,'shipped','Mumbai'),
(4,'delivered','Bangalore'),
(5,'cancelled','Chennai');

INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1,1,1,80000),
(2,2,2,5000),
(3,3,3,800),
(4,4,1,1200),
(5,5,1,1500);
