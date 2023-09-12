import express from "express";
import db from "../model/db.js";
import cartService from "../services/cart.js";

var router = express.Router();

let cartServiceInstance = cartService(db);


router.get("/", cartServiceInstance.getCartItems );

export default router;