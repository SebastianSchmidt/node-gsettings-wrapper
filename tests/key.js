import { describe, it } from "mocha";
import { expect } from "chai";

import Schema from "../src/schema";
import Key from "../src/key";

describe("Key", () => {

  describe("#exists", () => {

    it("should throw TypeError if schemaId is not a string", () => {
      expect(() => { Key.exists(123); }).to.throw(TypeError);
    });

    it("should throw TypeError if keyId is not a string", () => {
      expect(() => { Key.exists("org.gtk.Demo", 123); }).to.throw(TypeError);
    });

    it("should return false if there is no key with the id", () => {
      expect(Key.exists("org.gtk.Demo", "unavailable")).to.be.false;
    });

    it("should return true if there is a key with the id", () => {
      expect(Key.exists("org.gtk.Demo", "color")).to.be.true;
    });

  });

  describe("#findById", () => {

    it("should return null if there is no key with the id", () => {
      expect(Key.findById("org.gtk.Demo", "unavailable")).to.be.null;
    });

    it("should return key object it there is a key with the id", () => {
      expect(Key.findById("org.gtk.Demo", "color")).to.be.an.instanceof(Key);
    });

  });

  describe("#constructor", () => {

    it("should throw TypeError if schema is not a Schema", () => {
      expect(() => { new Key("Hello", "World"); }).to.throw(TypeError);
    });

    it("should throw TypeError if id is not a string", () => {
      const schema = new Schema("org.gtk.Demo");
      expect(() => { new Key(schema, 123); }).to.throw(TypeError);
    });

  });

  describe("#getSchema", () => {

    it("should return assigned schema", () => {
      const schema = new Schema("org.gtk.Demo");
      const key = new Key(schema, "fullscreen");
      expect(key.getSchema()).to.equal(schema);
    });

  });

  describe("#getId", () => {

    it("should return id", () => {
      const id = "fullscreen";
      const key = new Key(new Schema("org.gtk.Demo"), id);
      expect(key.getId()).to.equal(id);
    });

  });

  describe("#getValue", () => {

    it("should return parsed value", () => {
      const key = Key.findById("org.gtk.Demo", "color");
      expect(key.getValue()).to.be.a("string");
    });

  });

});
