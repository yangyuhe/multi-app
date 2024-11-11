const path = require("path");
module.exports = function () {
  return {
    entry: "./src/index.js",
    mode: "development",
    output: {
      filename: "bundle/main.js",
      path: path.resolve(__dirname, "dist/assets/static/"),
    },
    devServer: {
      port: 9000,
      proxy: [
        {
          context: ["/api"],
          target: "http://localhost:3000",
        },
      ],
    },
  };
};
