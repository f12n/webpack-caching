const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// npx webpack --config webpack.config.js
module.exports = {
    mode: 'production',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        index: './src/index.js',
        // another: './src/another.js'
    },
    output: {
        filename: '[name].[chunkhash].js',

        // determines the name of non-entry chunk files, For more information:
        // https://webpack.js.org/configuration/output/#output-chunkfilename
        chunkFilename: '[name].[chunkhash].js',
        // non entry chunk will have [name] equals vendors~lodash, 
        // the full name: vendors~lodash.bundle.js
        //      if use [id] here means : vendors~lodash
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Caching'
        }),
        new webpack.HashedModuleIdsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest'
        // })

    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
};