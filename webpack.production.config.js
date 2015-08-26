var webpack = require('webpack');

module.exports = {
  entry: [
    "./src/admin.js",
    'webpack/hot/dev-server'
  ],
  output: {
    path: __dirname + '/.tmp/public/js',
    filename: "admin.min.js"

  },
  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader']},
      { test: /\.scss$/, loader: 'style!css!myth!sass'},
      { test: /\.json$/, loader: 'json-loader'}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
