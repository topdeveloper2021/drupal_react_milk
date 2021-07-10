import Event, { EventInterface } from "./Event";
import { TextFieldInterface } from "../Fields/TextField";
import { ParagraphInterface } from "./Paragraph";

export type EventConferenceInterface = EventInterface;

export class EventConference extends Event implements EventConferenceInterface {
  constructor(props: EventConferenceInterface) {
    super(props);
    Object.assign(this, props);
  }
}

export default EventConference;
