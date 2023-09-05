import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
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



app.get("/api/shoes", async (req, res) => {
    try{
        let shoesList = await db.any("SELECT * FROM shoes_stock")
        res.status(200).json(shoesList);
    }catch(error){
        console.log(error)
    }
});

app.get("/api/shoes/brand/:brandName", async (req, res) => {
    try{
        let shoesListByBrand = await db.any("SELECT * FROM shoes_stock WHERE brand = $1", req.params.brandName)
        res.status(200).json(shoesListByBrand);
    }catch(error){
        console.log(error)
    }
});

app.get("/api/shoes/size/:shoeSize", async (req, res) => {
    try{
        let shoesListByBrand = await db.any("SELECT * FROM shoes_stock WHERE size = $1", req.params.shoeSize)
        res.status(200).json(shoesListByBrand);
    }catch(error){
        console.log(error)
    }
});


let PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App starting on port", PORT);
});