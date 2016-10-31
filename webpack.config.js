var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/entry.js',
    output: {
        path: './dist',
        filename: '[hash].js?'
    },

    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'raw'
        }, {
            test: /\.(woff|svg|eot|ttf|woff2)/,
            loader: 'file?name=[path][name].[ext]'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'file?name=[path][name].[ext]!img?progressive=true'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test   : /\.css$/,
            loaders:['style', 'css']
            //loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },{
            test: /\.scss$/,
            //loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            loaders: ["style", "css","resolve-url","sass"]
        }]
    },

    plugins: [
        //new ExtractTextPlugin("[hash].css"),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ],

    devServer: {
        contentBase: './dist',
        port: 8000,
        inline: false,
        open: 'http://localhost:8000/#/'
    }
}
