const webpack = require('webpack');
const path = require('path');
// Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
// Load *package.json* so we can use `dependencies` from there

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */

const isProd =
  process.env['npm_lifecycle_event'] === 'build' || process.env.NODE_ENV === 'production';
process.traceDeprecation = true;
const config = {};

/**
 * Devtool
 * Reference: https://webpack.js.org/configuration/devtool/#devtool
 * Type of sourcemap to use per build type
 */

config.devtool = isProd ? '#eval' : 'source-map';
config.mode = isProd ? 'production' : 'development';

const env = require(`./env/${config.mode}.json`);

// add debug messages config.debug = !isProd;

/**
 * Entry
 * Reference: https://webpack.js.org/concepts/entry-points/#object-syntax
 */
config.entry = {
  polyfills: 'babel-polyfill',
  app: './src/app',
};

/**
 * Output
 * Reference: https://webpack.js.org/concepts/output/
 * https://webpack.js.org/concepts/output/#multiple-entry-points
 */
config.output = {
  path: path.join(__dirname, './build'),
  publicPath: '/',
  filename: isProd ? '[name].[hash].js' : 'js/[name].js',
  chunkFilename: isProd ? 'assets/js/[id].[hash].chunk.js' : '[id].chunk.js',
};

/**
 * Resolve
 * Reference: https://webpack.js.org/configuration/resolve/#resolve
 */
config.resolve = {
  // only discover files that have those extensions
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  alias: {
    '@app': path.join(__dirname, './src/app'),
    '@env': path.join(__dirname, './env'),
    '@store': path.join(__dirname, './src/app/store'),
    '@assets': path.join(__dirname, './src/assets'),
    '@config': path.join(__dirname, './src/app/config/index'),
    '@components': path.join(__dirname, './src/app/components'),
    '@containers': path.join(__dirname, './src/app/containers'),
  },
};

/**
 * Loaders
 * List: https://webpack.js.org/loaders/
 * This handles most of the magic responsible for converting modules
 */
config.module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            sourceMap: !isProd,
          },
        },
        {
          loader: 'awesome-typescript-loader',
          options: {
            sourceMap: !isProd,
          },
        },
      ],
      include: path.join(__dirname, './src/app'),
    },
    // {
    //     test: /\.tsx?$/,
    //     enforce: 'pre',
    //     loader: 'tslint-loader',
    //     options: {
    //       emitErrors: true,
    //       failOnHint: true
    //   }
    // },
    {
      test: /\.(woff|woff2|ttf|otf|eot|ico)$/,
      use: 'file-loader?name=assets/fonts/[name].[hash].[ext]',
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      use: 'file-loader?name=assets/images/[name].[hash].[ext]',
    },
    {
      test: /\.css$/,
      use: [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: !isProd,
            minimize: {
              discardUnused: false,
              mergeIdents: false,
            },
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: !isProd,
          },
        },
      ],
    },
    {
      test: /\.scss|sass$/,
      include: path.join(__dirname, './src'),
      use: [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: !isProd,
            minimize: {
              discardUnused: false,
              mergeIdents: false,
            },
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: !isProd,
          },
        },
        {
          loader: 'resolve-url-loader',
          options: {
            sourceMap: !isProd,
          },
        },
        {
          loader: 'fast-sass-loader',
          options: {
            sourceMap: !isProd,
          },
        },
        {
          loader: 'sass-resources-loader',
          options: {
            // Provide path to the file with resources
            resources: path.join(__dirname, 'src/assets/styles/utils/index.scss'),
          },
        },
      ],
    },
    {
      test: /\.html$/,
      use: 'raw-loader',
    },
  ],
};

/**
 * Plugins
 * List: https://webpack.js.org/plugins/
 */
config.optimization = {
  splitChunks: {
    cacheGroups: {
      commons: {
        chunks: 'all',
      },
    },
  },
};

config.optimization.minimizer = isProd ? [new UglifyJsPlugin({ sourceMap: false })] : [];

config.plugins = [
  // Define env variables to help with builds Reference:
  // https://webpack.js.org/plugins/define-plugin/
  new webpack.EnvironmentPlugin({
    MODE: config.mode, // use 'development' unless process.env.NODE_ENV is defined
    DEBUG: !isProd,
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output both options are
    // optional
    filename: isProd ? 'assets/css/[name].[hash].css' : 'assets/css/[name].css',
    chunkFilename: isProd ? 'assets/css/[name].[id].[hash].css' : 'assets/css/[name].css',
  }),
  new OptimizeCssAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
      discardComments: { removeAll: true },
    },
    canPrint: true,
  }),
  // Generate common chunks if necessary Reference:
  // https://webpack.js.org/plugins/commons-chunk-plugin/ Extract css files
  // Reference: https://webpack.js.org/plugins/extract-text-webpack-plugin/
  // Disabled when in test mode or not in build mode
  new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/public/index.html'),
    inlineSource: '.css$',
    inject: 'body',
  }),
  new HtmlWebpackInlineSourcePlugin(),
];

// Add build specific plugins
if (isProd) {
  config.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, './src/public'),
      },
    ]),
  );
} else {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (process.env.npm_config_analyze) {
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

/**
 * Dev server configuration
 * Reference: http://webpack.github.io/docs/configuration.html#devserver
 * Reference: http://webpack.github.io/docs/webpack-dev-server.html
 */
config.devServer = {
  contentBase: path.join(__dirname, './src/public'),
  historyApiFallback: true,
  hot: true,
  inline: true,
  port: env.PORT,
  compress: true,
  stats: 'minimal', // none (or false), errors-only, minimal, normal (or true) and verbose
  watchOptions: {
    poll: true, // correct live reload form idea product
  },
};

module.exports = config;
