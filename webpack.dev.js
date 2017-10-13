const path = require('path'),
      merge = require('webpack-merge'),
      common = require('./webpack.common');
      
      
module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './docs'
    },
    output: { // Jobs.App not accessible with separate WB configs
        /* makes webpack bundle available as library
           can access in browser REPL under 'Jobs' object */
        libraryTarget: 'var',
        library: 'Jobs'
    },
});
