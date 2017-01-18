import { describe, it, beforeEach, afterEach } from "mocha";
import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { stub, spy } from "sinon";

import childProcess, { spawnSync, spawn } from "child_process";

import Schema from "../src/schema";
import Key from "../src/key";

chai.use(sinonChai);

describe("Key", () => {

  beforeEach(() => {
    stub(childProcess, "spawnSync");
    stub(childProcess, "spawn");
    spawnSync.withArgs("gsettings", ["get", "org.example", "unavailable"])
      .returns({ status: 1 });
    spawnSync.withArgs("gsettings", ["get", "org.example", "available"])
      .returns({ status: 0, stdout: "Hello World!" });
  });

  afterEach(() => {
    spawnSync.restore();
    spawn.restore();
  });

  describe("#exists", () => {

    it("should throw TypeError if schemaId is not a string", () => {
      expect(() => { Key.exists(123); }).to.throw(TypeError);
    });

    it("should throw TypeError if keyId is not a string", () => {
      expect(() => { Key.exists("org.gtk.Demo", 123); }).to.throw(TypeError);
    });

    it("should return false if there is no key with the id", () => {
      expect(Key.exists("org.example", "unavailable")).to.be.false;
    });

    it("should return true if there is a key with the id", () => {
      expect(Key.exists("org.example", "available")).to.be.true;
    });

  });

  describe("#findById", () => {

    it("should return null if there is no key with the id", () => {
      expect(Key.findById("org.example", "unavailable")).to.be.null;
    });

    it("should return key object it there is a key with the id", () => {
      expect(Key.findById("org.example", "available")).to.be.an.instanceof(Key);
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
      const key = Key.findById("org.example", "available");
      expect(key.getValue()).to.be.equal("Hello World!");
    });

  });

  describe("#addListener", () => {

    let key;
    let process;

    beforeEach(() => {

      key = Key.findById("org.example", "available");

      process = {
        status: 0,
        stdout: {
          on: (event, callback) => {
            callback("available: 'Hello World!'");
          }
        },
        kill: spy()
      };

      spawn.withArgs("gsettings", ["monitor", "org.example", "available"])
        .returns(process);

    });

    it("should call listener with changed value", () => {
      const listener = spy();
      key.addListener(listener);
      expect(listener).to.have.been.calledWith(key, "Hello World!");
    });

    it("should return a function that removes listener", () => {
      const removeListener = key.addListener(spy());
      removeListener();
      expect(process.kill).to.have.been.calledOnce;
    });

    it("should throw TypeError if listener is not a function", () => {
      expect(() => { key.addListener(123); }).to.throw(TypeError);
    });

    it("should return a function", () => {
      expect(key.addListener(spy())).to.be.a("function");
    });

  });

});
