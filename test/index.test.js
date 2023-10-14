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

    it("Should filter shoes by color", async function () {
        let shoes = await shoesServiceInstance.getShoesByColor("brown");
        let expectedOutput = [
            {
                brand: "GH BASS",
                color: "brown",
                description: "Lorem ipsum dolor sit amet. Et fugiat fugit sit officia totam in cumque",
                id: 2,
                image_url: "https://www.johncraig.co.za/wp-content/uploads/BAS02CO-BASS-OCG-WEEJUNS-VENETIAN-LEATHER-BROWN-BA91005E-0CG-V1-600x600.jpg",
                price: "3000",
                shoe_name: "BASS OCG WEEJUNS",
                size: "6",
                stock_quantity: 40,
            },
        ];
        assert.deepEqual(expectedOutput, shoes);
    });

    it("Should filter shoes by size", async function () {
        let shoes = await shoesServiceInstance.getShoesBySize("8");
        let expectedOutput = [
            {
                brand: "Gucci",
                color: "green",
                description: "Lorem ipsum dolor sit amet. Et fugiat fugit sit officia totam in cumque",
                id: 1,
                image_url: "https://catalog-resize-images.thedoublef.com/9b85a5ca98152c0f1e4a1e2538b6ca2e/900/900/3079291M0C0_M_GUC-3154.b.jpg",
                price: "11000",
                shoe_name: "Gucci Loafer",
                size: "8",
                stock_quantity: 5,
            },
        ];
        assert.deepEqual(expectedOutput, shoes);
    });

    it("Should filter shoes by brand and size", async function () {
        let shoes = await shoesServiceInstance.getShoesBySizeBrand(["8", "Gucci"]);
        let expectedOutput = [
            {
                brand: "Gucci",
                color: "green",
                description: "Lorem ipsum dolor sit amet. Et fugiat fugit sit officia totam in cumque",
                id: 1,
                image_url: "https://catalog-resize-images.thedoublef.com/9b85a5ca98152c0f1e4a1e2538b6ca2e/900/900/3079291M0C0_M_GUC-3154.b.jpg",
                price: "11000",
                shoe_name: "Gucci Loafer",
                size: "8",
                stock_quantity: 5,
            },
        ];
        assert.deepEqual(expectedOutput, shoes);
    });

    it("Should filter shoes by color and size", async function () {
        let shoes = await shoesServiceInstance.getShoesBySizeColor(["6", "red"]);
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

    it("Should filter shoes by color and brand", async function () {
        let shoes = await shoesServiceInstance.getShoesByBrandColor(["Dr Martins", "red"]);
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


    it("Should filter shoes by size, color and brand", async function () {
        let shoes = await shoesServiceInstance.getShoesBySizeBrandColor(["7","Gucci", "black"]);
        let expectedOutput = [
            {
                brand: 'Gucci',
                color: 'black',
                description: 'Lorem ipsum dolor sit amet. Et fugiat fugit sit officia totam in cumque',
                id: 5,
                image_url: 'https://image.harrods.com/gucci-leather-web-stripe-loafers_16165319_36472932_300.jpg',
                price: '8000',
                shoe_name: 'Gucci Stripped Loafers',
                size: '7',
                stock_quantity: 15
              }
            
        ];
        assert.deepEqual(expectedOutput, shoes);
    });

    
    
    

});
