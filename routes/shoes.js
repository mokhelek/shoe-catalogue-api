import express from "express";
import db from "../model/db.js";
import shoesService from "../services/shoes.js";

var router = express.Router();

let shoeServiceInstance = shoesService(db);


router.get("/", shoeServiceInstance.getAllShoes );

router.get("/brand/:brandName", shoeServiceInstance.getShoesByBrand);

router.get("/size/:shoeSize",shoeServiceInstance.getShoesBySize );

router.get("/color/:shoeColor",shoeServiceInstance.getShoesByColor );

router.get("/brand/:brandName/size/:shoeSize", shoeServiceInstance.getShoesBySizeBrand );

router.get("/size/:shoeSize/color/:shoeColor", shoeServiceInstance.getShoesBySizeColor );

router.get("/brand/:brandName/size/:shoeSize/color/:shoeColor", shoeServiceInstance.getShoesBySizeBrandColor );

router.post("/", shoeServiceInstance.addShoes );

router.post("/sold/:id", shoeServiceInstance.updateStock);


export default router;