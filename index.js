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



let PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App starting on port", PORT);
});