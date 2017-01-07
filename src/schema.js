import { spawnSync } from "child_process";
import { transformOutputToArray } from "./utils";

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

  static getById(id) {

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

}
