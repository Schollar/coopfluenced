const webpack = require('webpack');

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('js')
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        presets: ['@babel/preset-env'],
      });
  },
  devServer: {
    host: '0.0.0.0',
    allowedHosts: 'all'
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),
      }),
    ],
  },
};

