import bcrypt from "bcrypt";

export default function authService(db) {

    async function customerRegistration(req, res) {
        const { username, password, email } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.none("INSERT INTO customer(username, password, email) VALUES($1, $2, $3)", [username, hashedPassword, email]);
            // todo: -> redirect to login page
        } catch (error) {
            console.log(error)
   
        }
    }

    return {
        customerRegistration
    }
}