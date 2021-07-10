<?php

namespace Drupal\milken_migrate\Plugin\QueueWorker;

use Drupal\migrate\MigrateMessage;
use Drupal\migrate\Plugin\Migration;
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate_queue_importer\Plugin\QueueWorker\MigrateImportQueueWorker;
use Drupal\migrate_tools\MigrateExecutable;

/**
 * Queueworker to import each queued migration or its dependencies.
 *
 * @QueueWorker(
 *   id = "milken_migrate",
 *   title = @Translation("Milken Migrations importer"),
 *   cron = {
 *     "time" = 30,
 *   },
 * )
 */
class MilkenMigrateQueueWorker extends MigrateImportQueueWorker {

  /**
   * Main process function.
   *
   * @param mixed $data
   *   Incoming data on migration.
   *
   * @throws \Drupal\Component\Plugin\Exception\PluginException
   * @throws \Drupal\migrate\MigrateException
   */
  public function processItem($data) {
    $logger = \Drupal::logger("MilkenMigrateQueueWorker");
    $manager = \Drupal::service('plugin.manager.migration');
    $migration = $manager->createInstances($data['migration_id']);
    if ($migration[$data['migration_id']] instanceof Migration) {
      $migration = $migration[$data['migration_id']];
      if ($migration->getStatus() !== MigrationInterface::STATUS_IDLE) {
        $migration->setStatus(MigrationInterface::STATUS_IDLE);
      }
      $migration->setTrackLastImported(TRUE);
      $message = new MigrateMessage();
      $executable = new MigrateExecutable($migration, $message, [
        'limit' => 250,
      ]);
      $executable->import();
      $logger->info("Finished migrating 250 records for... {$data['migration_id']}");
    }
    else {
      $logger->error("Nothing to migrate..." . print_r($data, TRUE));
    }
  }

}
