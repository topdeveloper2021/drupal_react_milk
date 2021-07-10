<?php
// phpcs:ignoreFile

namespace Drupal\milken_migrate\Utility;

/**
 *
 */
class MenuRemoteRecord {

  /**
   *
   * @code
   *
   * "type": "menu--menu",
   * "id": "26f338ac-a8c9-41e6-b20c-68f68088d275",
   * "links": {
   *   "self": {
   *      "href": "https://milkeninstitute.org/jsonapi/menu/menu/26f338ac-a8c9-41e6-b20c-68f68088d275"
   *    }
   * },
   * "langcode": "en",
   * "status": true,
   * "dependencies": [],
   * "drupal_internal__id": "main-menu---strategic-phila",
   * "label": "Center for Strategic Philanthropy",
   * "description": "",
   * "locked": false,
   *
   * @endcode
   */


  public $locked;

  /**
   *
   */
  public function __toDrupalValuesArray() {
    return [
      'uuid' => $this->id,
      'status' => $this->status,
      'title' => $this->label,
      'name' => $this->label,
    ];
  }

}
