import { spawnSync } from "child_process";

import Schema from "./schema";
import parseKeyValue from "./parse-key-value";

export default class Key {

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
