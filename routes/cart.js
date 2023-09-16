import express from "express";
import db from "../model/db.js";
import cartService from "../services/cart.js";

var router = express.Router();

let cartServiceInstance = cartService(db);


router.get("/:username", cartServiceInstance.getCartItems );
router.post("/:username/add-to-cart/:shoeID", cartServiceInstance.addToCart );
router.post("/:username/remove-from-cart/:shoeID", cartServiceInstance.removeFromCart );

export default router;