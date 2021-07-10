import Entity, { EntityInterface } from "./Entity";

interface RevisionableEntityInterface extends EntityInterface {
  drupal_internal__vid: number;
  new_revision: false;
  revision_log_message?: string;
  revision_translation_affected: boolean;
}

class RevisionableEntity extends Entity {
  drupal_internal__vid: number;

  new_revision: false;

  revision_log_message?: string;

  revision_translation_affected: boolean;
}

export { RevisionableEntity as default, RevisionableEntityInterface };
