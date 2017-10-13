const path = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
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
            parallel: true,
            uglifyOptions: {
                ie8: false,
                output: {
                    comments: false,
                    beautify: false
                },
                compress: {
                    sequences: true,
                    dead_code: true,
                    properties: true,
                    conditionals: true,
                    comparisons: true,
                    arrows: true,
                    booleans: true,
                    typeofs: true,
                    loops: true,
                    unused: true,
                    inline: true,
                    join_vars: true,
                    cascade: true,
                    collapse_vars: true,
                    reduce_vars: true,
                }
            }
        }),
        new ExtractTextPlugin('style.css')
    ],
    output: {
        //filename: 'output.js',
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs'),
        // makes webpack bundle available as library
        // can access in browser REPL under 'Jobs' object
        //libraryTarget: 'var',
        //library: 'Jobs'
    },
    // don't use in production
    //devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                /*use: [
                    'style-loader',
                    'css-loader'
                ]*/
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
        ]
    }
};
