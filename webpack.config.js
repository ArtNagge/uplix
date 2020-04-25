const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//const CopyWebPackPlugin = require("copy-webpack-plugin");

const USE_CSS_MODULES = true
const PATHS = {
  main: path.join(process.cwd()),
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/'
}

module.exports = {
  entry: {
    app: PATHS.src
  },
  externals: {
    paths: PATHS
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  resolve: {
    alias: {
      Utils: `${PATHS.src}/utils`
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(gif|png|jpe?g|webp|svg)$/,
        loader: 'file-loader',
        options: {
          limit: 10240,
          name: `${PATHS.assets}img/[hash:8].[ext]`
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { reloadAll: true }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: USE_CSS_MODULES && {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                context: path.resolve(process.cwd(), 'src'),
                hashPrefix: 'NaggeHash'
              },
              sourceMap: true
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
      chunkFilename: `${PATHS.assets}css/[id].[hash].css`
    }),
    new HtmlWebPackPlugin({
      template: `${PATHS.main}/${PATHS.assets}index.html`
    })
  ],
  devServer: {
    overlay: true
  }
}
