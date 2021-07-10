<?php

namespace Drupal\milken_base\Plugin\Webpack\ConfigProcessors;

use Drupal\webpack\Plugin\ConfigProcessorPluginInterface;
use Drupal\webpack\Plugin\Webpack\ConfigProcessors\ConfigProcessorBase;

/**
 * Milken Web Pack Config Processor Plugin.
 *
 * @Class MilkenWebPackConfigProcessor
 *
 * @package Drupal\milken_base\Plugin\Webpack
 *
 * @WebpackConfigProcessor(
 *   id = "milken_base::webpack_configurator",
 *   weight = 20,
 * );
 */
class MilkenWebPackConfigProcessor extends ConfigProcessorBase implements ConfigProcessorPluginInterface {

  /**
   * {@inheritDoc}
   *
   * @param array $config
   *   Webpack Config.
   * @param array $context
   *   Context vars.
   */
  public function processConfig(array &$config, array $context) {
    $config['#lines_before'][] = "const webpack = require('webpack');";
    $config['#lines_before'][] = "const DrupalTranslationsWebpackPlugin = require('drupal-translations-webpack-plugin');";
    $config['#lines_before'][] = "const MiniCssExtractPlugin = require('mini-css-extract-plugin');";
    $config['#lines_before'][] = "const HtmlWebpackPlugin = require('html-webpack-plugin');";
    $config['#lines_before'][] = "const DrupalLibrariesWebpackPlugin = require('drupal-libraries-webpack-plugin');";
    $config['#lines_before'][] = "const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');";

    $babelLoader = [
      "loader" => 'babel-loader',
      "options" => [
        "cacheDirectory" => FALSE,
        "presets" => [
          '@babel/preset-env',
          '@babel/preset-typescript',
          "@babel/preset-react",
        ],
        "plugins" => [
          "@babel/transform-runtime",
          '@babel/plugin-transform-typescript',
          "@babel/plugin-proposal-export-default-from",
          "@babel/plugin-proposal-object-rest-spread",
          "@babel/plugin-proposal-optional-chaining",
          "@babel/plugin-proposal-class-properties",
          "transform-custom-element-classes",
          "@babel/plugin-transform-react-jsx",
          "babel-plugin-styled-components",
          [
            "babel-plugin-transform-builtin-classes",
            [
              "globals" => ["Array", "Error", "HTMLElement"],
            ],
          ],
          "@babel/plugin-transform-classes",
        ],
      ],
    ];

    $config['module'] = [
      "rules" => [
        [
          "test" => '`/\.behavior.js$/`',
          "loader" => 'drupal-behaviors-loader',
          "exclude" => '`/node_modules/`',
          "options" => [
            "enableHmr" => TRUE,
          ],
        ],
        [
          "test" => '`/\.ts(x?)$/`',
          "exclude" => '`/node_modules/`',
          "use" => [
            $babelLoader,
          ],
        ],
        [
          "enforce" => "pre",
          "test" => '`/\.js$/`',
          "loader" => "source-map-loader",
        ],
        [
          "test" => '`/\.css$/i`',
          "use" => [
            'style-loader',
            'css-loader',
          ],
        ],
      ],
    ];

    $config['resolve'] = [
      // Add '.ts' and '.tsx' as resolvable extensions.
      "extensions" => ['.ts', '.tsx', '.js', '.json', '.jsx'],
      "plugins" => [],
      "alias" => [
        "components" => DRUPAL_ROOT . '/../src/components',
        "DataTypes" => DRUPAL_ROOT . '/../src/DataTypes',
        "Fields" => DRUPAL_ROOT . '/../src/Fields',
        "Utility" => DRUPAL_ROOT . '/../src/Utility',
      ],
    ];

    $config['plugins'] = [
      '`new webpack.LoaderOptionsPlugin({ debug: true })`',
      '`new MiniCssExtractPlugin({ filename: "css/[name].css", chunkFilename: "css/[id].css"})`',
      '`new DrupalLibrariesWebpackPlugin()`',
      '`new webpack.HotModuleReplacementPlugin()`',
      '`new BrowserSyncWebpackPlugin()`',
    ];

    $config['stats'] = [
      "warnings" => TRUE,
      "colors" => TRUE,
      "modules" => TRUE,
      "reasons" => TRUE,
      "errorDetails" => TRUE,
    ];

    $config['devServer'] = [
      "compress" => "true",
      "port" => "9000",
      "headers" => [
        'Access-Control-Allow-Origin' => '*',
      ],
    ];

  }

}
