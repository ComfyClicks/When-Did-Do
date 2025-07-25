const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    clean: true,
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
  devServer: {
    static: './dist',
    hot: true,
    open: true,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      minify: process.env.NODE_ENV === 'production' ? {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      } : false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: '3.25',
                targets: {
                  browsers: [
                    '> 1%',
                    'last 2 versions',
                    'not dead'
                  ]
                }
              }]
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          process.env.NODE_ENV === 'production' 
            ? MiniCssExtractPlugin.loader 
            : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};