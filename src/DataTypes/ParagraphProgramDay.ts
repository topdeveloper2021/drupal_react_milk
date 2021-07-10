import Paragraph, { ParagraphInterface } from "./Paragraph";
import { EntityInterface } from "./Entity";

export interface ParagraphProgramDayInterface extends ParagraphInterface {
  field_grid_event_id: string;
  field_program_date: string;
}

/**
 * Paragraph Tiles
 */
export class ParagraphProgramDay
  extends Paragraph
  implements ParagraphProgramDayInterface {
  field_grid_event_id: string;
  _field_program_date: Date;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  getIncluded(): string {
    return "&include=paragraph_type";
  }

  hasData() {
    return this.status !== undefined;
  }

  set field_program_date(incoming: string) {
    this._field_program_date = new Date(incoming);
  }

  get field_program_date(): string {
    return this._field_program_date.toISOString();
  }

  getDateObject(): Date {
    return this._field_program_date;
  }
}

export default ParagraphProgramDay;
