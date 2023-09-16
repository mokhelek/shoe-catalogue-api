import express from "express";
import db from "../model/db.js";
import authService from "../services/auth.js";


const authServiceInstance = authService(db);
var router = express.Router();


router.post("/login",authServiceInstance.userLogin );
router.post("/register", authServiceInstance.userRegistration );
router.get("/logout", authServiceInstance.userLogout );

export default router ;