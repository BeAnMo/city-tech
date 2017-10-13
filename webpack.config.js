const path = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      UglifyJSPlugin = require('uglifyjs-webpack-plugin')
      CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: {
        main: './src/js/app.js',
        vendor: [ 'd3' ] 
    },
    //entry: './src/js/app.js',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Nashville Job Tech',
            template: './src/index.ejs',
            inject: 'body'
        }),
        new CleanWebpackPlugin(['docs']),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['runtime']
        }),
        new UglifyJSPlugin({
            sourceMap: true,
            extractComments: true,
            parallel: true
        })
    ],
    output: {
        //filename: 'output.js',
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs'),
        // makes webpack bundle available as library
        // can access in browser REPL under 'Jobs' object
        libraryTarget: 'var',
        library: 'Jobs'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
        ]
    }
};
