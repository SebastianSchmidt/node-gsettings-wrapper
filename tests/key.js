import { describe, it } from "mocha";
import { expect } from "chai";

import Schema from "../src/schema";
import Key from "../src/key";

describe("Key", () => {

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

});
