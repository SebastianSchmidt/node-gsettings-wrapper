import { describe, it } from "mocha";
import { expect } from "chai";

import { transformOutputToArray } from "../src/utils";

describe("Utils", () => {

  describe("transformOutputToArray", () => {

    it("should split output between line breaks", () => {
      const output = "Lorem Ipsum\nHello World";
      const expected = ["Lorem Ipsum", "Hello World"];
      expect(transformOutputToArray(output)).to.deep.equal(expected);
    });

    it("should ignore empty lines", () => {
      const output = "Lorem Ipsum\n\nHello World\n";
      const expected = ["Lorem Ipsum", "Hello World"];
      expect(transformOutputToArray(output)).to.deep.equal(expected);
    });

    it("should return an empty array if output is an empty string", () => {
      expect(transformOutputToArray("")).to.be.an.instanceof(Array);
    });

    it("should return an empty array if output is null", () => {
      expect(transformOutputToArray(null)).to.be.an.instanceof(Array);
    });

    it("should return an empty array if output is undefined", () => {
      expect(transformOutputToArray()).to.be.an.instanceof(Array);
    });

  });

});
