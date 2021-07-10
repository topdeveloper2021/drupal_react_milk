import { Node, NodeInterface } from "./Node";
import { BodyField, BodyFieldInterface } from "../Fields/BodyField";
import { Link, LinkInterface } from "./LinkList";
import { TaxonomyTermInterface } from "./TaxonomyTerm";
import { MediaImageInterface } from "./MediaImage";
import { MetaTagsField, MetaTagsFieldInterface } from "../Fields/MetaTagsField";
import ConferenceCenterLocation from "./ConferenceCenterLocation";
import OfficeLocation, { OfficeLocationInterface } from "./OfficeLocation";

export interface NodeCareerInterface extends NodeInterface {
  field_body: BodyFieldInterface;
  field_careers_apply: LinkInterface;
  field_department: TaxonomyTermInterface;
  field_hero_image: MediaImageInterface;
  field_link_to_video: string;
  field_location: ConferenceCenterLocation;
  field_meta_tags: MetaTagsFieldInterface;
  field_seniority_level: TaxonomyTermInterface;
  field_centers: TaxonomyTermInterface;
}

export class NodeCareer extends Node {
  private _field_body: BodyField;
  private _field_careers_apply: LinkInterface;
  private _field_department: TaxonomyTermInterface;
  private _field_hero_image: MediaImageInterface;
  private _field_location: OfficeLocationInterface;
  private _field_meta_tags: MetaTagsFieldInterface;
  private _field_seniority_level: TaxonomyTermInterface;
  private _field_centers: TaxonomyTermInterface;

  private _field_link_to_video: string;

  getIncluded(): string {
    return "&field_hero_image";
  }

  hasData(): boolean {
    return this.status !== null;
  }

  get field_body(): BodyFieldInterface {
    return this._field_body;
  }

  set field_body(incoming: BodyFieldInterface) {
    this._field_body = new BodyField(incoming);
  }

  get field_careers_apply(): LinkInterface {
    return this._field_careers_apply;
  }

  set field_careers_apply(incoming: LinkInterface) {
    this._field_careers_apply = new Link(incoming);
  }

  get field_department(): TaxonomyTermInterface {
    return this._field_department;
  }

  set field_department(value: TaxonomyTermInterface) {
    this._field_department = value;
  }

  get field_hero_image(): MediaImageInterface {
    return this._field_hero_image;
  }

  set field_hero_image(value: MediaImageInterface) {
    this._field_hero_image = value;
  }

  get field_location(): Record<string, unknown> {
    return this._field_location;
  }

  set field_location(value: Record<string, unknown>) {
    this._field_location = value;
  }

  get field_meta_tags(): MetaTagsFieldInterface {
    return this._field_meta_tags;
  }

  set field_meta_tags(value: MetaTagsFieldInterface) {
    this._field_meta_tags = value;
  }

  get field_seniority_level(): TaxonomyTermInterface {
    return this._field_seniority_level;
  }

  set field_seniority_level(value: TaxonomyTermInterface) {
    this._field_seniority_level = value;
  }

  get field_centers(): TaxonomyTermInterface {
    return this._field_centers;
  }

  set field_centers(value: TaxonomyTermInterface) {
    this._field_centers = value;
  }

  get field_link_to_video(): string {
    return this._field_link_to_video;
  }

  set field_link_to_video(value: string) {
    this._field_link_to_video = value;
  }
}
