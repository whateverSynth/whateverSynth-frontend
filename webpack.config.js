const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

// eslint-disable-next-line
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  devServer: {
    port: 7891,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin(),
    new Dotenv({
      systemvars: true,
    }),
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('postcss-import')(),
                require('autoprefixer')(),
                require('postcss-nested')(),
                require('postcss-simple-vars')(),
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, './public/rawStyles')],

        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: false,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('postcss-import')(),
                require('autoprefixer')(),
                require('postcss-nested')(),
                require('postcss-simple-vars')(),
              ],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(jpeg|jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 1000 },
        },
      },
    ],
  },
};
