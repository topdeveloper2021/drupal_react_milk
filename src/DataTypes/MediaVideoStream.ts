import Media, { MediaInterface } from "./Media";
import Event, { EventInterface } from "./Event";
import DateIntervalField, {
  DateIntervalFieldInterface,
} from "../Fields/DateIntervalField";
import People, { PeopleInterface } from "./People/index";
import { ImageFile, ImageFileInterface } from "./ImageFile";

export interface MediaVideoStreamInterface extends MediaInterface {
  field_event_reference: EventInterface;
  field_people: Array<PeopleInterface>;
  field_media_oembed_video: string;
  field_start_finish_time: DateIntervalFieldInterface;
  thumbnail: ImageFileInterface;
}

export class MediaVideoStream
  extends Media
  implements MediaVideoStreamInterface {
  private _field_event_reference: Event;
  private _field_people: Array<People>;
  private _field_start_finish_time: DateIntervalField;
  private _thumbnail: ImageFile;
  private _field_media_oembed_video: string;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  get field_event_reference(): EventInterface {
    return this._field_event_reference;
  }

  set field_event_reference(value: EventInterface) {
    this._field_event_reference = new Event(value);
  }

  get field_people(): Array<PeopleInterface> {
    return this._field_people;
  }

  set field_people(value: Array<PeopleInterface>) {
    this._field_people = value.map((item) => new People(item));
  }

  get field_start_finish_time(): DateIntervalFieldInterface {
    return this._field_start_finish_time;
  }

  set field_start_finish_time(value: DateIntervalFieldInterface) {
    this._field_start_finish_time = new DateIntervalField(value);
  }

  get thumbnail(): ImageFileInterface {
    return this._thumbnail;
  }

  set thumbnail(incoming: ImageFileInterface) {
    this._thumbnail = new ImageFile(incoming);
  }

  getSource() {
    return this.field_media_oembed_video;
  }

  getThumbnail(): ImageFileInterface | undefined {
    return this.thumbnail;
  }

  get field_media_oembed_video(): string {
    return this._field_media_oembed_video;
  }

  set field_media_oembed_video(value: string) {
    this._field_media_oembed_video = value;
  }

  getIncluded(): string {
    return "&include=field_thumbnail,field_people";
  }
}

export default MediaVideoStream;
