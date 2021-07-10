import {TaxonomyTermInterface} from "../TaxonomyTerm";
import {EventInterface} from "../Event";
import {ImageFileInterface} from "../ImageFile";
import {KeyValuePair} from "../../Fields/SocialMediaLink";
import People, {PeopleInterface} from "./index";

export interface PersonInterface extends PeopleInterface {
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

export class Person extends People implements PersonInterface {
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

  hasData() : boolean {
    return (
      this.field_first_name !== undefined && typeof(this.field_first_name) === "string" ||
      this.field_middle_name !== undefined && typeof(this.field_middle_name) === "string" ||
      this.field_last_name !== undefined && typeof(this.field_last_name) === "string"
    )
  }

  getIncluded(): string {
    return "&include=field_photo,field_event,field_centers";
  }
}

export default Person;
