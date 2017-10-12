const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/js/app.js',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Nashville Job Tech',
            template: './src/index.ejs',
            inject: 'body'
        })
    ],
    output: {
        filename: 'output.js',
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
