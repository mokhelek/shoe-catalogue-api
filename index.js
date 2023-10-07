import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import "dotenv/config";

import shoesRouter from "./routes/shoes.js";
import cartRouter from "./routes/cart.js";
import authRouter from "./routes/auth.js";
import payRouter from "./routes/payment.js";

import cors from "cors";

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

app.get("/", (req, res) => {
    const routes = [
        {
            Endpoint: "/api/shoes",
            method: "GET",
            description: "Returns a list of all shoes",
        },
        {
            Endpoint: "/api/shoes/brand/:brandName",
            method: "GET",
            description: "Return a list of shoes based on brand name",
        },
        {
            Endpoint: "/api/shoes/size/:shoeSize/",
            method: "GET",
            description: "Return a list of shoes based on brand name",
        },
        {
            Endpoint: "/api/shoes/brand/:brandName/size/:shoeSize",
            method: "GET",
            description: "Return a list of shoes based on brand name and shoe size",
        },
        {
            Endpoint: "/api/shoes",
            method: "POST",
            description: "Adds new shoes to the stock",
        },
        {
            Endpoint: "/api/shoes/sold/:id",
            method: "POST",
            description: "Updates stock level after shoe is sold",
        },
    ];

    res.status(200).json(routes);
});

app.use("/api/shoes", shoesRouter);
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRouter);
app.use("/api/pay", payRouter);

let PORT = process.env.PORT;
app.listen(PORT, function () {
    console.log(" 🚀 Taking off on port ", PORT);
});
