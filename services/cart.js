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
        try {
            const cartItems = await db.manyOrNone(query,[req.params.username]);
            res.status(200).json(cartItems);
        } catch (error) {
            console.log(error);
        }
    }


    async function addToCart(req, res){
        try{
           await db.none("INSERT INTO shopping_cart(shoe_id, quantity) VALUES ($1, $2)", [req.params.shoeID, 1])
           res.status(201).json({ message: "Successfully added Item to cart" });
        }catch(error){
            console.log(error);
            res.status(501)
        }
    }

    async function removeFromCart(req, res){
        try{
           await db.none("DELETE FROM shopping_cart WHERE shopping_cart.shoe_id = $1", [req.params.shoeID])
           res.status(201).json({ message: "Successfully removed Item from cart" });
        }catch(error){
            console.log(error);
            res.status(501)
        }
    }

    return {
        getCartItems,
        addToCart,
        removeFromCart
        
    };
}
