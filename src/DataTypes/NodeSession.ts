import ContentDatatype, { ContentDatatypeInterface } from "./ContentDatatype";
import TextField from "../Fields/TextField";
import { EventInterface } from "./Event";
import { PeopleInterface } from "./People/People";

export interface NodeSessionFieldStartEndInterface {
  value: string;
  end_value: string;
}

export class NodeSessionFieldStartEnd
  implements NodeSessionFieldStartEndInterface {
  start: Date;
  end: Date;

  constructor(incoming: NodeSessionFieldStartEndInterface) {
    console.debug("NodeSessionFieldStartEnd", incoming);
    if (incoming.value) {
      this.start = new Date(incoming.value);
    }
    if (incoming.end_value) {
      this.end = new Date(incoming.end_value);
    }
    console.debug("NodeSessionFieldStartEnd", this);
  }

  get value(): string {
    return this.start.toISOString();
  }

  get value_end(): string {
    return this.end.toISOString();
  }

  getStartDateObject(): Date {
    return this.start;
  }

  getEndDateObject(): Date {
    return this.end;
  }
}

export interface NodeSessionInterface extends ContentDatatypeInterface {
  field_long_description: TextField;
  field_private: boolean;
  field_short_summary: string;
  field_start_end: NodeSessionFieldStartEndInterface;
  field_url: string;
  field_event: EventInterface;
  field_people: Array<PeopleInterface>;
}

export class NodeSession
  extends ContentDatatype
  implements NodeSessionInterface {
  field_long_description: TextField;
  field_private: boolean;
  field_short_summary: string;
  _field_start_end: NodeSessionFieldStartEnd;
  field_url: string;
  field_event: EventInterface;
  field_people: Array<PeopleInterface>;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  hasData(): boolean {
    return this.status !== undefined;
  }

  get field_start_end(): NodeSessionFieldStartEndInterface {
    return this._field_start_end;
  }

  set field_start_end(incoming: NodeSessionFieldStartEndInterface) {
    this._field_start_end = new NodeSessionFieldStartEnd(incoming);
  }

  getStartEndObject(): NodeSessionFieldStartEnd {
    return this._field_start_end;
  }
}

export default NodeSession;
