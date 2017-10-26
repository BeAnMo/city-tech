const path = require('path'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin');
      
      
module.exports = {
    entry: {
        main: './src/js/app.js',
        vendor: [ 'vis' ]
    },
    
    plugins: [
        new CleanWebpackPlugin(['docs']),
        new HtmlWebpackPlugin({
            title: 'Nashville Job Tech',
            template: './src/index.ejs',
            inject: 'body'
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
            {
                test: /.*\.png$/i,
                use: ['file-loader']
            }
        ]
    }
}
