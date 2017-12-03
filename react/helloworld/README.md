## react webpack2 配置
主要分三种实现
- webpack 模块管理
- webpack 加入文件改动监听，自动编译刷新浏览器
- 实现热替换 （MHR）

<!-- more -->
## 环境
- yarn 1.3.2 详细api使用请戳[👇](https://yarnpkg.com/lang/en/docs/install/)
- node v8.9.1
- webpack2
- react
- sublimet text 3

## 截图
![](https://github.com/lirawx/Crazy_FED/raw/master/react/helloworld/react-webpack2.png)

## 代码地址
[链接地址➡️](https://github.com/lirawx/Crazy_FED/tree/master/react/helloworld)
## webpack 模块管理

webpack.dev.js

```
const path = require('path')
const root = __dirname

module.exports = {
  // 入口文件
  entry: path.resolve(root, 'src/main.js'),
  // 出口文件
  output: {
    filename: 'bundle.js',
    path: path.resolve(root, 'dist')
  },
  // loaders
  module: {
    rules: [
      {test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/}
    ]
  }
}

```

.babelrc

```
{
  "presets": [
    ["es2015", {"modules": false}], // webpack 2 本身已支持es6 module
    "react"
  ]
}
```

包依赖安装

```
yarn add react react-dom

yarn add webpack babel-cli babel-loader babel-preset-es2015 babel-preset-react --dev
```

另外可以加入 [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)
根据teplate.html生成index.html
js 文件会自动引入模板文件。

最后的 webpack 配置 如下：

```
const path = require('path')
// 引入html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const root = __dirname

module.exports = {
  // 入口文件
  entry: path.resolve(root, 'src/main.js'),
  // 出口文件
  output: {
    filename: 'bundle.js',
    path: path.resolve(root, 'dist')
  },
  // loaders
  module: {
    rules: [
      {test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Demo',
      template: path.resolve(root, 'template.html')
    })
  ]
}

```


## 加入文件改动监听，自动编译刷新浏览器

需要用到 [webpack-dev-server](https://doc.webpack-china.org/configuration/dev-server/) 模块管理

安装

```
yarn add webpack-dev-server --dev
```

webpack.dev.js 更改为

```
const path = require('path')
// 引入html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const root = __dirname

module.exports = {
  // 入口文件
  entry: [
    'webpack-dev-server/client',
    path.resolve(root, 'src/main.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(root, 'dist'),
    publicPath: '/'
  },
  // loaders
  module: {
    rules: [
      {test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Demo',
      template: path.resolve(root, 'template.html')
    })
  ],
  devServer: {
    contentBase: path.resolve(root, 'dist'),
    publicPath: '/',
    port: 8080,
    historyApiFallback: true
  }
}

```

package.json 中的scripts 改为

```
"scripts": {
  "dev": "webpack-dev-server --config webpack.dev.js"
}
```

## 实现热替换 （MHR）

上面已经实现了改动自动刷新服务器，但是，有时只需要局部更改相应数据，不需要整体更新，这时就需要热替换
更新相应的组件。

这里用到了 [react-hot-loader](https://gaearon.github.io/react-hot-loader/getstarted/)

安装

```
yarn add react-hot-loader --dev
```

webpack.dev.js 如下：

```
const path = require('path')
const webpack = require('webpack')
// 引入html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const root = __dirname

module.exports = {
  // 入口文件
  entry: [
    'react-hot-loader/patch', // 激活HMR
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    path.resolve(root, 'src/main.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(root, 'dist'),
    publicPath: '/'
  },
  // loaders
  module: {
    rules: [
      {test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/}
    ]
  },
  devServer: {
    hot: true, // 激活服务器的HMR
    contentBase: path.resolve(root, 'dist'),
    publicPath: '/',
    port: 8080,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Demo',
      template: path.resolve(root, 'template.html')
    }),
    new webpack.HotModuleReplacementPlugin(), // 热替换插件
    new webpack.NamedModulesPlugin() // 执行热替换时打印模块名字
  ]
}

```

假如 热替换组件为 App ，在main.js 中加入相关热替换代码：

```
import React from 'react'
import ReactDOM from 'react-dom'
import {
    AppContainer
} from 'react-hot-loader'
import App from './App'
const render = (App) => {
    ReactDOM.render(
        <AppContainer>
      <App />
    </AppContainer>,
        document.getElementById('app')
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./App', () => render(App))
}
```
