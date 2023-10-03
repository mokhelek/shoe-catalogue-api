export default function payService(db) {


    async function makePayment(user) {
        // todo : update the carts
        await db.none("DELETE FROM shopping_cart WHERE shopping_cart.username = $1 ",[user]); 
    }


    return {
        makePayment
    }
}