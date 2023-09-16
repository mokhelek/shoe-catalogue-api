import bcrypt from "bcrypt";

export default function authService(db) {
    async function customerRegistration(req, res) {
        const { username, password, email } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.none("INSERT INTO customer(username, password, email) VALUES($1, $2, $3)", [username, hashedPassword, email]);
            // todo: -> redirect to login page
            res.status(201).json({ message: "Successfully registered" });
        } catch (error) {
            console.log(error);
            res.status(401);
        }
    }

    async function customerLogin(req, res) {
        const { username, password } = req.body;

        const customer = await db.oneOrNone("SELECT * FROM customer WHERE username = $1", username);


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
