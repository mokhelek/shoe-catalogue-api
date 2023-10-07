import express from "express";
import authController from "../controller/authController.js";
var router = express.Router();

const authControllerInstance = authController();

router.post("/register", authControllerInstance.customerRegistration);
router.post("/login", authControllerInstance.customerLogin);

export default router;
