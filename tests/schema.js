import { describe, it } from "mocha";
import { expect } from "chai";

import Schema from "../src/schema";

describe("Schema", () => {

  describe("#getAll", () => {

    it("should return array", () => {
      expect(Schema.getAll()).to.be.an.instanceof(Array);
    });

    it("should return array which contains schemata", () => {
      const schema = Schema.getById("org.gnome.desktop.interface");
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
      expect(Schema.exists("org.gnome.desktop.interface")).to.be.true;
    });

  });

  describe("#getById", () => {

    it("should return null if there is no schema with the id", () => {
      expect(Schema.getById("unavailable")).to.be.null;
    });

    it("should return schema object it there is a schema with the id", () => {
      expect(Schema.getById("org.gnome.desktop.interface"))
        .to.be.an.instanceof(Schema);
    });

  });

  describe("#getId", () => {

    it("should return schema id", () => {
      const id = "org.gnome.desktop.interface";
      const schema = Schema.getById(id);
      expect(schema.getId()).to.be.equal(id);
    });

  });

});
