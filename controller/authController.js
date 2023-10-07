import bcrypt from "bcrypt";
import authService from "../services/auth.js";
import db from "../model/db.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

const authServiceInstance = authService(db);

export default function authController() {
    async function customerRegistration(req, res) {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = [username, hashedPassword, email];

        try {
            await authServiceInstance.customerRegistration(data);
            res.status(201).json({ message: "Successfully registered" });
        } catch (error) {
            console.log(error);
            res.status(401);
        }
    }

    async function customerLogin(req, res) {
        const { username, password } = req.body;

        const customer = await authServiceInstance.customerLogin(username);
        const admin = await authServiceInstance.adminLogin(username);

        if (customer) {
            const passwordMatch = await bcrypt.compare(password, customer.password);

            if (passwordMatch) {
                const user = {
                    username,
                    adminUser: false,
                };
                const userAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_KEY);
                res.json({ userAccessToken, user });
            } else {
                res.json({ userAccessToken: "" });
            }
        } else if (admin) {
            const passwordMatch = await bcrypt.compare(password, admin.password);

            if (passwordMatch) {
                const user = {
                    username,
                    adminUser: true,
                };
                const userAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_KEY);
                res.json({ userAccessToken, user });
            } else {
                res.json({ userAccessToken: "" });
            }
        } else {
            res.json({ message: "User does not exist" });
        }
    }

    return {
        customerRegistration,
        customerLogin,
    };
}
