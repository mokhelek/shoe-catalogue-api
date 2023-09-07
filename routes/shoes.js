import express from "express";
import db from "../model/db.js";
import shoesService from "../services/shoes.js";

var router = express.Router();

let shoeServiceInstance = shoesService(db);


router.get("/", shoeServiceInstance.getAllShoes );

router.get("/brand/:brandName", shoeServiceInstance.getShoesByBrand);

router.get("/size/:shoeSize", async (req, res) => {
    try {
        let shoesListBySize = await db.any("SELECT * FROM shoes_stock WHERE size = $1", req.params.shoeSize);
        res.status(200).json(shoesListBySize);
    } catch (error) {
        console.log(error);
    }
});

router.get("/brand/:brandName/size/:shoeSize", async (req, res) => {
    try {
        let shoesListByBrandSize = await db.any("SELECT * FROM shoes_stock WHERE size = $1 AND brand = $2", [req.params.shoeSize, req.params.brandName]);
        res.status(200).json(shoesListByBrandSize);
    } catch (error) {
        console.log(error);
    }
});

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