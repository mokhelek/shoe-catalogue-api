import express from "express";
import cartController from "../controller/cartController.js";
import cors from "cors"

var router = express.Router();
router.use(cors());

let cartControllerInstance = cartController();

router.get("/:username", cartControllerInstance.getCartItems);
router.post("/:username/add-to-cart/:shoeID", cartControllerInstance.addToCart);
router.post("/:username/remove-from-cart/:shoeID", cartControllerInstance.removeFromCart);

export default router;
