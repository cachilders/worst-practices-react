const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { resolve } = require('path');

const home = resolve(__dirname, '../');

module.exports = {
  entry: {
    app: `${home}/src/app/index.jsx`,
    vendor: [
      'axios',
      'immutable',
      'react',
      'react-dom',
      'redux',
      'redux-thunk',
      'semantic-ui-react',
    ],
  },
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
        exclude: /node_modules/,
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
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1000, // 1KO
          name: 'img/[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1 KO
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
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
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
};
