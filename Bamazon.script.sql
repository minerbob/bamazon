DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
use bamazon;

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30),
price FLOAT(30) NOT NULL,
stock_quantity int(30) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("wine", "Drink", 10.99, 20), ("Pizza", "Food", 11.99, 20), ("Thunder Struck", "Music", 19.99, 20);

SELECT 
    *
FROM
    products;

