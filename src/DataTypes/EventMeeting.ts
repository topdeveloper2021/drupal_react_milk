import Event, { EventInterface } from "./Event";
import { TextFieldInterface } from "../Fields/TextField";
import { ParagraphInterface } from "./Paragraph";

export type EventMeetingInterface = EventInterface;

export class EventMeeting extends Event {
  constructor(incoming: EventMeetingInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }
}

export default EventMeeting;
