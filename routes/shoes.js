import express from "express";
import shoesController from "../controller/shoesController.js";
var router = express.Router();

let shoesControllerInstance = shoesController();

router.get("/", shoesControllerInstance.getAllShoes);

router.get("/brand/:brandName", shoesControllerInstance.getShoesByBrand);

router.get("/size/:shoeSize", shoesControllerInstance.getShoesBySize);

router.get("/color/:shoeColor", shoesControllerInstance.getShoesByColor);

router.get("/brand/:brandName/size/:shoeSize", shoesControllerInstance.getShoesBySizeBrand);

router.get("/size/:shoeSize/color/:shoeColor", shoesControllerInstance.getShoesBySizeColor);

router.get("/brand/:brandName/color/:shoeColor", shoesControllerInstance.getShoesByBrandColor);

router.get("/brand/:brandName/size/:shoeSize/color/:shoeColor", shoesControllerInstance.getShoesBySizeBrandColor);

router.post("/", shoesControllerInstance.addShoes);

router.post("/sold/:id", shoesControllerInstance.updateStock);

export default router;
