import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import { stub } from "sinon";

import childProcess, { spawnSync } from "child_process";

import Schema from "../src/schema";
import Key from "../src/key";

describe("Schema", () => {

  beforeEach(() => {

    stub(childProcess, "spawnSync");

    spawnSync.withArgs("gsettings", ["list-schemas"])
      .returns({ status: 0, stdout: "org.example\norg.lorem.ipsum\n" });

    spawnSync.withArgs("gsettings", ["list-keys", "org.example"])
      .returns({ status: 0, stdout: "hello\nworld\n" });
    spawnSync.withArgs("gsettings", ["list-keys", "unavailable"])
      .returns({ status: 1 });

  });

  afterEach(() => {
    spawnSync.restore();
  });

  describe("#getAll", () => {

    it("should return array", () => {
      expect(Schema.getAll()).to.be.an.instanceof(Array);
    });

    it("should return array which contains schemas", () => {
      const expectedSchemas = [
        new Schema("org.example"),
        new Schema("org.lorem.ipsum")
      ];
      expect(Schema.getAll()).to.deep.equal(expectedSchemas);
    });

  });

  describe("#exists", () => {

    it("should throw TypeError if id is not a string", () => {
      expect(() => { Schema.exists(123); }).to.throw(TypeError);
    });

    it("should return false if there is no schema with the id", () => {
      expect(Schema.exists("unavailable")).to.be.false;
    });

    it("should return true if there is a schema with the id", () => {
      expect(Schema.exists("org.example")).to.be.true;
    });

  });

  describe("#findById", () => {

    it("should return null if there is no schema with the id", () => {
      expect(Schema.findById("unavailable")).to.be.null;
    });

    it("should return schema object it there is a schema with the id", () => {
      expect(Schema.findById("org.example")).to.be.an.instanceof(Schema);
    });

  });

  describe("#getId", () => {

    it("should return schema id", () => {
      const id = "org.example";
      const schema = Schema.findById(id);
      expect(schema.getId()).to.be.equal(id);
    });

  });

  describe("#getKeys", () => {

    it("should return array", () => {
      const schema = Schema.findById("org.example");
      expect(schema.getKeys()).to.be.an.instanceof(Array);
    });

    it("should return array which contains keys", () => {
      const schema = Schema.findById("org.example");
      const expectedKeys = [
        new Key(schema, "hello"),
        new Key(schema, "world")
      ];
      expect(schema.getKeys()).to.deep.equal(expectedKeys);
    });

  });

});
