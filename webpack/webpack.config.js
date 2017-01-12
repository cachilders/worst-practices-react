const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { resolve } = require('path');

const home = resolve(__dirname, '../');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    `${home}/src/app/index.jsx`,
  ],
  output: {
    filename: '[hash].[name].js',
    path: `${home}/dist`,
    publicPath: '/',
  },
  context: `${home}/src`,
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: `${home}/dist`,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.es6'],
  },
  module: {
    rules: [
      {
        test: /\.js[x]?|\.es6$/,
        use: 'babel-loader',
        query: { compact: false },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader',
        }),
      },
      {
        test: /\.css/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new Webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({ template: `${home}/src/index.html` }),
    new Webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      names: ['vendor', 'manifest'],
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    }),
    new Webpack.ProvidePlugin({
    }),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin(),
  ],
};
