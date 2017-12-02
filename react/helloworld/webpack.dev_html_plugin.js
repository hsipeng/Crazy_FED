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
