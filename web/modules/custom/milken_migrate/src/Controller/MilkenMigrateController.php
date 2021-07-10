<?php   // @codingStandardsIgnoreFile


namespace Drupal\milken_migrate\Controller;

use Drupal\path_alias\Entity\PathAlias;
use Drupal\Core\Controller\ControllerBase;
use Drupal\taxonomy\Entity\Term;

/**
 * Class Milken Migrate Controller.
 *
 * @package Drupal\milken_migrate\Controller
 */
class MilkenMigrateController extends ControllerBase {

  /**
   * Updater for Media.
   *
   * @param array $data
   *   Incoming Data.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function update_articles(array $data) {
    $node_ar = \Drupal::entityTypeManager()
      ->getStorage('node')
      ->loadByProperties(['uuid' => $data[10]]);
    $nid = key($node_ar);
    $must_delete = (strcasecmp($data[9], 'delete') == 0) ? TRUE : FALSE;
    if (is_numeric($nid) && $must_delete) {
      // If node is marked for deletion.
      $node = \Drupal::entityTypeManager()
        ->getStorage('node')
        ->load($nid);
      $node->delete($node);
      print " ITEM $nid HAS BEEN DELETED";
    }
    elseif (is_numeric($nid) && !$must_delete) {
      // If node should only be updated
      // $node = Node::load($nid);
      print ', nid: ' . $nid;
      $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
      // Tags vid=milken_tags $data[5].
      if ($data[5] <> '') {
        $tags = explode("%comma%", $data[5]);
        foreach ($tags as $index => $tag) {
          $tid = $this->get_term_from_name(trim(str_replace("%tag-comma%", ",", $tag)), 'milken_tags');
          if ($tid) {
            print ', tag#: ' . $index;
            if ($index == 0) {
              $node->set('field_tags', ['target_id' => $tid]);
            }
            else {
              $node->get('field_tags')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Centers.
      if ($data[3] <> '') {
        $centers = explode("%comma%", $data[3]);
        foreach ($centers as $index => $center) {
          $tid = $this->get_term_from_name(trim(str_replace("%tag-comma%", ",", $center)), 'centers');
          if ($tid) {
            print ', center#: ' . $index;
            if ($index == 0) {
              $node->set('field_centers', ['target_id' => $tid]);
            }
            else {
              $node->get('field_centers')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Topics.
      if ($data[4] <> '') {
        $topics = explode("%comma%", $data[4]);
        foreach ($topics as $index => $topic) {
          $tid = $this->get_term_from_name(trim(str_replace("%tag-comma%", ",", $topic)), 'topics');
          if ($tid) {
            print ', topic#: ' . $index;
            if ($index == 0) {
              $node->set('field_topics', ['target_id' => $tid]);
            }
            else {
              $node->get('field_topics')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Collections.
      if ($data[6] <> '') {
        $collections = explode("%comma%", $data[6]);
        foreach ($collections as $index => $collection) {
          $tid = $this->get_term_from_name(trim(str_replace("%tag-comma%", ",", $collection)), 'collections');
          if ($tid) {
            print ', collection#: ' . $index;
            if ($index == 0) {
              $node->set('field_collections', ['target_id' => $tid]);
            }
            else {
              $node->get('field_collections')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Events.
      if ($data[7] <> '') {
        $events = explode("%comma%", $data[7]);
        foreach ($events as $index => $event) {
          $tid = $this->get_term_from_name(trim(str_replace("%tag-comma%", ",", $event)), 'events');
          if ($tid) {
            print ', event#: ' . $index;
            if ($index == 0) {
              $node->set('field_events', ['target_id' => $tid]);
            }
            else {
              $node->get('field_events')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Regions.
      if ($data[8] <> '') {
        $regions = explode("%comma%", $data[8]);
        foreach ($regions as $index => $region) {
          $tid = $this->get_term_from_name(trim(str_replace("%tag-comma%", ",", $region)), 'region');
          if ($tid) {
            print ', region#: ' . $index;
            if ($index == 0) {
              $node->set('field_region', ['target_id' => $tid]);
            }
            else {
              $node->get('field_region')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }
      $node->save();
      $path_alias = PathAlias::create([
        'path' => '/node/' . $nid,
        'alias' => $data[1],
      ]);
      $path_alias->save();
      print " END OF " . $nid;
    }
    else {
      print " NODE ITEM NOT FOUND: " . implode("; ", $data);
    }
  }

  /**
   * Updater for Media.
   *
   * @param array $data
   *   Incoming data.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function update_media(array $data) {

    $media = \Drupal::entityTypeManager()->getStorage('media')->loadByProperties(['uuid' => $data[10]]);
    $mid = key($media);
    $must_delete = (strcasecmp($data[9], 'delete') == 0) ? TRUE : FALSE;
    if (is_numeric($mid) && $must_delete) {
      // If media is marked for deletion.
      $media = \Drupal::entityTypeManager()->getStorage('media')->load($mid);
      $media->delete($media);
      print " ITEM $mid HAS BEEN DELETED";
    }
    elseif (is_numeric($mid) && !$must_delete) {
      // If media should only be updated.
      print ', mid: ' . $mid;
      $media = \Drupal::entityTypeManager()->getStorage('media')->load($mid);

      // Tags vid=milken_tags $data[5].
      if ($data[5] <> '') {
        $tags = explode("%comma%", $data[5]);
        foreach ($tags as $index => $tag) {
          $tid = $this->get_term_from_name(trim(str_replace("%tag-comma%", ",", $tag)), 'milken_tags');
          if ($tid) {
            print ', tag#: ' . $index;
            if ($index == 0) {
              $media->set('field_tags', ['target_id' => $tid]);
            }
            else {
              $media->get('field_tags')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Centers.
      if ($data[3] <> '') {
        $centers = explode("%comma%", $data[3]);
        foreach ($centers as $index => $center) {
          $tid = $this->get_term_from_name(trim(str_replace("%tag-comma%", ",", $center)), 'centers');
          if ($tid) {
            print ', center#: ' . $index;
            if ($index == 0) {
              $media->set('field_centers', ['target_id' => $tid]);
            }
            else {
              $media->get('field_centers')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Topics.
      if ($data[4] <> '') {
        $topics = explode("%comma%", $data[4]);
        foreach ($topics as $index => $topic) {
          $tid = $this->get_term_from_name(trim(str_replace("%tag-comma%", ",", $topic)), 'topics');
          if ($tid) {
            print ', topic#: ' . $index;
            if ($index == 0) {
              $media->set('field_topics', ['target_id' => $tid]);
            }
            else {
              $media->get('field_topics')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Collections.
      if ($data[6] <> '') {
        $collections = explode("%comma%", $data[6]);
        foreach ($collections as $index => $collection) {
          $tid = $this->get_term_from_name(trim(str_replace("%tag-comma%", ",", $collection)), 'collections');
          if ($tid) {
            print ', collection#: ' . $index;
            if ($index == 0) {
              $media->set('field_collections', ['target_id' => $tid]);
            }
            else {
              $media->get('field_collections')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Events.
      if ($data[7] <> '') {
        $events = explode("%comma%", $data[7]);
        foreach ($events as $index => $event) {
          $tid = $this->get_term_from_name(trim(str_replace("%tag-comma%", ",", $event)), 'events');
          if ($tid) {
            print ', event#: ' . $index;
            if ($index == 0) {
              $media->set('field_events', ['target_id' => $tid]);
            }
            else {
              $media->get('field_events')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      // Regions.
      if ($data[8] <> '') {
        $regions = explode("%comma%", $data[8]);
        foreach ($regions as $index => $region) {
          $tid = $this->get_term_from_name(trim(str_replace("%tag-comma%", ",", $region)), 'region');
          if ($tid) {
            print ', region#: ' . $index;
            if ($index == 0) {
              $media->set('field_regions', ['target_id' => $tid]);
            }
            else {
              $media->get('field_regions')->appendItem([
                'target_id' => $tid,
              ]);
            }
          }
        }
      }

      $media->save();

      $path_alias = PathAlias::create([
        'path' => '/media/' . $mid,
        'alias' => $data[1],
      ]);
      $path_alias->save();
      print " END OF " . $mid;
    }
    else {
      print " MEDIA ITEM NOT FOUND: " . implode("; ", $data);
    }

  }

  /**
   * Helper function to dynamically get the tid from the term_name.
   *
   * @param string $term_name
   *   Term name.
   * @param string $vid
   *   Name of the vocabulary to search the term in.
   *
   * @return \Drupal\taxonomy\Entity\Term
   *   Id of the found term or else FALSE.
   */
  private function get_term_from_name(string $term_name, string $vid) {
    $term = \Drupal::entityTypeManager()
      ->getStorage('taxonomy_term')
      ->loadByProperties(['name' => $term_name, 'vid' => $vid]);
    $term = reset($term);

    if ($term) {
      return $term->id();
    }
    else {
      print " TERM NOT FOUND: " . $term_name . " IN " . $vid;
      $term = Term::create([
        'name' => $term_name,
        'vid' => $vid,
      ])->save();
      return $term;
    }
    return FALSE;
  }

}
