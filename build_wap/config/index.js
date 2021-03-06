
'use strict'
// Template version: 1.2.0
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
function getIPAdress(){
  var interfaces = require('os').networkInterfaces();
  for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
             var alias = iface[i];
             if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                   return alias.address;
             }
        }
  }
}
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://java.cbs.test.yipicha.com', // 接口的域名
        secure: false,
        changeOrigin: true,
        pathRewrite:{
          '^/api': ''
        }
      },
      '/erp': {
          target: 'http://java.im.test.yipicha.com',
        // target: 'http://192.168.7.8:8080/', // 接口的域名
        secure: false,
        changeOrigin: true,
        pathRewrite:{
          '^/erp': ''
        }
      }
    },

    // Various Dev Server settings
    host: getIPAdress(), // can be overwritten by process.env.HOST
    port: 8020, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
    */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../../wap/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../../wap'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * SourceMap
    */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#nosources-source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
