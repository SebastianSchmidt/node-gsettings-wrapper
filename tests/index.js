import { describe, it } from "mocha";
import { expect } from "chai";

import GSettings from "../src/index";
import Schema from "../src/schema";

describe("GSettings", () => {

  it("should export object as default", () => {
    expect(GSettings).to.be.an("object");
  });

  it("should export Schema", () => {
    expect(GSettings.Schema).to.be.an("function");
  });

});
