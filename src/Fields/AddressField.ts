export interface AddressFieldInterface {
  langcode?: string;
  country_code: string;
  administrative_area: string;
  dpendent_locality: string;
  postal_code: string;
  sorting_code: null;
  address_line1: string;
  address_line2: string;
  organization: string;
}

export class AddressField {
  langcode?: string;
  country_code: string;
  administrative_area: string;
  dpendent_locality: string;
  postal_code: string;
  sorting_code: null;
  address_line1: string;
  address_line2: string;
  organization: string;
}

export default AddressField;
