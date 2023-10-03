import express from "express";
import payController from "../controller/payController.js";
var router = express.Router();

const payControllerInstance = payController();

router.post("/", payControllerInstance.payment );



export default router ;