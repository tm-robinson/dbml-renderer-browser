const path = require('path');
const webpack = require('webpack'); // Added missing import
const HtmlWebPackPlugin = require('html-webpack-plugin'); // Added missing import

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, "./src"),
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
        ]
      },
    ],
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      fs: false,
      vm: false,
      buffer: false,
      stream: false,
      path: false,
    },
  },
  plugins: [
    // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({ IS_BROWSER: true }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }),
  ],
  devtool: "inline-source-map",
  node: {
    __dirname: true
  }
};
