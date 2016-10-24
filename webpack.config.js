var webpack=require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry:'./src/entry.js',
    output:{
        path:'./dist',
        filename:'app.bundle.js'
    },

    module:{
        loaders:[{
            test: /\.html$/,
            loader: 'raw'
        },{
            test:/\.js$/,
            exclude:/node_modules/,
            loader:'babel-loader'
        },{
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        },{
            test: /\.(woff|svg|eot|ttf|woff2)/,
            loader: 'font-subset'
        }]
    },

    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            }
        })
    ],

    devServer:{
        contentBase:'./dist',
        port:8000,
        inline:false,
        open:'http://localhost:8000/#/'
    }
}
