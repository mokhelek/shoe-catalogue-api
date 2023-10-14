import assert from "assert";
import pgPromise from "pg-promise";
import "dotenv/config";
import shoesService from "../services/shoes.js";

const connection = process.env.DATABASE_URL_TEST;

const db = pgPromise()(connection);
db.connect();

let shoesServiceInstance = shoesService(db);

describe("The shoe catalogue", function () {
    this.timeout(10000);
    beforeEach(async function () {
        try {
            await db.none("DELETE FROM shopping_cart");
        } catch (err) {
            console.log(err);
        }
    });

    it("Should return a list of all shoes", async function () {
        let shoes = await shoesServiceInstance.getAllShoes();
        assert.equal(6, shoes.length);
    });

    it("Should return a list of searched shoes", async function () {
        let shoes = await shoesServiceInstance.getSearchedShoes("Leather");
        let expectedOutput = [
            {
                brand: 'Christian Louboutin',
                color: 'black',
                description: 'Lorem ipsum dolor sit amet. Et fugiat fugit sit officia totam in cumque',
                id: 4,
                image_url: 'https://image.harrods.com/christian-louboutin-no-penny-patent-leather-loafers_19241760_43422425_300.jpg',
                price: '7000',
                shoe_name: 'CL Patent Leather ',
                size: '7',
                stock_quantity: 10
              }
            
        ]
        assert.deepEqual(expectedOutput, shoes);
    });

});
