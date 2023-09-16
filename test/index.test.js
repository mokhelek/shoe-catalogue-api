import assert from "assert";
import pgPromise from "pg-promise";
import "dotenv/config";


describe("The basic database web app", function () {
    this.timeout(10000);
   
    it("Testing Tests functionality", async function () {

        assert.equal(1, 1);
    });

});