const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    index: './src/js/main.js',
    editor: './src/js/app/editor.js',
    nightMode: './src/js/app/night-mode.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Note-taker',
      template: 'index.html',
    }),
    new InjectManifest({
      swSrc: './service-worker.js',
      swDest: 'service-worker.js',
      // Any other config if needed.
    }),
  ],
  resolve: {
    alias: {
      codemirror: path.join(__dirname, './node_modules/@codemirror'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
    ],
  },
};
