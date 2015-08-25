var webpack = require('webpack');

module.exports = {
  entry: [
    "./src/js/app.js"

  ],
  output: {
    path: __dirname + '/.tmp/public/js',
    filename: "bundle.js"

  },
  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.scss$/, loader: 'style!css!myth!sass'},
      { test: /\.json$/, loader: 'json-loader'}
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()

  ],
  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}',
    console: '{}',
    dns: '{}'
  }
};
