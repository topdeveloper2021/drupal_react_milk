import RevisionableEntity, {
  RevisionableEntityInterface,
} from "./RevisionableEntity";
import ColorObject, { ColorObjectInterface } from "./ColorObject";
import { SlideInterface } from "./Slide";
import Paragraph, { ParagraphInterface } from "./Paragraph";

export interface ParagraphSlideInterface extends ParagraphInterface {
  field_background_color: ColorObjectInterface;
  field_slides: Array<SlideInterface>;
}

export default class ParagraphSlide
  extends Paragraph
  implements ParagraphSlideInterface {
  _field_background_color: ColorObjectInterface;

  field_slides: Array<SlideInterface>;

  constructor(incoming: ParagraphSlideInterface) {
    super(incoming);
    Object.assign(this, incoming);
    console.debug("ParagraphSlide constructor", this);
  }

  hasData(): boolean {
    return this.field_slides !== undefined && Array.isArray(this.field_slides);
  }

  get field_background_color(): ColorObjectInterface {
    return this._field_background_color;
  }

  set field_background_color(incoming: ColorObjectInterface) {
    this._field_background_color = new ColorObject(incoming);
  }

  getIncluded(): string {
    return "&include=field_slides,field_slides.field_background_image";
  }
}
