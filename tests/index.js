import { describe, it } from "mocha";
import { expect } from "chai";

import GSettings from "../src/index";

describe("GSettings", () => {

  it("should export object as default", () => {
    expect(GSettings).to.be.an("object");
  });

  it("should export Schema", () => {
    expect(GSettings.Schema).to.be.a("function");
  });

  it("should export Key", () => {
    expect(GSettings.Key).to.be.a("function");
  });

});
