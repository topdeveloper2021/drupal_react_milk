import {TaxonomyTermInterface} from "../TaxonomyTerm";
import {EventInterface} from "../Event";
import {ImageFileInterface} from "../ImageFile";
import {KeyValuePair} from "../../Fields/SocialMediaLink";
import People, {PeopleInterface} from "./index";


export interface StaffInterface extends PeopleInterface {
  field_biotext: string;
  field_centers: Array<TaxonomyTermInterface>;
  field_teams: Array<TaxonomyTermInterface>;
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


export class Staff extends People implements StaffInterface {
  field_biotext: string;
  field_centers: Array<TaxonomyTermInterface>;
  field_teams: Array<TaxonomyTermInterface>;
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
    return "&include=field_centers,field_event,field_photo,field_regions,field_tags,field_teams";
  }
}

export default Staff;
