import { spawnSync } from "child_process";

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

}
