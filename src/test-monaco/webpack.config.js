const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './index.js',
        // 'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
        // 'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
        // 'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
        // 'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
        // 'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker'
    },
    output: {
        globalObject: 'self',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.ttf$/,
                use: ['file-loader']
            },
            {
                test: /\.js/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new MonacoWebpackPlugin({
            // available options are documented at https://github.com/microsoft/monaco-editor/blob/main/webpack-plugin/README.md#options
            languages: ['json', 'javascript', 'typescript']
        })
    ]
};