import {
  Slide,
  SlideInterface,
  SlideKeyValueText,
  SlideKeyValueTextInterface,
} from "./Slide";
import ColorObject, { ColorObjectInterface } from "./ColorObject";
import { ImageFile, ImageFileInterface } from "./ImageFile";
import SlideType, { SlideTypeInterface } from "./SlideType";
import { Link, LinkInterface } from "./LinkList";

export interface SlideFullWidthOneColumnInterface extends SlideInterface {
  field_background_color?: ColorObjectInterface;
  field_link?: LinkInterface;
  field_promoted: boolean;
  field_published: boolean;
  field_text_color?: ColorObjectInterface;
  slide_type: SlideTypeInterface;
  field_is_hero_image?: boolean;
  field_background_image?: ImageFileInterface;
  field_slide_text?: Array<SlideKeyValueTextInterface>;
}

export class SlideFullWidthOneColumn
  extends Slide
  implements SlideFullWidthOneColumnInterface {
  private _field_background_color: ColorObjectInterface;

  private _field_is_hero_image: boolean;

  private _field_background_image: ImageFile;

  private _field_link: Link;

  private _field_slide_text: Array<SlideKeyValueTextInterface>;

  private _field_text_color: ColorObjectInterface;

  private _slide_type: SlideType;

  field_promoted: boolean;

  field_published: boolean;

  constructor(incoming: SlideFullWidthOneColumnInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }

  get field_background_color(): ColorObjectInterface {
    return this._field_background_color;
  }

  set field_background_color(value: ColorObjectInterface) {
    this._field_background_color = new ColorObject(value);
  }

  get field_is_hero_image() {
    return this._field_is_hero_image;
  }

  set field_is_hero_image(value: boolean) {
    this._field_is_hero_image = ( value === null || value === true ) ? true : false;
  }

  get field_background_image(): ImageFileInterface {
    return this._field_background_image;
  }

  set field_background_image(value: ImageFileInterface) {
    this._field_background_image = new ImageFile(value);
  }

  get field_link(): LinkInterface {
    return this._field_link;
  }

  set field_link(value: LinkInterface) {
    this._field_link = new Link(value);
  }

  get field_slide_text(): Array<SlideKeyValueTextInterface> {
    return this._field_slide_text;
  }

  set field_slide_text(value: Array<SlideKeyValueTextInterface>) {
    this._field_slide_text = value.map((item) => new SlideKeyValueText(item));
  }

  get field_text_color(): ColorObjectInterface {
    return this._field_text_color;
  }

  set field_text_color(value: ColorObjectInterface) {
    this._field_text_color = value;
  }

  get slide_type(): SlideType {
    return this._slide_type;
  }

  set slide_type(value: SlideType) {
    this._slide_type = value;
  }

  getIncluded(): string {
    return "&include=field_background_image";
  }

  hasData(): boolean {
    return (
      this.field_published !== undefined &&
      this.field_published !== null &&
      this.field_background_image.imageStyleObject !== null
    );
  }
}

export default SlideFullWidthOneColumn;
