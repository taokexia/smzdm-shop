const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    watch: true,
    entry: {
        app: './src/client/app.js',
        vendor: ['vue', 'vue-router', 'vuex', 'axios']
    },
    output: {
        path: path.resolve(__dirname, 'static/dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                extractCSS: true
            }
        },{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },{
            test: /\.css$/,
            use: [
                'style-loader',
                {loader: 'css-loader', options: {importLoaders: 1}},
                'postcss-loader'
            ]
        },{
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        },{
            test: /\.(eot|svg|ttf|woff|woff2)(\?\s*)?$/,
            loader: 'file-loader'
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devtool: '#eval-source-map',
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common', 'vendor', 'manifest'],
            minChunks: 2
        })
    ]
    
}

if (process.env.NODE_ENV === 'production') {
    module.exports.watch = false
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}