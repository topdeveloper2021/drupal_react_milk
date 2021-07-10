import Paragraph, { ParagraphInterface } from './Paragraph';

export interface ParagraphEventDisplayInterface extends ParagraphInterface {
  admin_title: string;
  field_display_program: boolean;
  field_display_speakers: boolean;
  field_grid_event_id: string;
}

export default class ParagraphEventDisplay
  extends Paragraph
  implements ParagraphEventDisplayInterface {

  admin_title: string;
  field_display_program: boolean;
  field_display_speakers: boolean;
  field_grid_event_id: string;

  constructor(incoming: ParagraphEventDisplayInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }

  public static getIncluded(): string {
    return "";
  }
}
