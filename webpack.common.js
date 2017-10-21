const path = require('path'),
      webpack = require('webpack'),
      PreloadWebpackPlugin = require('preload-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin');
      
      
module.exports = {
    entry: {
        main: './src/js/main.js',
        manager: './src/js/manager-test.js',
        vendor: [ 'd3' ]
    },
    
    plugins: [
        new CleanWebpackPlugin(['docs']),
        new HtmlWebpackPlugin({
            title: 'Nashville Job Tech',
            template: './src/index.ejs',
            inject: 'body'
        }),
        // puts work initiation in HTML head
        new PreloadWebpackPlugin({
            rel: 'preload',
            include: ['manager']
        })
    ],
    
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs'),
        libraryTarget: 'var',
        library: 'Jobs'
    },
    
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            { // for web workers
                test: /\.worker\.js$/,
                use: { 
                    loader: 'worker-loader', 
                    options: { name: 'worker-test.js' }
                }
            }
        ]
    }
}
