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

// Get a schema by ID:
const schema = GSettings.Schema.findById("org.gnome.desktop.interface");

// Display all keys of a schema:
schema.getKeys().forEach((key) => {
  console.log(key.getId());
});

// Find a key of a schema by ID:
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

// Monitor a schema for changes:
const removeSchemaListener = schema.addListener((key, value) => {
  console.log("New value: " + key.getId() + ": " + value);
});

// Terminate schema monitoring after 5 seconds:
setTimeout(removeSchemaListener, 5000);
