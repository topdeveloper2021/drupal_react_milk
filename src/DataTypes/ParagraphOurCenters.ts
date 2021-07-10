import Paragraph, { ParagraphInterface } from './Paragraph';

export interface ParagraphOurCentersInterface extends ParagraphInterface {
  data?: any;
}

export class ParagraphOurCenters extends Paragraph implements ParagraphOurCentersInterface {
  data?: any;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  getIncluded(): string {
    return "&include=";
  }
}

export default ParagraphOurCenters;