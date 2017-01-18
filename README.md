# node-gsettings-wrapper

[![NPM version](https://img.shields.io/npm/v/node-gsettings-wrapper.svg)](https://www.npmjs.com/package/node-gsettings-wrapper)
[![Build Status](https://travis-ci.org/SebastianSchmidt/node-gsettings-wrapper.svg?branch=master)](https://travis-ci.org/SebastianSchmidt/node-gsettings-wrapper)
[![Coverage Status](https://coveralls.io/repos/github/SebastianSchmidt/node-gsettings-wrapper/badge.svg?branch=master)](https://coveralls.io/github/SebastianSchmidt/node-gsettings-wrapper?branch=master)

Wrapper around the gsettings command line tool.


## Installation

```
npm install node-gsettings-wrapper --save
```


## Basic Usage

```javascript
const GSettings = require("node-gsettings-wrapper");

// Check if GSettings is available:
if (!GSettings.isAvailable()) {
  console.log("The gsettings command line tool is not available.");
  process.exit(1);
}

// Display all available schemas:
GSettings.Schema.getAll().forEach((schema) => {
  console.log(schema.getId());
});

// Display all keys of a schema:
GSettings.Schema.findById("org.gtk.Demo").getKeys().forEach((key) => {
  console.log(key.getId());
});

// Display the value of a key:
const colorKey = GSettings.Key.findById("org.gtk.Demo", "color");
console.log(colorKey.getValue());

// Monitor a key for value changes:
const removeKeyListener = colorKey.addListener((key, value) => {
  console.log("New value: " + value);
});

// Terminate key monitoring after 5 seconds:
setTimeout(removeKeyListener, 5000);

// Monitor a schema for changes:
const removeSchemaListener = schema.addListener((key, value) => {
  console.log("New value: " + key.getId() + ": " + value);
});

// Terminate schema monitoring after 5 seconds:
setTimeout(removeSchemaListener, 5000);

// Display the values of all keys:
GSettings.Schema.getAll().forEach((schema) => {
  console.log(schema.getId());
  schema.getKeys().forEach((key) => {
    console.log(" - " + key.getId() + ": " + key.getValue());
  });
});
```


## Roadmap

| Version   | Planned Features                                                     |
|-----------|----------------------------------------------------------------------|
| 0.6.x     | Set the value of a key. Set the value of a key to the default value. |
| 1.0.0     | Support all gsettings commands and options.                          |
