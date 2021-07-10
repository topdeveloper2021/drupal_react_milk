import Dependencies, { DependenciesInterface } from "./Dependencies";
import EntityType, { EntityTypeInterface } from "./EntityType";

type SlideTypeDependenciesInterface = DependenciesInterface;

class SlideTypeDependencies extends Dependencies {}

interface SlideTypeInterface extends EntityTypeInterface {
  langcode: string;
  status: boolean;
  dependencies: SlideTypeDependencies;
  drupal_internal__type: string;
  name: string;
  description: string;
}

class SlideType extends EntityType {
  langcode: string;

  status: boolean;

  dependencies: SlideTypeDependencies;

  drupal_internal__type: string;

  name: string;

  description: string;
}

export {
  SlideType as default,
  SlideTypeInterface,
  SlideTypeDependencies,
  SlideTypeDependenciesInterface,
};
