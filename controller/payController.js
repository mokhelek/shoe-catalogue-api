import payService from "../services/payment.js";
import db from "../model/db.js";

let payServiceInstance = payService(db)

export default function payController() {

    async function payment(req, res) {
        console.log("-----------------", req.user.username)
        try {
            await payServiceInstance.makePayment(req.user.username)
            res.status(201).json({ message: "Successfully made payment" });
        } catch (error) {
            console.log(error);
        }
    }

    return {
        payment
    }
}