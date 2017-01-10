import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import { stub } from "sinon";

import childProcess, { spawnSync } from "child_process";

import isAvailable from "../src/is-available";

describe("isAvailable", () => {

  beforeEach(() => {
    stub(childProcess, "spawnSync");
  });

  afterEach(() => {
    spawnSync.restore();
  });

  it("should return true if gsettings is available", () => {
    spawnSync.withArgs("gsettings", ["help"]).returns({ status: 0 });
    expect(isAvailable()).to.be.true;
  });

  it("should return false if gsettings is not available", () => {
    spawnSync.withArgs("gsettings", ["help"]).returns({ status: 1 });
    expect(isAvailable()).to.be.false;
  });

});
