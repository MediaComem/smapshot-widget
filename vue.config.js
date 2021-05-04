const path = require('path');

const webpack = require('webpack');
const CopywebpackPlugin = require('copy-webpack-plugin');

// Path to Cesium
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const PUBLIC_PATH = process.env.VUE_APP_PUBLIC_PATH || '/';

function decodeParseProxyURL(url){
  const proxyURL = decodeURIComponent(url.replace(/^\/proxy\/(.+)$/,'$1'));
  return new URL(proxyURL);
}

module.exports = {
  publicPath: PUBLIC_PATH,
  pluginOptions: {
    i18n: {
      enableInSFC: false
    }
  },
  parallel: false,
  configureWebpack: {
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist'),
      // Needed to compile multiline strings in Cesium
      sourcePrefix: ''
    },
    node: {
      // Resolve node module use of fs
      fs: 'empty',
      Buffer: false,
      http: 'empty',
      https: 'empty',
      zlib: 'empty'
    },
    resolve: {
      alias: {
        cesium: path.resolve(__dirname, cesiumSource)
      }
    },
    plugins: [
      // Copy Cesium Assets, Widgets, and Workers to a static directory
      new CopywebpackPlugin([
        { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }
      ]),
      new CopywebpackPlugin([
        { from: path.join(cesiumSource, 'Assets'), to: 'Assets' }
      ]),
      new CopywebpackPlugin([
        { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }
      ]),
      new webpack.DefinePlugin({
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify('/')
      })
    ],
    optimization: {
      namedChunks: (process.env.NODE_ENV === 'development'),
      runtimeChunk: 'single',
      moduleIds: 'hashed',
      usedExports: true,
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          cesium: {
            test: /[\\/]node_modules[\\/]cesium/,
            name: 'cesium',
            chunks: 'all'
          }
        }
      }
    },
    module: {
      // Disable handling of unknown requires
      unknownContextRegExp: /$^/,
      unknownContextCritical: false,
      rules: [
        {
          // Strip cesium pragmas
          test: /\.js$/,
          enforce: 'pre',
          include: path.resolve(__dirname, cesiumSource),
          sideEffects: false,
          use: [
            {
              loader: 'strip-pragma-loader',
              options: {
                pragmas: {
                  debug: false
                }
              }
            }
          ]
        }
      ]
    }
  },
  chainWebpack: config => {
    // SVG Loader
    config.module
      .rule('svg')
      .test(/\.svg(\?.*)?$/)
      .use('svg-transform-loader')
      .loader('svg-transform-loader')
      .end();
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/proxy/*': {
        logLevel: 'silent',
        target: 'http://localhost', // dummy value
        router: (req) => {
          const url = decodeParseProxyURL(req.url);
          return url.origin;
        },
        pathRewrite: (path, req) => {
          const url = decodeParseProxyURL(req.url);
          return url.pathname + url.search;
        }
      }
    }
  },
  transpileDependencies: [/node_modules(?:\/|\\)lit-element|lit-html/]
};
