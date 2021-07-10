import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import ColorObject, { ColorObjectInterface } from "./ColorObject";
import PathObject, { PathObjectInterface } from "./PathObject";
import Entity, { EntityInterface } from "./Entity";

export interface TaxonomyTermInterface extends EntityInterface {
  name: string;
  machine_name: string;
  description?: string;
  drupal_internal__tid?: number;
  field_visibility?: boolean;
  vid?: string;
  field_tag_color?: ColorObjectInterface;
  field_tag_icon?: FontAwesomeIconProps;
  path?: PathObjectInterface;
}

export class TaxonomyTerm extends Entity implements TaxonomyTermInterface {
  name: string;

  machine_name: string;

  description?: string;

  drupal_internal__tid?: number;

  field_visibility?: boolean;

  vid?: string;

  private _field_tag_color?: ColorObject;

  private _field_tag_icon?: FontAwesomeIconProps;

  private _path?: PathObject;

  constructor(incoming: TaxonomyTermInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }

  get field_tag_color(): ColorObjectInterface | undefined {
    return this._field_tag_color;
  }

  set field_tag_color(incoming: ColorObjectInterface) {
    if (incoming !== undefined) {
      this._field_tag_color = new ColorObject(incoming);
    }
  }

  get field_tag_icon(): FontAwesomeIconProps {
    return this._field_tag_icon;
  }

  set field_tag_icon(field_tag_icon: FontAwesomeIconProps) {
    if (field_tag_icon !== undefined) {
      this._field_tag_icon = field_tag_icon;
    }
  }

  get path(): PathObjectInterface {
    return this._path;
  }

  set path(incoming: PathObjectInterface) {
    if (incoming !== undefined) {
      this._path = new PathObject(incoming);
    }
  }

  hasData(): boolean {
    return this.status !== undefined;
  }

  getIncluded(): string {
    return "&include=field_tag_icon";
  }
}

export default TaxonomyTerm;
