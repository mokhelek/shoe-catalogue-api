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
        let shoesListBySize = await db.any("SELECT * FROM shoes_stock WHERE size = $1", req.params.shoeSize)
        res.status(200).json(shoesListBySize);
    }catch(error){
        console.log(error)
    }
});

app.get("/api/shoes/brand/:brandName/size/:shoeSize", async (req, res) => {
    try{
        let shoesListByBrandSize = await db.any("SELECT * FROM shoes_stock WHERE size = $1 AND brand = $2", [req.params.shoeSize, req.params.brandName] )
        res.status(200).json(shoesListByBrandSize);
    }catch(error){
        console.log(error)
    }
});


app.post("/api/shoes", async (req, res) => {
    let insertQuery = ``
    try{
        console.log(req.body.size, req.body.price)
        await db.any("SELECT * FROM shoes_stock")
        res.status(201).json({'message':'Shoes stock successfully updated'});

    }catch(error){
        console.log(error)
        res.status(401).send("invalid input")
    }
});








let PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App starting on port", PORT);
});