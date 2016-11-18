var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

function getPlugins(environment) {
  var plugins = [
    new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js"),
    new HtmlWebpackPlugin({
      title: "My Angular Webpack Template",
      template: path.join(__dirname, "src/index.ejs"),
      hash: true
    }),
    new ExtractTextPlugin("styles.css", { allChunks: true }),
    new CopyWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }
    })
  ];

  if(environment === "development") {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else if(environment === "production") {
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }));
  } else if(environment === "coverage") {}

  return plugins;
};

var baseWebpackConfig = {
  entry: {
    app: [
      "babel-polyfill",
      "./src/app.js"
    ],
    vendors: [
      "babel-polyfill",
      "angular",
      "angular-ui-bootstrap"
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    //publicPath: "http://localhost:3000/"
  },
  plugins: getPlugins(process.env.NODE_ENV),
  module: {
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "eslint-loader"}
    ],
    loaders: [
      { test: /\.js$/, exclude: /(node_modules)/, loader: "babel-loader", query: { presets: ["es2015"] } },
      { test: /\.html$/, loader: "ngtemplate?relativeTo=" + (path.resolve(__dirname, "./src")) + "/!html" },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.(png|jpg)/, loader: "url-loader?limit=10000" }
    ]
  },
  devtool: "source-map",
  devServer: {
    //publicPath: "http://localhost:${env.WEBPACK_PORT}/dist",
    //publicPath: "http://localhost:3000/dist",
    contentBase: "./src",
    noInfo: false,
    hot: true,
    historyApiFallback: true,
    port: 3000,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  }
};

/*
if(process.env.NODE_ENV === "development") {
  //baseWebpackConfig.entry.app.push("webpack-hot-middleware/client");
  baseWebpackConfig.devServer = {
    //publicPath: "http://localhost:${env.WEBPACK_PORT}/dist",
    //publicPath: "http://localhost:3000/dist",
    contentBase: "./src",
    noInfo: false,
    hot: true,
    historyApiFallback: true,
    port: 3000,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  };
}*/

module.exports = baseWebpackConfig;
