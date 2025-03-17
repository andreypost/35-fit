const fs = require("fs");
const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3001;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hi');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


console.log("Start");


fs.readFile(__filename, "utf8", () => {
    setTimeout(() => console.log("Timeout"), 0);
    setImmediate(() => console.log("Immediate"));
    process.nextTick(() => console.log("NextTick"));
    console.log("File Read");
});

console.log("End");


