import express from "express";
import cartController from "../controller/cartController.js";
import jwt from "jsonwebtoken";

var router = express.Router();

let cartControllerInstance = cartController();

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401);
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
            if (err) {
                return res.status(403);
            } else {
                req.user = user;
                next();
            }
        });
    }
}

router.get("/", authenticateToken, cartControllerInstance.getCartItems);
router.post("/add-to-cart/:shoeID", authenticateToken, cartControllerInstance.addToCart);
router.post("/remove-from-cart/:shoeID", authenticateToken, cartControllerInstance.removeFromCart);
router.post("/update-cart/:shoeID", authenticateToken, cartControllerInstance.updateCart);

export default router;
