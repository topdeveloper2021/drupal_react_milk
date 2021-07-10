import EventListItemDisplay from "./EventListItemDisplay";
import {EventCardDisplay} from "./EventCardDisplay";
import {EventDoubleHeightTile} from "./EventDoubleHeightTile";
import {EventFullDisplay} from "./EventFullDisplay";

export const EventComponentFactory = (view_mode: string) => {
  switch (view_mode) {
    case "list":
      return EventListItemDisplay;
    case "card":
    case "tile":
      return EventCardDisplay;
    case "double_height_tile":
      return EventDoubleHeightTile;
    case "full":
      return EventFullDisplay;
    default:
      throw new Error("No valid view mode value.");
  }
};

export default EventComponentFactory;
