import Schema from "./schema";

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

}
