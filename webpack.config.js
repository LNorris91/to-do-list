const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',  
  devtool: 'inline-source-map',
  entry: './src/index.js',
  plugins: [
    // Allow HTML to be created in Dist folder
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        // Allow CSS to be loaded
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Allow images to be loaded
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        // Allow fonts to be loaded
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};