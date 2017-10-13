const merge = require('webpack-merge'),
      webpack = require('webpack'),
      UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
      common = require('./webpack.common');
      
      
module.exports = merge(common, {
    plugins: [
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
        })
    ]
});
