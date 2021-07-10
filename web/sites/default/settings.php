<?php

/**
 * @file
 */

ini_set('error_reporting', E_ALL & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED);

/**
 * @file
 * Load services definition file.
 */

$settings['container_yamls'][] = __DIR__ . '/services.yml';

/**
 * Include the Pantheon-specific settings file.
 *
 * N.b. The settings.pantheon.php file makes some changes
 *      that affect all environments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to ensure that
 *      the site settings remain consistent.
 */
include __DIR__ . "/settings.pantheon.php";

/**
 * If there is a local settings file, then include it.
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  include $local_settings;
}

/**
 * Always install the 'standard' profile to stop the installer from
 * modifying settings.php.
 */
$settings['install_profile'] = 'minimal';

/**
 * Configuration for Redis Cache.
 *
 * Make sure that the module is already installed and enabled prior to
 *   adding this config.
 * The site will die with a WSOD Drupal Error if the module is not enabled.
 */

if (defined('PANTHEON_ENVIRONMENT')) {
  $env = getenv('PANTHEON_ENVIRONMENT');
  if (PHP_SAPI == 'cli') {
    ini_set('max_execution_time', 999);
  }
  else {
    $settings['container_yamls'][] = 'modules/contrib/redis/example.services.yml';
    // Phpredis is built into the Pantheon application container.
    $settings['redis.connection']['interface'] = 'PhpRedis';
    // These are dynamic variables handled by Pantheon.
    $settings['redis.connection']['host'] = $_ENV['CACHE_HOST'];
    $settings['redis.connection']['port'] = $_ENV['CACHE_PORT'];
    $settings['redis.connection']['password'] = $_ENV['CACHE_PASSWORD'];

    $settings['cache']['default'] = 'cache.backend.redis';
    $settings['cache']['bins']['bootstrap'] = 'cache.backend.redis';
    $settings['cache']['bins']['config'] = 'cache.backend.redis';
    $settings['cache']['bins']['render'] = 'cache.backend.redis';
    $settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.redis';
    // Use Redis as the default cache.
    $settings['cache_prefix']['default'] = 'pantheon-redis';

    // Set Redis to not get the cache_form (no performance difference).
    $settings['cache']['bins']['form'] = 'cache.backend.database';
  }
}

$settings['default_content_deploy_content_directory'] = '../content';

/**
 * Place the config directory outside of the Drupal root.
 */

$settings["config_sync_directory"] = dirname(DRUPAL_ROOT) . "/config/sync";

$config['config_split.config_split.config_' . $env]['status'] = TRUE;


$settings['twig_sandbox_whitelisted_methods'] = [
  'toArray',
  'id',
  'label',
  'bundle',
  'get',
  '__toString',
  'toString',
  'referencedEntities',
  'view',
];

$settings['http_client_config'] = [
  "base_uri" => "https://milkeninstitute.org",
  "http_errors" => FALSE,
  'synchronous' => TRUE,
  'connect_timeout' => 2.5,
  'timeout' => 10,
  'verify' => FALSE,
  'allow_redirects' => TRUE,
  'debug' => FALSE,
];

$settings['simple_oauth.key_permissions_check'] = FALSE;
