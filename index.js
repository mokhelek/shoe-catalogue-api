import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors"


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



app.get("/",(req, res) => {
    const routes = [
        {
            'Endpoint':'/api/shoes',
            'method': 'GET',
            'description': 'Returns a list of all shoes'
        },
        {
            'Endpoint': '/api/shoes/brand/:brandName',
            'method': 'GET',
            'description': 'Return a list of shoes based on brand name'
        },
        {
            'Endpoint': '/api/shoes/size/:shoeSize/',
            'method': 'GET',
            'description': 'Return a list of shoes based on brand name'
        },
        {
            'Endpoint': '/api/shoes/brand/:brandName/size/:shoeSize',
            'method': 'GET',
            'description': 'Return a list of shoes based on brand name and shoe size'
        },
        {
            'Endpoint': '/api/shoes',
            'method': 'POST',
            'description': 'Adds new shoes to the stock'
        },
        {
            'Endpoint': '/api/shoes/sold/:id',
            'method': 'POST',
            'description': 'Updates stock level after shoe is sold'
        }
    ]

    res.status(200).json(routes);
});


import shoesRouter from "./routes/shoes.js";
import cartRouter from "./routes/cart.js";

app.use("/api/shoes",shoesRouter);
app.use("/api/cart",cartRouter);

let PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log("App starting on port", PORT);
});
