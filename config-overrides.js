const webpack = require("webpack");

module.exports = {
  webpack: function (config, env) {
    config.resolve.fallback = {
      crypto: require.resolve("crypto-browserify"),
      os: require.resolve("os-browserify/browser"),
    };

    // config.node = {
    //   fs: "empty",
    // };

    config.plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      })
    );

    return config;
  },
};
