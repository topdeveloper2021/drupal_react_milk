import Paragraph, { ParagraphInterface } from "./Paragraph";

export interface ParagraphPodcastBrowserInterface extends ParagraphInterface {
  field_topics: Array<ParagraphInterface>;
  admin_title: string;
}

export class ParagraphPodcastBrowser extends Paragraph {
  field_topics: Array<ParagraphInterface>;
  admin_title: string;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }
}

export default ParagraphPodcastBrowser;
