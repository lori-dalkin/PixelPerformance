var path = require('path');
var webpack = require('webpack');

module.exports = {
    devServer: {
        inline: true,
        contentBase: './build',
        port: 3000
    },
    node: {
        dns: 'mock',
        net: 'mock'
    },
    devtool: 'cheap-module-eval-source-map',
    entry: './dev/client/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            { 
                test: /\.json$/, 
                loader: "json-loader"
            }
        ]
    },
    output: {
        path: 'build',
        filename: 'js/app.min.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop')
    ]
};
