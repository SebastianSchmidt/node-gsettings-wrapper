export function parseKeyValue(output) {

  if (output === null || output === undefined) {
    return null;
  }

  let value = output.toString().trim();

  let result = value;

  switch (detectValueType(value)) {
    case TYPE_STRING:
      result = parseString(value);
      break;
    case TYPE_NUMBER:
      result = parseNumber(value);
      break;
    case TYPE_BOOLEAN:
      result = parseBoolean(value);
      break;
    case TYPE_ARRAY:
      result = parseArray(value);
      break;
    case TYPE_TUPLE:
      result = parseTuple(value);
      break;
  }

  return result;

}


// Detect type:

const TYPE_STRING = Symbol("String");
const TYPE_NUMBER = Symbol("Number");
const TYPE_BOOLEAN = Symbol("Boolean");
const TYPE_ARRAY = Symbol("Array");
const TYPE_TUPLE = Symbol("Tuple");
const TYPE_UNKNOWN = Symbol("unknown");

function detectValueType(output) {

  let value = output.toString().trim();

  if (isString(value)) {
    return TYPE_STRING;
  } else if (isNumber(value)) {
    return TYPE_NUMBER;
  } else if (isBoolean(value)) {
    return TYPE_BOOLEAN;
  } else if (isArray(value)) {
    return TYPE_ARRAY;
  } else if (isTuple(value)) {
    return TYPE_TUPLE;
  } else {
    return TYPE_UNKNOWN;
  }

}


// String:

function isString(value) {
  return value.startsWith("'") && value.endsWith("'");
}

function parseString(value) {
  return value.substring(1, value.length - 1);
}


// Number:

function isNumber(value) {
  return !isNaN(value);
}

function parseNumber(value) {
  return Number(value);
}


// Boolean:

function isBoolean(value) {
  return value === "true" || value === "false";
}

function parseBoolean(value) {
  return value === "true";
}


// Array:

function isArray(value) {
  return (value.startsWith("[") && value.endsWith("]")) ||
         (value.startsWith("@a") && value.endsWith("[]"));
}

function parseArray(value) {
  return parseTuple(value);
}


// Tuple:

function isTuple(value) {
  return value.startsWith("(") && value.endsWith(")");
}

function parseTuple(value) {

  const withoutBrackets = value.substring(1, value.length - 1);

  let result = [];
  let currentValue = null;

  withoutBrackets.split(",").forEach((value) => {

    if (currentValue === null) {
      currentValue = value;
    } else {
      currentValue += "," + value;
    }

    let type = detectValueType(currentValue);

    if (type !== TYPE_UNKNOWN) {
      result.push(parseKeyValue(currentValue));
      currentValue = null;
    }

  });

  return result;

}
