import Entity, { EntityInterface } from "./Entity";
import ParagraphsType, { ParagraphsTypeInterface } from "./ParagraphsType";

export interface ParagraphInterface extends EntityInterface {
  paragraph_type: ParagraphsTypeInterface;
  default_langcode: boolean;
  langcode: string;
  parent_field_name: string;
  parent_id: string;
  parent_type: string;
  status: boolean;
}

export default abstract class Paragraph
  extends Entity
  implements ParagraphInterface {
  _paragraph_type: ParagraphsType;

  default_langcode: boolean;

  langcode: string;

  parent_field_name: string;

  parent_id: string;

  parent_type: string;

  status: boolean;

  constructor(incoming: ParagraphInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }

  get paragraph_type(): ParagraphsTypeInterface {
    return this._paragraph_type;
  }

  set paragraph_type(incoming: ParagraphsTypeInterface) {
    this._paragraph_type = new ParagraphsType(incoming);
  }

  hasData(): boolean {
    return this.status !== undefined;
  }

}
