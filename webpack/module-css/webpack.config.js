const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    main: './src'
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'main.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      // ES6 转码
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      // 图片加载
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      // css 加载 先加载css-loader ,之后sytle-loader 插入html.
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader"},
          { loader: "css-loader"},
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ]
}