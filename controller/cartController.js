import cartService from "../services/cart.js";
import db from "../model/db.js";

let cartServiceInstance = cartService(db)


export default function cartController() {
    async function getCartItems(req, res) {

        try {
            const cartItems = await cartServiceInstance.getCartItems('user2')
            res.status(200).json(cartItems);
        } catch (error) {
            console.log(error);
        }
    }


    async function addToCart(req, res){
        console.log(req.user);
        const data = [req.params.shoeID, req.user, 1];
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
