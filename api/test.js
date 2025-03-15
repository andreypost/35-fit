const fs = require("fs");

console.log("Start");

setTimeout(() => console.log("Timeout"), 0);
setImmediate(() => console.log("Immediate"));

fs.readFile(__filename, "utf8", () => {
    console.log("File Read");
});

console.log("End");
