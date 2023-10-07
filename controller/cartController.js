import cartService from "../services/cart.js";
import db from "../model/db.js";

let cartServiceInstance = cartService(db);

export default function cartController() {
    async function getCartItems(req, res) {
        console.log();
        try {
            const userCartItems = await cartServiceInstance.getCartItems(req.user.username);
            res.json(userCartItems);
        } catch (error) {
            console.log(error);
        }
    }

    async function addToCart(req, res) {
        const data = [req.params.shoeID, req.user.username, 1];
        try {
            await cartServiceInstance.addToCart(data);
            res.status(201).json({ message: "Successfully added Item to cart" });
        } catch (error) {
            console.log(error);
            res.status(501);
        }
    }

    async function removeFromCart(req, res) {
        const data = [req.params.shoeID, req.user.username];
        try {
            await cartServiceInstance.removeFromCart(data);
            res.status(201).json({ message: "Successfully removed Item from cart" });
        } catch (error) {
            console.log(error);
            res.status(501);
        }
    }

    async function updateCart(req, res) {
        const data = [req.body.quantity, req.user.username, req.params.shoeID];
        try {
            await cartServiceInstance.updateCart(data);
            res.status(201).json({ message: "Successfully updated cart" });
        } catch (error) {
            console.log(error);
            res.status(501);
        }
    }

    async function clearCart(req, res) {
        try {
            await cartServiceInstance.clearCart(req.user.username);
            res.status(201).json({ message: "Successfully cleared the cart" });
        } catch (error) {
            console.log(error);
            res.status(501);
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
