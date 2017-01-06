import { spawnSync } from "child_process";

export default class Schema {

  static getAll() {

    const process = spawnSync("gsettings", ["list-schemas"]);
    const output = process.stdout.toString();

    const ids = output.split("\n").filter((value) => {
      return value !== "";
    });

    return ids.map((id) => {
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
