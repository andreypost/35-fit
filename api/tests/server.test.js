const http = require("http");
const assert = require("assert");
const app = require("../server"); // Ensure this path is correct

describe("GET /", () => {
  let server;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it("should return Hello World", (done) => {
    const options = {
      hostname: "localhost",
      port: server.address().port,
      path: "/",
      method: "GET",
    };

    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          assert.strictEqual(res.statusCode, 200);
          assert.strictEqual(data, "Hello World!");
          done();
        } catch (error) {
          done(error);
        }
      });
    });

    req.on("error", done);
    req.end();
  });
});
