export default function cartService(db){

    async function getCartItems(req, res){
        try{
            const cartItems = await db.manyOrNone("SELECT * FROM shopping_cart");
            res.status(200).json(cartItems);
        }catch(error){
            console.log(error)
        }
    }


    return {
        getCartItems
    }
}