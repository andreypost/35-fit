const { createServer } = require("node:http");

const nodeHostname = "127.0.0.1";
const nodePort = 4000;

const nodeServer = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello world from Node.js server!");
});

nodeServer.listen(nodePort, nodeHostname, () => {
  console.log(`Node.js server running at http://${nodeHostname}:${nodePort}/`);
});
