-- CREATE database bamazon;

-- USE bamazon;

-- CREATE TABLE products
--     (
--         item_id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY
--         , product_name VARCHAR(50) NOT NULL
--         , department_name VARCHAR(50) NOT NULL
--         , price DECIMAL(10,2) NOT NULL 
--         , stock_quantity INT NOT NULL DEFAULT 0
--     );
    
-- INSERT INTO products(product_name, department_name, price, stock_quantity)
-- VALUES  ("Baseball Glove", "Sports Equipment", 199.00, 30)
--         , ("Baseball Cap", "Sports Equipment", 44.99, 40)
--         , ("Baseball Bat", "Sports Equipment", 99.99, 50)
--         , ("The Game of Thrones", "Books", 32.00, 80)
--         , ("Count of Monte Cristo", "Books", 26.97, 50)
--         , ("Tools of Titans", "Books", 18.80, 60)
--         , ("Gaming Keyboard", "Electronics", 349.99, 50)
--         , ("4k Computer Monitor", "Electronics", 1200.49, 45)
--         , ("USB Type-C Cable 6ft", "Electronics", 9.99, 250)
--         , ("Wireless Phone Charger", "Electronics", 18.99, 100);