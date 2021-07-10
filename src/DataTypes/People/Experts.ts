import Entity, {EntityInterface} from "../Entity";
import {TaxonomyTermInterface} from "../TaxonomyTerm";
import {EventInterface} from "../Event";
import {ImageFileInterface} from "../ImageFile";
import {KeyValuePair} from "../../Fields/SocialMediaLink";
import People, {PeopleInterface} from "./index";

export interface ExpertsInterface extends PeopleInterface {
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

export class Experts extends People implements ExpertsInterface {
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

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  getIncluded(): string {
    return "&include=field_photo,field_event,field_centers";
  }

}

export default Experts;
