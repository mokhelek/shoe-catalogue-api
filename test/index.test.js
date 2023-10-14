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
                brand: "Christian Louboutin",
                color: "black",
                description: "Lorem ipsum dolor sit amet. Et fugiat fugit sit officia totam in cumque",
                id: 4,
                image_url: "https://image.harrods.com/christian-louboutin-no-penny-patent-leather-loafers_19241760_43422425_300.jpg",
                price: "7000",
                shoe_name: "CL Patent Leather ",
                size: "7",
                stock_quantity: 10,
            },
        ];
        assert.deepEqual(expectedOutput, shoes);
    });

    it("Should filter shoes by brand", async function () {
        let shoes = await shoesServiceInstance.getShoesByBrand("Dr Martins");
        let expectedOutput = [
            {
                brand: "Dr Martins",
                color: "red",
                description: "Lorem ipsum dolor sit amet. Et fugiat fugit sit officia totam in cumque",
                id: 3,
                image_url: "https://img.fruugo.com/product/9/44/178237449_0340_0340.jpg",
                price: "4000",
                shoe_name: "Dr Martins 1460",
                size: "6",
                stock_quantity: 25,
            },
        ];
        assert.deepEqual(expectedOutput, shoes);
    });

    it("Should filter shoes by brand", async function () {
        let shoes = await shoesServiceInstance.getShoesByColor("brown");
        let expectedOutput = [
            {
                brand: 'GH BASS',
                color: 'brown',
                description: 'Lorem ipsum dolor sit amet. Et fugiat fugit sit officia totam in cumque',
                id: 2,
                image_url: 'https://www.johncraig.co.za/wp-content/uploads/BAS02CO-BASS-OCG-WEEJUNS-VENETIAN-LEATHER-BROWN-BA91005E-0CG-V1-600x600.jpg',
                price: '3000',
                shoe_name: 'BASS OCG WEEJUNS',
                size: '6',
                stock_quantity: 40
              },
        ];
        assert.deepEqual(expectedOutput, shoes);
    });
});
