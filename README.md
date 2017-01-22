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

// Get a schema by ID:
const schema = GSettings.Schema.findById("org.gnome.desktop.interface");

// Get a key of a schema by ID:
let animationsKey = schema.findKeyById("enable-animations");

// Other way to get a key:
animationsKey = GSettings.Key.findById(
        "org.gnome.desktop.interface", "enable-animations");

// Display the value of a key:
console.log("enable-animations: " + animationsKey.getValue());

// Monitor a key for value changes:
const removeKeyListener = animationsKey.addListener((key, value) => {
  console.log("New value: " + value);
});

// Terminate key monitoring after 5 seconds:
setTimeout(removeKeyListener, 5000);
```

[Read the API documentation.](docs/api/index.md)


## Documentation

* [API](docs/api/index.md)
* [Roadmap](docs/roadmap.md)
