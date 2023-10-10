import express from "express";
import cartController from "../controller/cartController.js";
import authenticateToken from "../middlewares/auth.js";

var router = express.Router();

let cartControllerInstance = cartController();



router.get("/", authenticateToken, cartControllerInstance.getCartItems);
router.get("/clear-cart", authenticateToken, cartControllerInstance.clearCart);
router.post("/add-to-cart/:shoeID", authenticateToken, cartControllerInstance.addToCart);
router.post("/remove-from-cart/:shoeID", authenticateToken, cartControllerInstance.removeFromCart);
router.post("/update-cart/:shoeID", authenticateToken, cartControllerInstance.updateCart);

export default router;
