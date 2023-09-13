import express from "express";
import db from "../model/db.js";
import cartService from "../services/cart.js";

var router = express.Router();

let cartServiceInstance = cartService(db);


router.get("/", cartServiceInstance.getCartItems );
router.post("/add-to-cart/:shoeID", cartServiceInstance.addToCart );

export default router;