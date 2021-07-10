import Entity, { EntityInterface } from "./Entity";

export interface BundleInterface extends EntityInterface {
  drupal_internal__id?: string;
  drupal_internal__type?: string;
  status: boolean;
  dependencies: Record<string, any>;
  third_party_settings: Record<string, any>;
  label?: string;
  name?: string;
  description: string;
  help: string;
  new_revision: boolean;
  preview_mode: boolean;
  display_submitted: boolean;
}

export class Bundle extends Entity implements BundleInterface {
  _drupal_internal: string;
  status: true;
  dependencies: Record<string, any>;
  third_party_settings: Record<string, any>;
  _label: string;
  description: string;
  help: string;
  new_revision: boolean;
  preview_mode: boolean;
  display_submitted: boolean;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  /**
   * NOTE: There's a drupal irregularity where some bundles use drupal_internal__type
   * and some use drupal_internal__id. These accessor methods make both uses supported.
   * Same with name/label.
   */

  get drupal_internal__type(): string {
    return this._drupal_internal;
  }

  set drupal_internal__type(incoming: string) {
    this._drupal_internal = incoming;
  }

  get drupal_internal__id(): string {
    return this._drupal_internal;
  }

  set drupal_internal__id(incoming: string) {
    this._drupal_internal = incoming;
  }

  get label(): string {
    return this._label;
  }

  set label(incoming: string) {
    this._label = incoming;
  }

  get name(): string {
    return this._label;
  }

  set name(incoming: string) {
    this._label = incoming;
  }
}

export default Bundle;
