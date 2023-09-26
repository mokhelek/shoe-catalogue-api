import express from "express";
import shoesController from "../controller/shoesController.js";
var router = express.Router();
import jwt from "jsonwebtoken";

let shoesControllerInstance = shoesController();

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

router.get("/", shoesControllerInstance.getAllShoes);

router.get("/brand/:brandName", shoesControllerInstance.getShoesByBrand);

router.get("/size/:shoeSize", shoesControllerInstance.getShoesBySize);

router.get("/color/:shoeColor", shoesControllerInstance.getShoesByColor);

router.get("/brand/:brandName/size/:shoeSize", shoesControllerInstance.getShoesBySizeBrand);

router.get("/size/:shoeSize/color/:shoeColor", shoesControllerInstance.getShoesBySizeColor);

router.get("/brand/:brandName/color/:shoeColor", shoesControllerInstance.getShoesByBrandColor);

router.get("/brand/:brandName/size/:shoeSize/color/:shoeColor", shoesControllerInstance.getShoesBySizeBrandColor);

router.post("/", authenticateToken, shoesControllerInstance.addShoes);

router.post("/sold/:id", shoesControllerInstance.updateStock);

export default router;
