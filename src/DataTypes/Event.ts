import RevisionableEntity, {
  RevisionableEntityInterface,
} from "./RevisionableEntity";
import PathObject, { PathObjectInterface } from "./PathObject";
import { TextFieldInterface } from "../Fields/TextField";
import { ParagraphInterface } from "./Paragraph";
import { ImageFileInterface } from "./ImageFile";
import { TaxonomyTermInterface } from "./TaxonomyTerm";
import { EntityTypeInterface } from "./EntityType";
import { ParagraphTabInterface } from "./ParagraphTab";

export interface EventInterface extends RevisionableEntityInterface {
  drupal_internal__id?: number;
  langcode?: string;
  title?: string;
  path?: PathObjectInterface;

  field_blurb?: string;
  field_campaign_id?: string;
  field_campaign_name?: string;
  field_campaign_owner?: string;
  field_campaign_type?: string;
  field_campaign_type_public?: string;
  field_description?: TextFieldInterface;
  field_event_date?: string;
  field_grid_event_id?: string;
  field_name_short?: string;
  field_published?: boolean;
  field_registration_deadline?: string;
  field_sequential_id?: number;
  field_speakers?: string;
  field_venue?: string;
  event_type?: EntityTypeInterface;
  field_hero_image?: ImageFileInterface;
  field_title_card_image?: ImageFileInterface;
  field_tracks?: TaxonomyTermInterface;
  field_content_tabs?: Array<ParagraphTabInterface>;
}

export abstract class Event
  extends RevisionableEntity
  implements EventInterface {
  static _uiSchema = {
    "ui:order": [
      "field_grid_event_id",
      "title",
      "field_hero_image",
      "langcode",
      "field_content_tabs",
      "field_speakers",
      "field_venue",
      "field_published",
      "path",
      "*",
    ],
    drupal_internal__id: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    drupal_internal__vid: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    id: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    type: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    created: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    changed: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    event_type: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    field_campaign_id: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    field_campaign_name: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    field_campaign_owner: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    field_campaign_type: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    field_campaign_type_public: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    langcode: {
      "ui:widget": "LanguageReferenceWidget",
    },
    langcode_language: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    langcode_value: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    field_meta_tags: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    field_title_card_image: {
      "ui:widget": "ImageReferenceWidget",
    },
    field_hero_image: {
      "ui:widget": "MediaReferenceWidget",
    },
    field_content_tabs: {
      "ui:widget": "ParagraphReferenceWidget",
    },
    path: {
      "ui:widget": "PathWidget",
    },
    path_alias: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    path_pathauto: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    path_langcode: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    path_id: {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
  };

  drupal_internal__id?: number;
  title?: string;
  langcode?: string;
  private _path?: PathObject;

  field_blurb?: string;
  field_campaign_id?: string;
  field_campaign_name?: string;
  field_campaign_owner?: string;
  field_campaign_type?: string;
  field_campaign_type_public?: string;
  field_description?: TextFieldInterface;
  field_event_date?: string;
  field_grid_event_id?: string;
  field_name_short?: string;
  field_published?: boolean;
  field_registration_deadline?: string;
  field_sequential_id?: number;
  field_speakers?: string;
  field_venue?: string;
  event_type?: EntityTypeInterface;
  field_title_card_image: ImageFileInterface;
  field_tracks?: TaxonomyTermInterface;
  field_content_tabs?: Array<ParagraphTabInterface>;
  field_hero_image?: ImageFileInterface;

  get path(): PathObjectInterface {
    return this._path;
  }

  set path(value: PathObjectInterface) {
    this._path = new PathObject(value);
  }

  hasData(): boolean {
    return this.drupal_internal__id !== undefined;
  }

  getIncluded(): string {
    return "&include=field_content_tabs,field_venue&sort[event-date][path]=field_event_date&sort[event-date][direction]=desc";
  }

  getEventDate(): Date {
    return this._field_event_date;
  }

  toObject() {
    return Object.keys(this).reduce((object, key) => {
      if (this.uiSchema["ui:order"].indexOf(key) !== -1) {
        object[key] = this[key];
      }
      return object;
    }, {});
  }

  get uiSchema(): Record<string, unknown> {
    return Event._uiSchema;
  }
}

export default Event;
