var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: './src/entry.js',
        //vendor:[]
    },
    output: {
        path: './dist',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },

    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.(woff|eot|ttf|woff2)$/,
            loader: 'file?name=./fonts/[name].[ext]'
        }, {
            test:/\.json$/,
            loader:'file?name=./data/[name].[ext]'
        },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/,
                loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            }]
    },

    plugins: [
        new ExtractTextPlugin("[hash].css"),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            mangle: false
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        //new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
    ],

    devServer: {
        contentBase: './dist',
        port: 8000,
        inline: true,
        open: 'http://localhost:8000/#/'
    }
}
