import cartService from "./cart.js";

export default function payService(db) {
    let cartServiceInstance = cartService(db);

    async function makePayment(user) {
        // * Get the cart items (shoe_id and the Quantity)

        let cartItems = await cartServiceInstance.getCartItems(user);
        for (let i of cartItems) {
            await db.none("UPDATE shoes_stock SET stock_quantity = $1 WHERE shoes_stock.id = $2", [Number(i.stock_quantity) - Number(i.quantity), i.id]);
        }

        await db.none("DELETE FROM shopping_cart WHERE shopping_cart.username = $1 ", [user]);
    }

    return {
        makePayment,
    };
}
