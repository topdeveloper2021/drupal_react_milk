import Entity, { EntityInterface } from "../Entity";
import {TaxonomyTermInterface} from "../TaxonomyTerm";
import {EventInterface} from "../Event";
import {ImageFileInterface} from "../ImageFile";
import {KeyValuePair} from "../../Fields/SocialMediaLink";

export interface PeopleInterface extends EntityInterface {
  drupal_internal__id?: number;
  field_biotext: string;
  field_centers: Array<TaxonomyTermInterface>;
  field_description: string;
  field_email: string;
  field_event: EventInterface;
  field_first_name: string;
  field_last_name: string;
  field_middle_name: string;
  field_notes: string;
  field_pgtitle: string;
  field_photo: ImageFileInterface;
  field_social_media: Array<KeyValuePair>;
  field_status: boolean;
}

export abstract class People extends Entity implements PeopleInterface {
  drupal_internal__id?: number;
  field_biotext: string;
  field_centers: Array<TaxonomyTermInterface>;
  field_description: string;
  field_email: string;
  field_event: EventInterface;
  field_first_name: string;
  field_last_name: string;
  field_middle_name: string;
  field_notes: string;
  field_pgtitle: string;
  field_photo: ImageFileInterface;
  field_social_media: Array<KeyValuePair>;
  field_status: boolean;
}

export default People;
