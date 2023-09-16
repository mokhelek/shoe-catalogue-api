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
                        shopping_cart.quantity
                        FROM shoes_stock
                        INNER JOIN shopping_cart ON shoes_stock.id = shopping_cart.shoe_id 
                        WHERE shopping_cart.username = $1
                        `;
        const cartItems = await db.manyOrNone(query, data);
        return cartItems;
    }

    async function addToCart(data) {
        await db.none("INSERT INTO shopping_cart(shoe_id, quantity) VALUES ($1, $2)", data); 
    }

    async function removeFromCart(id) {
        await db.none("DELETE FROM shopping_cart WHERE shopping_cart.shoe_id = $1", id);
    }

    return {
        getCartItems,
        addToCart,
        removeFromCart,
    };
}
