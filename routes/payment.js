import express from "express";
import payController from "../controller/payController.js";
var router = express.Router();
import authenticateToken from "../middlewares/auth.js";

const payControllerInstance = payController();


router.post("/", authenticateToken, payControllerInstance.payment);

export default router;
