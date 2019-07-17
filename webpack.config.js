const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const DEV_CONFIG =
  process.env === "DEVELOPMENT"
    ? {
        mode: "development",
        devtool: "inline-source-map",
        devServer: {
          contentBase: path.join(__dirname, "dist"),
          hot: true
        }
      }
    : {};

module.exports = {
  ...DEV_CONFIG,
  entry: "./app/js/index.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "app/index.html")
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, "app/img"),
        to: path.resolve(__dirname, "dist/img")
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "postcss-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  }
};
