import * as assert from "assert";

describe("Test for real numbers", () => {
    it("test if equal operator works between 2 real numbers", ()=>{
        const number1 = 1.1;
        const number2 = 2.2;
        const number3 = 1.1;
        assert.strictEqual(number1, number3);
        //assert.strictEqual(number1, number2);
    })
})