import Paragraph, { ParagraphInterface } from './Paragraph';
import { ColorObjectInterface } from "./ColorObject";
import BodyField, { BodyFieldInterface } from "../Fields/BodyField";

export interface ParagraphPullQuoteInterface extends ParagraphInterface {
  field_alignment: string;
  field_background_color: ColorObjectInterface;
  field_body: BodyFieldInterface;
  field_text_size: string;
}

export default class ParagraphPullQuote
  extends Paragraph
  implements ParagraphPullQuoteInterface {
  field_alignment: string;

  field_text_size: string;

  private _field_background_color: ColorObjectInterface;

  private _field_body: BodyField;

  constructor(incoming: ParagraphPullQuoteInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }

  get field_background_color(): ColorObjectInterface {
    return this._field_background_color;
  }

  set field_background_color(value: ColorObjectInterface) {
    this._field_background_color = new ColorObject(value);
  }

  get field_body(): BodyFieldInterface {
    return this._field_body;
  }

  set field_body(value: BodyFieldInterface) {
    this._field_body = new BodyField(value);
  }

  public static getIncluded(): string {
    return "";
  }
}
