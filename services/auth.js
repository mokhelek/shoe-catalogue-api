export default function authService(db) {
    async function customerRegistration(data) {
        await db.none("INSERT INTO customer(username, password, email) VALUES($1, $2, $3)", data);
    }

    async function customerLogin(username) {
        const customer = await db.oneOrNone("SELECT * FROM customer WHERE username = $1", username);
        return customer;
    }

    async function adminLogin(username) {
        const admin = await db.oneOrNone("SELECT * FROM admin WHERE username = $1", username);
        return admin;
    }

    return {
        customerRegistration,
        customerLogin,
        adminLogin,
    };
}
