const webpack = require('webpack')

module.exports = env => ({
  mode: env.production ? 'production' : 'development',
  entry: "./src/index.ts",
  output: {
    libraryTarget: "umd",
    library: "RLogin",
    umdNamedDefine: true,
    globalObject: "this",
    filename: "index.js"
  },
  watch: env === 'development',
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    })
  ],
  devtool: "source-map",
  module: {
    rules: [
      {test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]},
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
});
