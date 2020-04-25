const merge = require('webpack-merge')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const baseWebpackConfig = require('../webpack.config')

const BuildWbConfig = merge(baseWebpackConfig, {
  mode: 'production',
  performance: {
    hints: false
  },
  plugins: [
    new ImageminPlugin({
      pngquant: { quality: '95-100' }
    })
  ]
})

module.exports = new Promise(resolve => resolve(BuildWbConfig))
