const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      pakertaja: path.join(
        __dirname,
        'node_modules',
        'pakertaja',
        'dist',
        'pakertaja.js',
      ),
    },
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        test: /\.sass$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
