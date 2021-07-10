import Paragraph, { ParagraphInterface } from './Paragraph';

export interface ParagraphStatsInterface extends ParagraphInterface {
  admin_title: string;
  field_section_header: string;
  field_section_subheader: string;
  field_stat_1_description: string;
  field_stat_1_h_number: string;
  field_stat_1_h_subscript: string;
  field_stat_1_h_symbol: string;
  field_stat_2_description: string;
  field_stat_2_h_number: string;
  field_stat_2_h_subscript: string;
  field_stat_2_h_symbol: string;
  field_stat_3_description: string;
  field_stat_3_h_number: string;
  field_stat_3_h_subscript: string;
  field_stat_3_h_symbol: string;
}

export default class ParagraphStats
  extends Paragraph
  implements ParagraphStatsInterface {

  admin_title: string;
  field_section_header: string;
  field_section_subheader: string;
  field_stat_1_description: string;
  field_stat_1_h_number: string;
  field_stat_1_h_subscript: string;
  field_stat_1_h_symbol: string;
  field_stat_2_description: string;
  field_stat_2_h_number: string;
  field_stat_2_h_subscript: string;
  field_stat_2_h_symbol: string;
  field_stat_3_description: string;
  field_stat_3_h_number: string;
  field_stat_3_h_subscript: string;
  field_stat_3_h_symbol: string;

  constructor(incoming: ParagraphStatsInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }

  public static getIncluded(): string {
    return "";
  }
}
