var path = require('path');

module.exports = {
  entry: './src/main/js/app.tsx',
  cache: true,
  output: {
    path: __dirname + "src/main/resources/static/built",
    filename: 'bundle.js'
  },
  resolve: {
      extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/
      },
      {
        test: /\.css/,
        loaders: ['style', 'css','postcss-loader'],
        include: __dirname + '/src/main/css'
      }
    ]
  }
};