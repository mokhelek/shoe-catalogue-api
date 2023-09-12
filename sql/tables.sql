CREATE TABLE shoes_stock(
    id SERIAL PRIMARY KEY,
    shoe_name VARCHAR(100),
    brand VARCHAR(100),
    size VARCHAR(3),
    price VARCHAR(100),
    image_url VARCHAR(500),
    color VARCHAR(100),
    quantity INT 
);

CREATE TABLE shopping_cart (
    id SERIAL PRIMARY KEY,
    shoe_id INT,  
    quantity INT,
    FOREIGN KEY (shoe_id) REFERENCES shoes_stock(id)
);
