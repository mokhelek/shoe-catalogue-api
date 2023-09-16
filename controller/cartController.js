import cartService from "../services/cart.js";
import db from "../model/db.js";

let cartServiceInstance = cartService(db)


export default function cartService() {
    async function getCartItems(req, res) {
      
        try {
            const cartItems = await cartServiceInstance.getCartItems(req.params.username)
            res.status(200).json(cartItems);
        } catch (error) {
            console.log(error);
        }
    }


    async function addToCart(req, res){
        const data = [req.params.shoeID, 1];
        try{
           await cartServiceInstance.addToCart(data)
           res.status(201).json({ message: "Successfully added Item to cart" });
        }catch(error){
            console.log(error);
            res.status(501)
        }
    }

    async function removeFromCart(req, res){
        try{
           await cartServiceInstance.removeFromCart(req.params.shoeID)
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
