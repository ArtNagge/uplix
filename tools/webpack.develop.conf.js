const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('../webpack.config')

const DevelopWbConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    inline: true,
    contentBase: baseWebpackConfig.externals.paths.dist,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 3000
  },
  plugins: [new webpack.SourceMapDevToolPlugin({})]
})

module.exports = new Promise(resolve => resolve(DevelopWbConfig))
