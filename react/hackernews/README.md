## hacker news react demo

fork 自 [build-a-hn-front-page](https://github.com/theJian/build-a-hn-front-page)

主要流程见原文

## 环境
- webpack 3
- macos
- vscode

## 修改

主要是修改了webpack 打包文件中的css loader，原来的会报错。
webpack.config.js
```js
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

```


还有就是 需要注意，npm run build 命令 不会删除替换原来的bundle 命令，

所以需要 `rm -rf ./build/bundle.js` 。不然修改之后没效果
