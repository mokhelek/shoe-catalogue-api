import express from "express";
import db from "../model/db.js";
import authService from "../services/auth.js";


const authServiceInstance = authService(db);
var router = express.Router();


router.post("/register", authServiceInstance.customerRegistration );
router.post("/login", authServiceInstance.userLogin );

// router.get("/logout", authServiceInstance.userLogout );

export default router ;