import Node, { NodeInterface } from "./Node";
import TaxonomyTerm, { TaxonomyTermInterface } from "./TaxonomyTerm";
import Paragraph, { ParagraphInterface } from "./Paragraph";
import Slide, { SlideInterface } from "./Slide";
import { EntityInterface } from "./Entity";
import { UserInterface } from "./User";

export interface NodeArticleInterface extends NodeInterface {
  field_authors: Array<any>;
  field_centers: TaxonomyTermInterface;
  field_collections?: Array<any>;
  field_content: Array<ParagraphInterface>;
  field_promo_slide?: SlideInterface;
  field_region?: Array<any>;
  field_tags?: Array<any>;
  field_topics?: Array<any>;
  // field_topics: TaxonomyTermInterface;
}

export class NodeArticle extends Node implements NodeArticleInterface {
  field_authors: Array<any>;
  field_collections?: Array<any>;
  field_region?: Array<any>;
  field_tags?: Array<any>;
  field_topics?: Array<any>;

  private _field_centers: TaxonomyTermInterface;

  private _field_content: Array<Paragraph>;

  private _field_promo_slide?: Slide | undefined;

  // private _field_topics: TaxonomyTermInterface;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  hasData(): boolean {
    return this.status !== undefined;
  }

  getIncluded(): string {
    return "&include=field_promo_slide,field_tags,field_topics,field_collections,field_region,field_authors,field_authors.field_photo";
  }

  getItems(): Array<EntityInterface> {
    return this.field_content;
  }

  get browser() {
    return false;
  }

  get field_centers(): TaxonomyTermInterface | undefined {
    return this._field_centers;
  }

  set field_centers(value: TaxonomyTermInterface) {
    this._field_centers = new TaxonomyTerm(value);
  }

  get field_content(): Array<ParagraphInterface> | undefined {
    return this._field_content;
  }

  set field_content(value: Array<ParagraphInterface>) {
    this._field_content = value;
  }

  get field_promo_slide(): SlideInterface | undefined {
    return this._field_promo_slide;
  }

  set field_promo_slide(value: SlideInterface) {
    if (value.data === undefined) {
      this._field_promo_slide = value;
    }
  }

  // get field_topics(): TaxonomyTermInterface | undefined {
  //   return this._field_topics;
  // }

  // set field_topics(value: TaxonomyTermInterface) {
  //   this._field_topics = new TaxonomyTerm(value);
  // }
}

export default NodeArticle;
