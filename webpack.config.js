const path = require('path');
const fs = require("fs")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dirs = fs.readdirSync(path.resolve(__dirname, "src"))
const ignores = fs.readFileSync(path.resolve(__dirname, "ignore.app"), { encoding: "utf-8" }).split("\n")
const entries = {}
dirs.forEach(dir => {
    const p = path.resolve(__dirname, "src", dir)
    const isdir = fs.statSync(p).isDirectory()
    if (isdir && !ignores.includes(dir))
        entries[dir] = path.resolve(__dirname, "src", dir, 'index.js')
})

module.exports = {
    entry: entries,
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [{
            test: /\.js/,
            use: ['babel-loader']
        }, {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        }]
    },
    plugins: [
        ...Object.keys(entries).map(entry => {
            return new HtmlWebpackPlugin({
                template: 'index.html',
                filename: entry + '.html',
                chunks: [entry]
            })
        }),
        new MiniCssExtractPlugin()

    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    }
};