const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglify-js-plugin');
const { resolve } = require('path');


const home = resolve(__dirname, '../');

module.exports = (options) => {
  const webpackConfig = {
    entry: {
      app: [
        `${home}/src/app/index.jsx`,
      ],
    },
    output: {
      filename: `${options.filename}.js`,
      path: `${home}/dist`,
      publicPath: '/',
    },
    context: `${home}/src`,
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.es6'],
    },
    module: {
      rules: [
        {
          test: /\.js[x]?|\.es6$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {},
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
        minChunks: Infinity,
      }),
      new ExtractTextPlugin({
        filename: 'styles.css',
        allChunks: true,
      }),
      new Webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(options.NODE_ENV),
      }),
      new Webpack.ProvidePlugin({
        // Make stuff available here
      }),
    ],
  };

  if (options.NODE_ENV === 'development') {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );

    webpackConfig.devServer = {
      hot: true,
      contentBase: `${home}/dist`,
      publicPath: '/',
    };
  } else {
    webpackConfig.plugins.push(
      new UglifyJsPlugin({
        compress: {
          warnings: true,
        },
      })
    );
    webpackConfig.entry.vendor = [
      'axios',
      'immutable',
      'react',
      'react-dom',
      'redux',
      'redux-thunk',
      'semantic-ui-react',
    ];
  }

  return webpackConfig;
};
