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
                        INNER JOIN shopping_cart ON shoes_stock.id = shopping_cart.shoe_id `;
        try {
            const cartItems = await db.manyOrNone(query);
            res.status(200).json(cartItems);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getCartItems,
    };
}
