import { describe, it } from "mocha";
import { expect } from "chai";

import Schema from "../src/schema";
import Key from "../src/key";

describe("Schema", () => {

  describe("#getAll", () => {

    it("should return array", () => {
      expect(Schema.getAll()).to.be.an.instanceof(Array);
    });

    it("should return array which contains schemas", () => {
      const schema = Schema.findById("org.gtk.Demo");
      expect(Schema.getAll()).to.contain(schema);
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
      expect(Schema.exists("org.gtk.Demo")).to.be.true;
    });

  });

  describe("#findById", () => {

    it("should return null if there is no schema with the id", () => {
      expect(Schema.findById("unavailable")).to.be.null;
    });

    it("should return schema object it there is a schema with the id", () => {
      expect(Schema.findById("org.gtk.Demo"))
        .to.be.an.instanceof(Schema);
    });

  });

  describe("#getId", () => {

    it("should return schema id", () => {
      const id = "org.gtk.Demo";
      const schema = Schema.findById(id);
      expect(schema.getId()).to.be.equal(id);
    });

  });

  describe("#getKeys", () => {

    it("should return array", () => {
      const schema = Schema.findById("org.gtk.Demo");
      expect(schema.getKeys()).to.be.an.instanceof(Array);
    });

    it("should return array which contains keys", () => {
      const schema = Schema.findById("org.gtk.Demo");
      const expectedKey = new Key(schema, "color");
      expect(schema.getKeys()).to.contain(expectedKey);
    });

  });

});
