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
    stock_quantity INT 
);

-- Customer Table
CREATE TABLE customer(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(500), 
    email VARCHAR(100) UNIQUE
);

-- Admin Table
CREATE TABLE admin(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(500),
    email VARCHAR(100) UNIQUE
);

-- Shopping Cart Table
CREATE TABLE shopping_cart(
    id SERIAL PRIMARY KEY,
    shoe_id INT,  
    username VARCHAR(50), 
    quantity INT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (shoe_id) REFERENCES shoes_stock(id)
);



