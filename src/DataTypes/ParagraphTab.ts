import Paragraph, { ParagraphInterface } from "./Paragraph";

export interface ParagraphTabInterface extends ParagraphInterface {
  field_tab_content: Array<ParagraphInterface>;
  admin_title: string;
}

export class ParagraphTab extends Paragraph {
  field_tab_content: Array<ParagraphInterface>;
  admin_title: string;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }
}

export default ParagraphTab;
