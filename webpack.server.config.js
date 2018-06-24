const path = require('path')
const webpack = require('webpack')

module.exports = {
    target: 'node',
    node: {
        __dirname: false
    },
    entry: {
        app: './src/server/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: [
                        ['env', {
                            targets: {
                                node: 'current'
                            },
                        }],
                        'stage-3'
                    ]
                }
            }
        }]
    }
}