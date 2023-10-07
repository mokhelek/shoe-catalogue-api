export default function cartService(db) {
    async function getCartItems(data) {
        const query = `SELECT 
                        shoes_stock.id,
                        shoes_stock.shoe_name,
                        shoes_stock.brand,
                        shoes_stock.size,
                        shoes_stock.price,
                        shoes_stock.image_url,
                        shoes_stock.color,
                        shoes_stock.stock_quantity,
                        shopping_cart.quantity
                        FROM shoes_stock
                        INNER JOIN shopping_cart ON shoes_stock.id = shopping_cart.shoe_id 
                        WHERE shopping_cart.username = $1
                        ORDER BY shopping_cart.created_at DESC
                        `;
        const cartItems = await db.manyOrNone(query, data);
        return cartItems;
    }

    async function addToCart(data) {
        await db.none("INSERT INTO shopping_cart(shoe_id, username, quantity) VALUES ($1, $2, $3)", data);
    }

    async function clearCart(user) {
        await db.none(`DELETE FROM shopping_cart WHERE shopping_cart.username = ${user}`);
    }

    async function removeFromCart(data) {
        await db.none("DELETE FROM shopping_cart WHERE shopping_cart.shoe_id = $1 AND shopping_cart.username = $2", data);
    }

    async function updateCart(data) {
        if (data[0] > 0) {
            await db.any("UPDATE shopping_cart SET quantity = $1 WHERE username = $2 AND shoe_id = $3", data);
        } else {
            await db.none("DELETE FROM shopping_cart WHERE username = $1 AND shoe_id = $2", [data[1], data[2]]);
        }
    }

    return {
        getCartItems,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
    };
}
