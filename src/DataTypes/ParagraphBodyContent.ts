import BodyField, { BodyFieldDisplay, BodyFieldInterface, BodyFieldProps } from "../Fields/BodyField";
import ColorObject, { ColorObjectInterface } from "./ColorObject";
import Paragraph, { ParagraphInterface } from "./Paragraph";

interface ParagraphBodyContentInterface extends ParagraphInterface {
  field_background?: string | ColorObjectInterface;
  field_background_image?: any;
  field_body?: BodyFieldInterface;
  field_num_text_columns: number;
}

class ParagraphBodyContent
  extends Paragraph
  implements ParagraphBodyContentInterface {
  _field_background?: string | ColorObject;
  field_background_image?: any;
  _field_body?: BodyFieldProps;
  field_num_text_columns: number;

  constructor(incoming: ParagraphBodyContentInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }

  get field_background(): ColorObjectInterface | string{
    return this._field_background;
  }

  set field_background(incoming: ColorObjectInterface | string) {
    this._field_background = (typeof(incoming) !== "string") ? 
      new ColorObject(incoming) : 
      incoming;
  }

  get field_body(): BodyFieldInterface {
    return this._field_body;
  }

  set field_body(incoming: BodyFieldInterface) {
    this._field_body = new BodyField(incoming);
  }

  hasData(): boolean {
    return (
      this.field_body !== undefined &&
      this.field_body.processed !== undefined &&
      this.field_body.processed !== null
    );
  }

  getIncluded(): string {
    return "&include=field_background_image";
  }
}

export { ParagraphBodyContent as default, ParagraphBodyContentInterface };
