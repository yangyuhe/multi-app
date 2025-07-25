const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const dirs = fs.readdirSync(path.resolve(__dirname, "src"));
const ignores = fs
  .readFileSync(path.resolve(__dirname, "ignore.app"), { encoding: "utf-8" })
  .split("\n");

const includes = fs
  .readFileSync(path.resolve(__dirname, "include.app"), { encoding: "utf-8" })
  .split("\n");

const entries = {};
const statics = [];
dirs.forEach((dir) => {
  const p = path.resolve(__dirname, "src", dir);
  const isdir = fs.statSync(p).isDirectory();
  if (isdir && !ignores.includes(dir) && includes.includes(dir)) {
    const root = path.resolve(__dirname, "src", dir);

    const files = fs.readdirSync(root);
    files.forEach((file) => {
      const fileName = file.slice(0, -path.extname(file).length);
      if (file.match(/^(index\.(t|j)sx?)|^(page\w+\.(t|j)sx?)/)) {
        entries[dir + "/" + fileName] = path.resolve(root, file);
      }
    });

    statics.push({
      directory: path.resolve(__dirname, "src", dir, "static"),
      serveIndex: true,
      publicPath: "/" + dir,
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve("@svgr/webpack"),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          // {
          //   loader: require.resolve('file-loader'),
          //   options: {
          //     name: 'static/media/[name].[hash].[ext]',
          //   },
          // },
        ],
        // issuer: {
        //   and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        // },
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
    new WebpackManifestPlugin({}),
    new BundleAnalyzerPlugin(),
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
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    static: statics,
    client: {
      overlay: false,
    },
  },
};
