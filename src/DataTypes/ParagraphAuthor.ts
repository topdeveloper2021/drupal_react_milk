import Paragraph, { ParagraphInterface } from "./Paragraph";
import ImageFile, { ImageFileInterface } from "./ImageFile";
import {EntityInterface} from "../DataTypes/Entity";

export interface ParagraphAuthorInterface extends ParagraphInterface {
  field_job_position: string;
  field_name: string;
  field_photo: ImageFileInterface;
  field_author?: Array<EntityInterface>;
}

export class ParagraphAuthor extends Paragraph {
  field_job_position: string;
  field_name: string;
  field_author?: Array<EntityInterface>;
  private _field_photo: ImageFile;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  get field_photo(): ImageFileInterface {
    return this._field_photo;
  }

  set field_photo(value: ImageFileInterface) {
    this._field_photo = new ImageFile(value);
  }
}

export default ParagraphAuthor;
