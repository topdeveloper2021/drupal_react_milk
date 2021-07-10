import Paragraph, { ParagraphInterface } from './Paragraph';

export interface ParagraphLinkBarInterface extends ParagraphInterface {
  admin_title: string;
  field_links: Array<any>;
}

export default class ParagraphLinkBar
  extends Paragraph
  implements ParagraphLinkBarInterface {

  admin_title: string;
  field_links: Array<any>;

  constructor(incoming: ParagraphLinkBarInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }

  public static getIncluded(): string {
    return "";
  }
}
