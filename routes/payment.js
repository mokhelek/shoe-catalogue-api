import express from "express";
import payController from "../controller/payController.js";
var router = express.Router();
import jwt from "jsonwebtoken";


const payControllerInstance = payController();



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



router.post("/", authenticateToken, payControllerInstance.payment );



export default router ;