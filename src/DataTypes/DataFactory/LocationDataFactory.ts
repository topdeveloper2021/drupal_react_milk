import { EntityInterface } from "../Entity";
import ConferenceCenterLocation from "../ConferenceCenterLocation";
import OfficeLocation from "../OfficeLocation";

export const LocationDataFactory = (incoming: EntityInterface) => {
  switch (incoming.type) {
    case "conference_center":
      return new ConferenceCenterLocation(incoming);

    case "office":
      return new OfficeLocation(incoming);

    default:
      throw new Error("No Location type defined for: ".concat(incoming.type));
  }
};

export default LocationDataFactory;
