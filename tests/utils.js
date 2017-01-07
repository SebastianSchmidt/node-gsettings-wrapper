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

  });

});
