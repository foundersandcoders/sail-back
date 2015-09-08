var webpack = require('webpack');
var RewirePlugin = require('rewire-webpack');

module.exports = function (config) {
  config.set({

    browserNoActivityTimeout: 30000,

    browsers: [ process.env.BROWSER ? process.env.BROWSER : 'Chrome' ],

    singleRun: process.env.SINGLE === 'true',

    frameworks: [ 'mocha' ],

    files: [
      'https://code.jquery.com/jquery-2.1.4.min.js',
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]

    },

    reporters: [ 'dots' ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
	loaders: [
	  { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
	  { test: /\.json$/, loader: 'json-loader'}
	]
      },
      plugins: [
	new RewirePlugin()
      ],
      externals: {
	fs: '{}',
	tls: '{}',
	net: '{}',
	console: '{}'
      }
    },

    webpackServer: {
      noInfo: true
    }
  });
};
