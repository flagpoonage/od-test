const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: {
    typescript: ["./src/typescript-test/task.ts"],
    filter: ["./src/filter-test/task.ts"],
    react: ["./src/react-test/index.tsx"]
  },

  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/assets/script"
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".css", ".pcss", ".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.p?css$/, 
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1, modules: false } },
          'postcss-loader'
        ]
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { 
        test: /\.tsx?$/, 
        loader: "ts-loader" ,
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        }
      }
    ]
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ],

  node: {
    fs: 'empty'
  },

  mode: 'development',
  devtool: "cheap-module-source-map",
  devServer: {
    port: 8080,
    publicPath: '/assets/',
    contentBase: './assets/'
  },

};