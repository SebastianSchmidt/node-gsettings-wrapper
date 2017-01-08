import { describe, it } from "mocha";
import { expect } from "chai";

import { parseKeyValue } from "../src/parse-key-value";

describe("parseKeyValue", () => {

  describe("String", () => {

    it("should return string", () => {
      expect(parseKeyValue("'Hello World'")).to.be.a("string");
    });

    it("should return parsed string without surrounding quotes", () => {
      expect(parseKeyValue("'Hello World'")).to.equal("Hello World");
    });

  });

  describe("Number", () => {

    it("should return number", () => {
      expect(parseKeyValue("123")).to.be.a("number");
    });

    it("should return parsed positive number", () => {
      expect(parseKeyValue("123")).to.equal(123);
    });

    it("should return parsed negative number", () => {
      expect(parseKeyValue("-123")).to.equal(-123);
    });

  });

  describe("Boolean", () => {

    it("should return boolean", () => {
      expect(parseKeyValue("true")).to.be.a("boolean");
    });

    it("should return true", () => {
      expect(parseKeyValue("true")).to.be.true;
    });

    it("should return false", () => {
      expect(parseKeyValue("false")).to.be.false;
    });

  });

  describe("Array", () => {

    it("should return array", () => {
      expect(parseKeyValue("[123, 456]")).to.be.an.instanceof(Array);
    });

    it("should return array of numbers", () => {
      const expected = [123, 456, 789];
      expect(parseKeyValue("[123, 456, 789]")).to.deep.equal(expected);
    });

    it("should return array of strings", () => {
      const expected = ["Hello, ", "world!"];
      expect(parseKeyValue("['Hello, ', 'world!']")).to.deep.equal(expected);
    });

    it("should return array of boolean values", () => {
      const expected = [true, false, true];
      expect(parseKeyValue("[true, false, true]")).to.deep.equal(expected);
    });

    it("should return array of arrays of numbers", () => {
      const expected = [[123, 456], [789, 123]];
      expect(parseKeyValue("[[123, 456], [789, 123]]")).to.deep.equal(expected);
    });

    it("should return array of arrays of strings", () => {
      const expected = [["Hello, ", "wonderful "], ["world", "!"]];
      expect(parseKeyValue("[['Hello, ', 'wonderful '], ['world', '!']]"))
        .to.deep.equal(expected);
    });

    it("should return empty array if @as []", () => {
      const expected = [];
      expect(parseKeyValue("@as []")).to.deep.equal(expected);
    });

    it("should return empty array if @a(ss) []", () => {
      const expected = [];
      expect(parseKeyValue("@a(ss) []")).to.deep.equal(expected);
    });

    it("should return array of empty arrays", () => {
      const expected = [[], [], []];
      expect(parseKeyValue("[@as [], @as [], @as []]")).to.deep.equal(expected);
    });

  });

  describe("Tuple", () => {

    it("should return array", () => {
      expect(parseKeyValue("(123, 456)")).to.be.an.instanceof(Array);
    });

    it("should return array of numbers", () => {
      const expected = [123, 456, 789];
      expect(parseKeyValue("(123, 456, 789)")).to.deep.equal(expected);
    });

    it("should return array of strings", () => {
      const expected = ["Hello, ", "world!"];
      expect(parseKeyValue("('Hello, ', 'world!')")).to.deep.equal(expected);
    });

    it("should return array of boolean values", () => {
      const expected = [true, false, true];
      expect(parseKeyValue("(true, false, true)")).to.deep.equal(expected);
    });

    it("should return array of arrays of numbers", () => {
      const expected = [[123, 456], [789, 123]];
      expect(parseKeyValue("((123, 456), (789, 123))")).to.deep.equal(expected);
    });

    it("should return array of arrays of strings", () => {
      const expected = [["Hello, ", "wonderful "], ["world", "!"]];
      expect(parseKeyValue("(('Hello, ', 'wonderful '), ('world', '!'))"))
        .to.deep.equal(expected);
    });

  });

  describe("Other", () => {

    it("should return null if output is null", () => {
      expect(parseKeyValue(null)).to.be.null;
    });

    it("should return null if output is undefined", () => {
      expect(parseKeyValue()).to.be.null;
    });

  });

});
