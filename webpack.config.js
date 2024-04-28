const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const dirs = fs.readdirSync(path.resolve(__dirname, "src"));
const ignores = fs
  .readFileSync(path.resolve(__dirname, "ignore.app"), { encoding: "utf-8" })
  .split("\n");

const includes = fs
  .readFileSync(path.resolve(__dirname, "include.app"), { encoding: "utf-8" })
  .split("\n");

const entries = {};
const statics = []
dirs.forEach((dir) => {
  const p = path.resolve(__dirname, "src", dir);
  const isdir = fs.statSync(p).isDirectory();
  if (isdir && !ignores.includes(dir) && includes.includes(dir)) {
    const root = path.resolve(__dirname, "src", dir)

    const files = fs.readdirSync(root)
    files.forEach(file => {
      const fileName = file.slice(0, -path.extname(file).length)
      if (file.match(/(index\.(t|j)sx?)|(page\w+\.(t|j)sx?)/)) {
        entries[dir + '/' + fileName] = path.resolve(root, file);
      }
    })

    statics.push({
      directory: path.resolve(__dirname, "src", dir, "static"),
      serveIndex: true,
      publicPath: "/" + dir
    });
  }
});

module.exports = {
  entry: entries,
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx?$|\.tsx?$)/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader'],
      },
    ],
  },
  plugins: [
    ...Object.keys(entries).map((entry) => {
      return new HtmlWebpackPlugin({
        template: "index.html",
        filename: entry + ".html",
        chunks: [entry],
      });
    }),
    new MiniCssExtractPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    fallback: {
      stream: false,
      buffer: false,
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    static: statics
  }
};
