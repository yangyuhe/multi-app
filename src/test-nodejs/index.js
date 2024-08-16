const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req.url);
  res.write("hello");
  res.end();
});
server.listen(9008, "::1");
