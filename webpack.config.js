const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
      path: path.resolve(__dirname, 'build'),      //absolute path reference
      filename: 'bundle.js',
      publicPath: 'build/'                         //prepend to url in url-loader
  },
  //ex loaders in Webpack 1
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/
      },
      {
        //use: ['style-loader', 'css-loader'],  //loaders are applied from right to left
        loader: ExtractTextPlugin.extract({     //plugin instead outputs a separate css file
          loader: 'css-loader'
        }),
        test: /\.css$/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',             //second loader,
            options: { limit: 40000 }         // < 40bytes ? data url
          },
          'image-webpack-loader'    //first loader
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')     //tells to find any transformed by it's loaders and combine to style.css
  ]
};

module.exports = config;
