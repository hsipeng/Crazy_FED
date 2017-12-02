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
