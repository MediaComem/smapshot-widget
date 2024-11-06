const path = require('path');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PUBLIC_PATH = process.env.VUE_APP_PUBLIC_PATH || '/';

function decodeParseProxyURL(url) {
  const proxyURL = decodeURIComponent(url.replace(/^\/proxy\/(.+)$/, '$1'));
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
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    node: {
      global: true
    },
    resolve: {
      fallback: {
        fs: false,
        http: false,
        https: false,
        zlib: false,
        url: false,
        Buffer: false
      },
      mainFields: ['module', 'main'],
      alias: {
        '@root': __dirname // Used to import tailwind config in component
      }
    },
    module: {
      unknownContextCritical: false,
      unknownContextRegExp: /\/cesium\/cesium\/Source\/Core\/buildModuleUrl\.js/,
      rules: [
        {
          test: /\.(png|gif|jpg|jpeg|svg|xml|json|czml|glb)$/,
          include: path.resolve(__dirname, 'node_modules/cesium/Source'),
          use: ['url-loader']
        },
        {
          // Strip cesium pragmas
          test: /\.js$/,
          enforce: 'pre',
          include: path.resolve(__dirname, 'node_modules/cesium/Source'),
          sideEffects: false,
          use: [{
            loader: 'strip-pragma-loader',
            options: {
              pragmas: {
                debug: false
              }
            }
          }]
        }
      ]
    },
    optimization: {
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
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'node_modules/cesium/Build/Cesium/Workers', to: 'Workers' },
          { from: 'node_modules/cesium/Build/Cesium/ThirdParty', to: 'ThirdParty' },
          { from: 'node_modules/cesium/Build/Cesium/Assets', to: 'Assets' },
          { from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'Widgets' }
        ] }),
      new webpack.DefinePlugin({
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify('/embed/')
      })
    ]
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
