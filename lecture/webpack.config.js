const path = require("path");
const webpack = require("webpack");

module.exports = {
  // 추후 프로덕션 레벨에는 주석해놓은 것으로 변경해야함
  mode: "development", // production
  devtool: "eval", // hidden-source-map
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts"]
  },
  entry: {
    app: "./client"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
    // 웹팩 데드서버 쓸때는 publicPath를 써야한다.
    publicPath: "/dist"
  }
};
