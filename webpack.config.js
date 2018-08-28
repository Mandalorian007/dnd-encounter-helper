var path = require('path');

module.exports = {
  entry: './src/main/js/app.js',
  devtool: 'sourcemaps',
  cache: true,
  debug: true,
  output: {
    path: __dirname,
    filename: './src/main/resources/static/built/bundle.js'
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, '.'),
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.css/,
        loaders: ['style', 'css','postcss-loader'],
        include: __dirname + '/src/main/css'
      }
    ]
  }
};