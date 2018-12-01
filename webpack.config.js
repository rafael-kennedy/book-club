const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //...
  mode: "development",
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "entry.[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js"
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  plugins: [new HtmlWebpackPlugin()]
};
