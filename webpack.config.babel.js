import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = {
  entry: path.join(__dirname, 'app', 'client', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: path.join(__dirname, 'app', 'client', 'index.html') })],
}
