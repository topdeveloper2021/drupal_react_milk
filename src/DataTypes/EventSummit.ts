import Event, { EventInterface } from "./Event";
import { TextFieldInterface } from "../Fields/TextField";
import { ParagraphInterface } from "./Paragraph";

export type EventSummitInterface = EventInterface;

export class EventSummit extends Event implements EventSummitInterface {
  constructor(incoming: EventSummitInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }
}

export default EventSummit;
