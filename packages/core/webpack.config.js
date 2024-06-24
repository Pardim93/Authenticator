module.exports = {
  entry: "./index.ts",
  output: {
    filename: "natura-auth-core.min.js",
    path: __dirname + "/dist",
    library: "natura_auth_core",
    globalObject: "this",
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  mode: "production",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            query: {
              declaration: true,
            },
          },
          {
            loader: "ts-loader-decleration",
          },
        ],
      },
    ],
  },
};
