import { spawnSync, spawn } from "child_process";

import Schema from "./schema";
import parseKeyValue from "./parse-key-value";

export default class Key {

  static exists(schemaId, keyId) {

    if (typeof schemaId !== "string") {
      throw new TypeError("schemaId is not a string.");
    }

    if (typeof keyId !== "string") {
      throw new TypeError("keyId is not a string.");
    }

    const process = spawnSync("gsettings", ["get", schemaId, keyId]);
    const exitCode = process.status;

    return exitCode === 0;

  }

  static findById(schemaId, keyId) {

    if (!Key.exists(schemaId, keyId)) {
      return null;
    }

    return new Key(new Schema(schemaId), keyId);

  }

  constructor(schema, id) {

    if (!(schema instanceof Schema)) {
      throw new TypeError("schema is not a Schema.");
    }

    if (typeof id !== "string") {
      throw new TypeError("id is not a string.");
    }

    this._schema = schema;
    this._id = id;

  }

  getSchema() {
    return this._schema;
  }

  getId() {
    return this._id;
  }

  getValue() {
    const process = spawnSync("gsettings",
      ["get", this._schema.getId(), this.getId()]);
    return parseKeyValue(process.stdout);
  }

  addListener(listener) {

    if (typeof listener !== "function") {
      throw new TypeError("listener is not a function.");
    }

    const schemaId = this._schema.getId();
    const keyId = this.getId();

    const process = spawn("gsettings", ["monitor", schemaId, keyId]);

    process.stdout.on("data", (data) => {
      const unparsedValue = data.toString().trim().replace(keyId + ":", "");
      const value = parseKeyValue(unparsedValue);
      listener(this, value);
    });

    return () => {
      process.kill();
    };

  }

}
