import express from "express";
import bodyParser from "body-parser";
import session from "express-session";

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



app.get("/api/shoes", (req, res) => {
    res.send("Something");
});



let PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App starting on port", PORT);
});