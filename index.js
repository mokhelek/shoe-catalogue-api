import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors"
import db from "./model/db.js";

let app = express();

app.use(
    session({
        secret: "<add a secret string here>",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.get("/api/shoes", async (req, res) => {
    try {
        let shoesList = await db.any("SELECT * FROM shoes_stock");
        res.status(200).json(shoesList);
    } catch (error) {
        console.log(error);
    }
});

app.get("/api/shoes/brand/:brandName", async (req, res) => {
    try {
        let shoesListByBrand = await db.any("SELECT * FROM shoes_stock WHERE brand = $1", req.params.brandName);
        res.status(200).json(shoesListByBrand);
    } catch (error) {
        console.log(error);
    }
});

app.get("/api/shoes/size/:shoeSize", async (req, res) => {
    try {
        let shoesListBySize = await db.any("SELECT * FROM shoes_stock WHERE size = $1", req.params.shoeSize);
        res.status(200).json(shoesListBySize);
    } catch (error) {
        console.log(error);
    }
});

app.get("/api/shoes/brand/:brandName/size/:shoeSize", async (req, res) => {
    try {
        let shoesListByBrandSize = await db.any("SELECT * FROM shoes_stock WHERE size = $1 AND brand = $2", [req.params.shoeSize, req.params.brandName]);
        res.status(200).json(shoesListByBrandSize);
    } catch (error) {
        console.log(error);
    }
});

app.post("/api/shoes", async (req, res) => {
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

app.post("/api/shoes/sold/:id", async (req, res) => {
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

let PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App starting on port", PORT);
});
