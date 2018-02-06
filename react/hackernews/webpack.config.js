var path = require('path');
module.exports = {
    entry: path.resolve(__dirname, 'app/app.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']  // react 转 es5
            }
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192' // 小于 8192 B 的文件会转成base64
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'  // 处理css 文件
        }]
    }
};
