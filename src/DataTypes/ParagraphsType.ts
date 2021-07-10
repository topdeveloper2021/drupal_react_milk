import Dependencies, { DependenciesInterface } from "./Dependencies";
import { EntityInterface } from "./Entity";

type ParagraphsDependenciesInterface = DependenciesInterface;

class ParagraphsDependencies extends Dependencies {}

interface ParagraphsTypeInterface extends EntityInterface {
  type: string;
  id: string;
  dependencies?: ParagraphsDependenciesInterface;
  status: boolean;
  langcode: string;
  third_party_settings: Record<string, unknown>;
  drupal_internal__id: string;
  label: string;
  icon_uuid: string;
  icon_default: string;
  description: string;
  behavior_plugins: Array<unknown>;
}

class ParagraphsType {
  type: string;
  id: string;
  status: boolean;
  langcode: string;
  third_party_settings: Record<string, unknown>;
  drupal_internal__id: string;
  label: string;
  icon_uuid: string;
  icon_default: string;
  description: string;
  behavior_plugins: Array<unknown>;

  _dependencies?: ParagraphsDependencies;

  constructor(incoming: ParagraphsTypeInterface) {
    Object.assign(this, incoming);
  }

  get dependencies(): ParagraphsDependenciesInterface {
    return this._dependencies;
  }

  set dependencies(incoming: ParagraphsDependenciesInterface) {
    this._dependencies = new ParagraphsDependencies(incoming);
  }
}

export {
  ParagraphsType as default,
  ParagraphsDependencies,
  ParagraphsDependenciesInterface,
  ParagraphsTypeInterface,
};
