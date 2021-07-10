import { AddressFieldInterface } from "../Fields/AddressField";

export interface ConferenceCenterLocationInterface {
  address: AddressFieldInterface;
  rooms?: Array<unknown>;
}

export class ConferenceCenterLocation
  implements ConferenceCenterLocationInterface {
  address: AddressFieldInterface;
  rooms?: Array<unknown>;
}

export default ConferenceCenterLocation;
