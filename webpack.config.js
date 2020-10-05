const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    libraryTarget: "umd",
    library: "RLogin",
    umdNamedDefine: true,
    globalObject: "this"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 65535,
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  }
};
