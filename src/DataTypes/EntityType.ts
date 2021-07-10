import { string } from "locutus/python";
import Entity, { EntityInterface } from "./Entity";
import { LinkListInterface } from "./LinkList";

interface EntityTypeInterface extends EntityInterface {
  langcode: string;
  status: boolean;
  drupal_internal__id: string;
  label: string;
  description: string;
}

abstract class EntityType extends Entity implements EntityTypeInterface {
  langcode: string;

  status: boolean;

  drupal_internal__id: string;

  label: string;

  description: string;
}

export { EntityType as default, EntityTypeInterface };
