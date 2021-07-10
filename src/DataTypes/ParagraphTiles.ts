import Paragraph, { ParagraphInterface } from "./Paragraph";
import ColorObject, { ColorObjectInterface } from "./ColorObject";
import { EntityInterface } from "./Entity";
import { EventInterface } from "./Event";
import { MediaInterface } from "./Media";
import { ContentDatatypeInterface } from "./ContentDatatype";
import { EntitySubqueueInterface } from "./EntitySubqueue";
import { SlideInterface } from "./Slide";

export interface ParagraphTilesInterface extends ParagraphInterface {
  tiles?: Array<EntityInterface>;
  field_title?: string;
  field_section_subheader?: string;
  field_view_mode?: string;
  field_background_color?: ColorObjectInterface;
}

/**
 * Paragraph Tiles
 */
export abstract class ParagraphTiles
  extends Paragraph
  implements ParagraphTilesInterface {
  field_title: string;
  field_view_mode: string;
  private _field_background_color: ColorObject;

  protected constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  getIncluded(): string {
    return "&include=paragraph_type";
  }

  get field_background_color(): ColorObjectInterface {
    return this._field_background_color;
  }

  set field_background_color(value: ColorObjectInterface) {
    this._field_background_color = new ColorObject(value);
  }

  get browser() {
    return null;
  }

  hasData() {
    return this.status !== undefined;
  }
}

export default ParagraphTiles;

/**
 * Paragraph Event Tiles
 */
export class ParagraphEventTiles
  extends ParagraphTiles
  implements ParagraphTilesInterface {
  field_event_references: Array<EventInterface>;

  constructor(props) {
    console.debug("Paragraph Event Tiles", props);
    super(props);
    Object.assign(this, props);
  }

  get tiles(): Array<EventInterface> {
    console.debug("Paragraph Event Tiles", this);
    return this.field_event_references;
  }

  set tiles(incoming: Array<EventInterface>) {
    this.field_event_references = incoming;
  }

  getIncluded(): string {
    return super.getIncluded().concat(",field_event_references");
  }
}

/**
 * Paragraph Media Tiles
 */
export class ParagraphMediaTiles
  extends ParagraphTiles
  implements ParagraphTilesInterface {
  field_media_refs: Array<MediaInterface>;

  constructor(props) {
    super(props);
    Object.assign(this, props);
    console.debug("Paragraph Media Tiles Data Props", props);
  }

  get tiles(): Array<MediaInterface> {
    console.debug("Paragraph Media Tiles", this);
    return this.field_media_refs;
  }

  set tiles(incoming: Array<MediaInterface>) {
    this.field_media_refs = incoming;
  }

  getIncluded(): string {
    return super.getIncluded().concat(",field_media_refs,field_media_refs.field_authors,field_media_refs.field_events");
  }
}

/**
 * Paragraph Content Tiles
 */
export class ParagraphContentTiles
  extends ParagraphTiles
  implements ParagraphTilesInterface {
  field_content_refs: Array<ContentDatatypeInterface>;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  get tiles(): Array<ContentDatatypeInterface> {
    console.debug("Paragraph Content Tiles", this);
    return this.field_content_refs;
  }

  set tiles(incoming: Array<ContentDatatypeInterface>) {
    this.field_content_refs = incoming;
  }

  getIncluded(): string {
    return super.getIncluded().concat(",field_content_refs,field_content_refs.field_authors");
  }
}

/**
 * Paragraph EntityQueue Tiles
 */
export class ParagraphEntityQueueTiles
  extends ParagraphTiles
  implements ParagraphTilesInterface {
  field_subqueue: EntitySubqueueInterface;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  get tiles(): Array<EntityInterface> {
    console.debug("Paragraph EntityQueue Tiles", this);
    return this.field_subqueue?.items;
  }

  set tiles(incoming: Array<EntityInterface>) {
    if (this.field_subqueue === undefined) {
      this.field_subqueue = {};
    }
    this.field_subqueue.items = incoming;
  }

  getIncluded(): string {
    return super.getIncluded().concat(",field_subqueue,field_subqueue.items");
  }
}

/**
 * Paragraph Slide Tiles
 */
export class ParagraphSlideTiles
  extends ParagraphTiles
  implements ParagraphTilesInterface {
  field_slide_refs: Array<SlideInterface>;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  get tiles(): Array<SlideInterface> {
    console.debug("Paragraph Slide Tiles", this);
    return this.field_slide_refs;
  }

  set tiles(incoming: Array<SlideInterface>) {
    this.field_slide_refs = incoming;
  }

  getIncluded(): string {
    return super.getIncluded().concat(",field_slide_refs");
  }
}

/**
 * Paragraph Social Tiles
 */
export class ParagraphTilesSocial
  extends ParagraphTiles
  implements ParagraphTilesInterface {
  field_icon_link: Array<any>;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }
}

/**
 * Paragraph Sponsor Tiles
 */
export class ParagraphTilesSponsors
  extends ParagraphTiles
  implements ParagraphTilesInterface {
  field_sponsors: Array<MediaInterface>;
  field_section_subheader: string;
  field_display_size: string;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  get tiles(): Array<MediaInterface> {
    console.debug("Paragraph Tiles Sponsors", this);
    return this.field_sponsors;
  }

  set tiles(incoming: Array<MediaInterface>) {
    this.field_sponsors = incoming;
  }

  getIncluded(): string {
    return super.getIncluded().concat(",field_sponsors");
  }
}