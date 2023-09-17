import express from "express";
import authController from "../controller/authController.js";

const authControllerInstance = authController();
var router = express.Router();


router.post("/register", authControllerInstance.customerRegistration );
router.post("/login", authControllerInstance.customerLogin );

// router.get("/logout", authServiceInstance.userLogout );

export default router ;