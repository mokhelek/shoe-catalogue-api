import express from "express";
import db from "../model/db.js";
import shoesService from "../services/shoes.js";

var router = express.Router();

let shoeServiceInstance = shoesService(db);


router.get("/", shoeServiceInstance.getAllShoes );

router.get("/brand/:brandName", shoeServiceInstance.getShoesByBrand);

router.get("/size/:shoeSize",shoeServiceInstance.getShoesBySize );

router.get("/brand/:brandName/size/:shoeSize", shoeServiceInstance.getShoesBySizeBrand );

router.post("/", async (req, res) => {
    let insertQuery = `
    INSERT INTO shoes_stock(shoe_name, brand, size, price, image_url, color, quantity)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    `;
    try {
        await db.any(insertQuery, [req.body.shoe_name, req.body.brand, req.body.size, req.body.price, req.body.image_url, req.body.color, req.body.quantity]);
        res.status(201).json({ message: "Shoes stock successfully updated" });
    } catch (error) {
        console.log(error);
        res.status(401).send("invalid input");
    }
});

router.post("/sold/:id", async (req, res) => {
    let insertQuery = `
        UPDATE shoes_stock
        SET quantity = shoes_stock.quantity - 1 WHERE id = $1
    `;
    try {
        await db.any(insertQuery, [req.params.id]);
        res.status(201).json({ message: "Stock level update successfully" });
    } catch (error) {
        console.log(error);
        res.status(401).send("invalid input");
    }
});


export default router;