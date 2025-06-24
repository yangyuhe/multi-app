const http = require("http");
const url = require("url");

// 要访问的目标页面
const targetUrl = "http://test.abuyun.com";
//const targetUrl = "http://proxy.abuyun.com/switch-ip";
//const targetUrl = "http://proxy.abuyun.com/current-ip";

const urlParsed = url.parse(targetUrl);

// 代理服务器
const proxyHost = "http-cla.abuyun.com";
const proxyPort = "9030";

// 代理隧道验证信息
const proxyUser = "H01234567890123C";
const proxyPass = "0123456789012345";

const base64 = new Buffer(proxyUser + ":" + proxyPass).toString("base64");

const options = {
  host: proxyHost,
  port: proxyPort,
  path: targetUrl,
  method: "GET",
  headers: {
    Host: urlParsed.hostname,
    "Proxy-Authorization": "Basic " + base64,
  },
};

http
  .request(options, function (res) {
    console.log("got response: " + res.statusCode);
  })
  .on("error", function (err) {
    console.log(err);
  })
  .end();
