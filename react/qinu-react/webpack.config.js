const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

//postcss-loader 需要的配置项
var precss = require('precss');
var autoprefixer = require('autoprefixer');

//css文件提取器需要的模块
var ExtractTextPlugin=require('extract-text-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'app/app.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
      new webpack.NoEmitOnErrorsPlugin(),
      //提取之后生成的css文件名字  （bulid/css/app.css）
      // allChunks 默认是false
      new ExtractTextPlugin("[name].styles.[id].[contenthash].css", {allChunks: false}),
      //样式压缩
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ],
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
            exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            minimize: true //压缩
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            //loader: ExtractTextPlugin.extract('style-loader!css-loader','postcss-loader')   处理css 文件 ,压缩加前缀,并将css提取出来
        }]
    },
    // 定义webpack-dev-server
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    // 静态文件目录位置，只有当你需要在webpack-dev-server本地服务器查看或引用静态文件时用到。类型：boolean | string | array, 建议使用绝对路径
    hot: true,
    // 模块热更新。依赖于HotModuleReplacementPlugin
    noInfo: false,
    // 在命令行窗口显示打包信息
  }
};