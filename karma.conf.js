var webpackConfig = require("./webpack.Config");

function makeKarmaConfig() {
  var karmaConfig = {
    browsers: ["PhantomJS"],
    plugins: [
      "karma-phantomjs-launcher",
      "karma-phantomjs-shim",
      "karma-jasmine",
      "karma-webpack",
      "karma-coverage",
      "karma-sourcemap-loader",
    ],
    singleRun: true,
    frameworks: ["jasmine", "phantomjs-shim"],
    files: [
      "node_modules/babel-polyfill/dist/polyfill.js",
      "test.index.js"
    ],
    preprocessors: {
      "test.index.js": ["webpack", "sourcemap"]
    },
    reporters: ["coverage"],

    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    logLevel: "INFO",
    coverageReporter: {
      reporters: [{
        type: "json",
        subdir: ".",
        file: "coverage-final.json"
      }],
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },
    browserDisconnectTimeout: 60000,
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 60000,
    captureTimeout: 120000,
    failOnEmptyTestSuite: false
  };

  return karmaConfig;
}

module.exports = function(config) {
  config.set(makeKarmaConfig());
}
