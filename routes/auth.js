import express from "express";
import authController from "../controller/authController.js";
import cors from "cors"
const authControllerInstance = authController();
var router = express.Router();

router.use(cors());

router.post("/register", authControllerInstance.customerRegistration );
router.post("/login", authControllerInstance.customerLogin );

// router.get("/logout", authServiceInstance.userLogout );

export default router ;