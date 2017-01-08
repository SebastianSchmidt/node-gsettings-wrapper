# node-gsettings-wrapper

[![NPM version](https://img.shields.io/npm/v/node-gsettings-wrapper.svg)](https://www.npmjs.com/package/node-gsettings-wrapper)
[![Build Status](https://travis-ci.org/SebastianSchmidt/node-gsettings-wrapper.svg?branch=master)](https://travis-ci.org/SebastianSchmidt/node-gsettings-wrapper)
[![Coverage Status](https://coveralls.io/repos/github/SebastianSchmidt/node-gsettings-wrapper/badge.svg?branch=master)](https://coveralls.io/github/SebastianSchmidt/node-gsettings-wrapper?branch=master)

Wrapper around the gsettings command line tool.


## Installation

```
npm install node-gsettings-wrapper --save
```


## Basic usage

```javascript
const { Schema, Key } = require("node-gsettings-wrapper");

// Display all available schemas:
Schema.getAll().forEach((schema) => {
  console.log(schema.getId());
});

// Display all keys of a schema:
Schema.findById("org.gtk.Demo").getKeys().forEach((key) => {
  console.log(key.getId());
});

// Display the value of a key:
const colorKey = Key.findById("org.gtk.Demo", "color");
console.log(colorKey.getValue());

// Display the values of all keys:
Schema.getAll().forEach((schema) => {
  console.log(schema.getId());
  schema.getKeys().forEach((key) => {
    console.log(" - " + key.getId() + ": " + key.getValue());
  });
});
```


## Roadmap

| Version   | Planned Features                                                     |
|-----------|----------------------------------------------------------------------|
| 0.1.x     | Get available schemas and keys.                                     |
| 0.2.x     | Get the value of a key.                                              |
| 0.3.x     | Monitor a key for changes.                                           |
| 0.4.x     | Monitor a schema for changes.                                        |
| 0.5.x     | Set the value of a key. Set the value of a key to the default value. |
| 1.0.0     | Support all gsettings commands and options.                          |
