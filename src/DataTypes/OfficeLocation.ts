import { AddressFieldInterface } from "../Fields/AddressField";
import { KeyValuePair } from "../Fields/SocialMediaLink";

export interface OfficeLocationInterface {
  field_address: AddressFieldInterface;
  field_phone: Array<KeyValuePair>;
  field_email: string;
}

export class OfficeLocation implements OfficeLocationInterface {
  field_address: AddressFieldInterface;
  field_phone: Array<KeyValuePair>;
  field_email: string;

  constructor(props: OfficeLocationInterface) {
    Object.assign(this, props);
  }
}

export default OfficeLocation;
