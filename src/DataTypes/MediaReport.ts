import { Media, MediaInterface } from "./Media";
import { TaxonomyTerm, TaxonomyTermInterface } from "./TaxonomyTerm";
import { ParagraphInterface } from "./Paragraph";
import { ImageFile, ImageFileInterface } from "./ImageFile";
import { Link, LinkInterface } from "./LinkList";
import { DocumentFile, DocumentFileInterface } from "./DocumentFile";
import { Event, EventInterface } from "./Event";
import User, { UserInterface } from "./User";

export interface MediaReportInterface extends MediaInterface {
  field_author: UserInterface;
  field_authors: Array<any>;
  field_collections?: Array<any>;
  field_centers: TaxonomyTermInterface;
  field_content: Array<ParagraphInterface>;
  field_cover: ImageFileInterface;
  field_custom_author: Record<string, any>;
  field_essay: LinkInterface;
  field_media_file: DocumentFileInterface;
  field_program_initiatives: TaxonomyTermInterface;
  field_regions?: Array<any>;
  field_related_event: EventInterface;
  field_term_collection: TaxonomyTermInterface;
  field_tags?: Array<any>;
  field_topics?: Array<any>;
}

export class MediaReport extends Media implements MediaReportInterface {
  field_authors: Array<any>;
  field_collections?: Array<any>;
  field_content: Array<ParagraphInterface>;
  field_essay: Link;
  field_regions?: Array<any>;
  field_tags?: Array<any>;
  field_topics?: Array<any>;

  protected _field_author: User;

  protected _field_centers: TaxonomyTerm;

  protected _field_cover: ImageFile;

  protected _field_custom_author: Record<string, unknown>;

  protected _field_media_file: DocumentFile;

  protected _field_program_initiatives: TaxonomyTerm;

  protected _field_related_event: Event;

  protected _field_term_collection: TaxonomyTerm;

  // protected _field_topics: TaxonomyTerm;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  getIncluded(): string {
    return "&include=field_cover,field_media_file,field_tags,field_topics,field_collections,field_regions,field_authors,field_authors.field_photo";
  }

  hasData(): boolean {
    return this.status !== undefined;
  }

  getThumbnail(): ImageFileInterface {
    return this.field_cover;
  }

  get field_author(): User {
    return this._field_author;
  }

  set field_author(value: User) {
    this._field_author = value;
  }

  get field_centers(): TaxonomyTermInterface {
    return this._field_centers;
  }

  set field_centers(incoming: TaxonomyTermInterface) {
    this._field_centers = new TaxonomyTerm(incoming);
  }

  get field_cover(): ImageFileInterface {
    return this._field_cover;
  }

  set field_cover(incoming: ImageFileInterface) {
    this._field_cover = new ImageFile(incoming);
  }

  get field_custom_author() {
    return this._field_centers;
  }

  set field_custom_author(incoming) {
    // TODO: Build out authors functionality
    this._field_centers = incoming;
  }

  get field_media_file(): DocumentFileInterface {
    return this._field_media_file;
  }

  set field_media_file(value: DocumentFileInterface) {
    this._field_media_file = new DocumentFile(value) ?? null;
  }

  get field_program_initiatives(): TaxonomyTerm {
    return this._field_program_initiatives;
  }

  set field_program_initiatives(value: TaxonomyTerm) {
    this._field_program_initiatives = value;
  }

  get field_related_event(): Event {
    return this._field_related_event;
  }

  set field_related_event(value: Event) {
    this._field_related_event = value;
  }

  get field_term_collection(): TaxonomyTerm {
    return this._field_term_collection;
  }

  set field_term_collection(value: TaxonomyTerm) {
    this._field_term_collection = value;
  }

  // get field_topics(): TaxonomyTerm {
  //   return this._field_topics;
  // }

  // set field_topics(value: TaxonomyTerm) {
  //   this._field_topics = value;
  // }

  get thumbnail(): ImageFileInterface {
    return this.field_cover;
  }

  set thumbnail(incoming: ImageFileInterface) {
    // Ignore the thumnail value and use the
    // "cover" image as thumb
  }

  getSource() {
    return this.field_media_file;
  }
}

export default MediaReport;
