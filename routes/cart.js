import express from "express";
import cartController from "../controller/cartController.js";
import jwt  from "jsonwebtoken";

var router = express.Router();

let cartControllerInstance = cartController();


function authenticateToken(res, req, next){
    console.log(req)
    const authHeader = req.headers['Authorization']
    const token = authHeader && authHeader.spilt(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err,user)=>{
        if (err) return res.sendStatus(403)

        req.user = user
        next()
    })

    next()
}


router.get("/", authenticateToken, cartControllerInstance.getCartItems);
router.post("/add-to-cart/:shoeID", cartControllerInstance.addToCart);
router.post("/:username/remove-from-cart/:shoeID", cartControllerInstance.removeFromCart);

export default router;
