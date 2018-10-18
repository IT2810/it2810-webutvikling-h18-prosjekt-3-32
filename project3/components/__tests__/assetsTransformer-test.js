import React from "react";
import assetsTransformer from "../../assetsTransformer";

//Test to check if the function process works
test("Check if the function return correct value", () => {
    const test = assetsTransformer.process("","","","");
    expect(test).toEqual('module.exports = "";');
});