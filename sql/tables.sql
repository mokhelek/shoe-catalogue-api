-- Shoe Stock Table
CREATE TABLE shoes_stock(
    id SERIAL PRIMARY KEY,
    shoe_name VARCHAR(100),
    brand VARCHAR(100),
    size VARCHAR(3),
    price VARCHAR(100),
    image_url VARCHAR(500),
    color VARCHAR(100),
    description TEXT,
    quantity INT 
);

-- Shopping Cart Table
CREATE TABLE shopping_cart(
    id SERIAL PRIMARY KEY,
    shoe_id INT,  
    user_id INT, 
    quantity INT,
    FOREIGN KEY (shoe_id) REFERENCES shoes_stock(id),
    FOREIGN KEY (user_id) REFERENCES customer(id),
);

-- Customer Table
CREATE TABLE customer(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    Password VARCHAR(500), -- Automatically hashed
    email VARCHAR(100) UNIQUE
);

