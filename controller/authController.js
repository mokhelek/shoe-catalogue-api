import bcrypt from "bcrypt";
import authService from "../services/auth.js";
import db from "../model/db.js"

const authServiceInstance = authService(db)

export default function authController() {


    async function customerRegistration(req, res) {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = [username, hashedPassword, email]

        try {
            await authServiceInstance.customerRegistration(data);
            // todo: -> redirect to login page
            res.status(201).json({ message: "Successfully registered" });
        } catch (error) {
            console.log(error);
            res.status(401);
        }
    }

    async function customerLogin(req, res) {
        const { username, password } = req.body;

        const customer = await authServiceInstance.customerLogin(username);


        if (customer) {
            const passwordMatch = await bcrypt.compare(password, customer.password);

            if (passwordMatch) {
                // todo:-> create and send back a token
            } else {
                // todo:-> send back data to be used in frontend
            }
        }
    }

    return {
        customerRegistration,
        customerLogin
    };
}
