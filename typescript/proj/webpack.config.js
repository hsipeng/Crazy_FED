const HtmlWebpackPlugin = require('html-webpack-plugin') // installed via npm
const webpack = require('webpack') // to access built-in plugins
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const appconfig = require('./config')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function assetsPath (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? appconfig.build.assetsSubDirectory
    : appconfig.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

process.env.NODE_ENV = 'production'

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  // Enable sourcemaps for debugging webpack's output.
  // devtool: 'source-map',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', `autoprefixer-loader?{ browsers: ['last 100 versions'] }`]
        })
      },
      {
        test: /\.scss$/,
        exclude: /^node_modules$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', `autoprefixer-loader?{ browsers: ['last 100 versions'] }`, 'sass-loader']
        })
      },
      {
        test: /\.less/,
        exclude: /^node_modules$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', `autoprefixer-loader?{ browsers: ['last 100 versions'] }`, 'less-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('src/[name].css').replace('src/', '')
      },
      allChunks: true
    })
  ]
}

module.exports = config
