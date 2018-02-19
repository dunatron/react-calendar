const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

require("babel-core/register");
require("babel-polyfill");

const THEME_NAME = 'react-app'; // define SilverStripe theme name
const DOTENV = require('dotenv').config({path: '../../.env'});

var srcPath  = path.join(__dirname, './src/'),
    distPath = path.join(__dirname, './dist/');

// Allows a visual representation of the apps components
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = (env = {}) => {
  /**
   * Environment variables, needed throughout the index.jsx file to determine our
   * ApolloProvider client and graphQl endpoint
   */
  const Dev_Base_URL = 'http://192.168.50.78';
  const Prod_Base_URL = 'http://ss4-react.whatshapp.nz';
  const Env_Base_URL = DOTENV.parsed.SS_BASE_URL;

  const BuildType = env.buildType;

  let AppBaseURL = '';

  const ConsoleFont1 = '\x1b[32m\x1b[40m%s\x1b[0m'; // green font black BG
  const ConsoleFont2 = '\x1b[32m';

  console.log(ConsoleFont1, 'Webpack is building your project...');

  switch (BuildType) {
    case "dev":
      AppBaseURL = Dev_Base_URL;
      console.log(ConsoleFont1, AppBaseURL);
      break;
    case "prod":
      AppBaseURL = Prod_Base_URL;
      console.log(ConsoleFont1, AppBaseURL);
      break;
    case "env":
      AppBaseURL = Env_Base_URL;
      console.log(ConsoleFont1, AppBaseURL);
      break;
    case "location":
      console.log(ConsoleFont1, 'GraphQL will use window.location to determine the endpoint');
      AppBaseURL = ""; // if AppBaseURL.length=0 javascript will handle a blank url by using window.location
  }

  /**
   * Webpack variables
   */
  return {
    watch: false,
    cache: true,
    context: srcPath,
    entry: {
      app: ['babel-polyfill','./index.jsx'],
    },
    watchOptions: {
      poll: true
    },
    output: {
      path: path.resolve(__dirname, distPath),
      publicPath: '/themes/'+THEME_NAME+'/dist/',
      filename: '[name].bundle.js',
    },
    resolve: {
      modules: ["node_modules"],
      extensions: ['.js', '.jsx'],
    },
    devtool: "source-map",

    module: {


      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'], //Loaders are
          // processed in reverse array order. That means css-loader will run before style-loader.
        },
        {
          test: /\.(sass|scss)$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            // options not needed as babel-loader uses .babelrc file
            //options: { presets: ['es2015', 'stage-2', 'react'] },
          }],
        },
        {
          test: /\.jsx$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader'
            // options not needed as babel-loader uses .babelrc file
            //options: { presets: ['es2015', 'stage-2', 'react'] },
          }],

        },

        {
          test: /\.(woff|woff2|ttf|eot|svg|gif|png)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[path][name].[ext]',
                limit: 1,
                useRelativePath: false,
                svgo: {
                  quality: 10
                }
              }
            }
          ]
        },

      ],


      loaders: [

      ]

    },

    /**
     * This plugin creates a report about everything you are using in your js app.
     * Pro tip: Look for repeating packages and create a Webpack Common chunks plugin for repeats
     */
    plugins: [
      // new webpack.DefinePlugin({
      //   'process.env.NODE_ENV': JSON.stringify('production')
      // }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8888,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info',
      }),

      /**
       * Allows us to use these as Global constants through our JS App
       */
      new webpack.DefinePlugin({
        BASE_URL_VARIABLE: JSON.stringify(AppBaseURL),
      }),

      /**
       * ONLY TURN ON BELOW FOR PRODUCTION BUILD
       * ToDo: split webpack into dev and prod config files
       * --config webpack.config.js in package.json
       */
      new UglifyJsPlugin({
        cache: './siteCache'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      }),


    ],


  }
};