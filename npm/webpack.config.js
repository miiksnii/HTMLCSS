import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin'; // Import CopyPlugin

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export default () => {
  return {
    entry: './src/main.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', // Path to your Nunjucks template for index.html
        filename: 'index.html', // Output filename
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/FindDomain.html', // Path to your Nunjucks template for FindDomain.html
        filename: 'FindDomain.html', // Output filename
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/assets'),  // Correct path to the assets folder
            to: path.resolve(__dirname, 'dist/assets'),  // Correct path to the destination in dist
          },
        ],
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'), // Path to the static files folder
      },
      compress: true,
      port: 9000, // Port for the dev server
    },
  };
};
