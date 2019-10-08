const HtmlWebpackPlugin = require('html-webpack-plugin')
const forkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    devServer: {
        host: 'localhost',
        port: 8088
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: [{
                    loader: 'ts-loader'
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/tpl/index.html'
        }),
        new forkTsCheckerWebpackPlugin()
    ]
}
