import { describe, it, beforeEach, afterEach } from "mocha";
import chai, { expect } from "chai";
import { stub, spy } from "sinon";
import sinonChai from "sinon-chai";

import childProcess, { spawnSync, spawn } from "child_process";

import Schema from "../src/schema";
import Key from "../src/key";

chai.use(sinonChai);

describe("Schema", () => {

  beforeEach(() => {

    stub(childProcess, "spawnSync");
    stub(childProcess, "spawn");

    spawnSync.withArgs("gsettings", ["list-schemas"])
      .returns({ status: 0, stdout: "org.example\norg.lorem.ipsum\n" });

    spawnSync.withArgs("gsettings", ["list-keys", "org.example"])
      .returns({ status: 0, stdout: "hello\nworld\n" });
    spawnSync.withArgs("gsettings", ["list-keys", "unavailable"])
      .returns({ status: 1 });

    spawnSync.withArgs("gsettings", ["get", "org.example", "unavailable"])
      .returns({ status: 1 });
    spawnSync.withArgs("gsettings", ["get", "org.example", "available"])
      .returns({ status: 0, stdout: "Hello World!" });

  });

  afterEach(() => {
    spawnSync.restore();
    spawn.restore();
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

  describe("#containsKey", () => {

    it("should return true if schema contains key", () => {
      const schema = Schema.findById("org.example");
      expect(schema.containsKey("available")).to.be.true;
    });

    it("should return false if schema does not contain key", () => {
      const schema = Schema.findById("org.example");
      expect(schema.containsKey("unavailable")).to.be.false;
    });

    it("should throw TypeError if keyId is not a string", () => {
      const schema = Schema.findById("org.example");
      expect(() => { schema.containsKey(123); }).to.throw(TypeError);
    });

  });

  describe("#addListener", () => {

    let schema;
    let key;
    let process;

    beforeEach(() => {

      schema = Schema.findById("org.example");
      key = new Key(schema, "message");

      process = {
        status: 0,
        stdout: {
          on: (event, callback) => {
            callback("message: 'Hello World!'");
          }
        },
        kill: spy()
      };

      spawn.withArgs("gsettings", ["monitor", "org.example"])
        .returns(process);

    });

    it("should call listener with changed key and value", () => {
      const listener = spy();
      schema.addListener(listener);
      expect(listener).to.have.been.calledWith(key, "Hello World!");
    });

    it("should return a function that removes listener", () => {
      const removeListener = schema.addListener(spy());
      removeListener();
      expect(process.kill).to.have.been.calledOnce;
    });

    it("should throw TypeError if listener is not a function", () => {
      expect(() => { schema.addListener(123); }).to.throw(TypeError);
    });

    it("should return a function", () => {
      expect(schema.addListener(spy())).to.be.a("function");
    });

  });

});
