export default function cartService(db) {
    async function getCartItems(req, res) {
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
        const cartItems = await db.manyOrNone(query, [req.params.username]);
        return cartItems;
    }

    async function addToCart(req, res) {
        await db.none("INSERT INTO shopping_cart(shoe_id, quantity) VALUES ($1, $2)", [req.params.shoeID, 1]); 
    }

    async function removeFromCart(req, res) {
        await db.none("DELETE FROM shopping_cart WHERE shopping_cart.shoe_id = $1", [req.params.shoeID]);
    }

    return {
        getCartItems,
        addToCart,
        removeFromCart,
    };
}
