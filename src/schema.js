import { spawnSync, spawn } from "child_process";

import { transformOutputToArray } from "./utils";
import Key from "./key";
import parseKeyValue from "./parse-key-value";

export default class Schema {

  static getAll() {

    const process = spawnSync("gsettings", ["list-schemas"]);
    const output = transformOutputToArray(process.stdout);

    return output.map((id) => {
      return new Schema(id);
    });

  }

  static exists(id) {

    if (typeof id !== "string") {
      throw new TypeError("id is not a string.");
    }

    const process = spawnSync("gsettings", ["list-keys", id]);
    const exitCode = process.status;

    return exitCode === 0;

  }

  static findById(id) {

    if (!Schema.exists(id)) {
      return null;
    }

    return new Schema(id);

  }

  constructor(id) {
    this._id = id;
  }

  getId() {
    return this._id;
  }

  getKeys() {

    const process = spawnSync("gsettings", ["list-keys", this._id]);
    const output = transformOutputToArray(process.stdout);

    return output.map((id) => {
      return new Key(this, id);
    });

  }

  addListener(listener) {

    if (typeof listener !== "function") {
      throw new TypeError("listener is not a function.");
    }

    const process = spawn("gsettings", ["monitor", this.getId()]);

    process.stdout.on("data", (data) => {

      const dataTrimmed = data.toString().trim();
      const separator = dataTrimmed.indexOf(":");

      const keyId = dataTrimmed.substring(0, separator);
      const key = new Key(this, keyId);

      const unparsedValue = dataTrimmed.substring(separator + 1);
      const value = parseKeyValue(unparsedValue);

      listener(key, value);

    });

    return () => {
      process.kill();
    };

  }

}
