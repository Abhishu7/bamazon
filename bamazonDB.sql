USE bamazonDB;
CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(20) NOT NULL,
price INT(10) NOT NULL,
stock_quantity INT(4)
);


INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Burgers", "America", 10, 1000),
    ("Tacos", "Mexico", 10, 1000),
    ("Tea", "England", 10, 1000),
	("Crepes", "France", 10, 1000),
    ("Sausages", "Germany", 10, 1000),
	("Sweets", "India", 10, 1000),
    ("Shrimp", "Australia", 10, 1000),
    ("BBQ", "Brazil", 10, 1000),
    ("Sushi", "Japan", 10, 1000),
    ("Vodka", "Russia", 10, 1000)
;

SELECT * from products;