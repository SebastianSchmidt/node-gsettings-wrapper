# API


## Functions

### isAvailable() : boolean

Returns `true` if the gsettings command line tool is available.
If `false` is returned, this API can not be used.

#### Returns

`true` if the gsettings command line tool is available.

#### Usage example

```javascript
const GSettings = require("node-gsettings-wrapper");

// Check if GSettings is available:
if (!GSettings.isAvailable()) {
  console.log("The gsettings command line tool is not available.");
  process.exit(1);
}
```
