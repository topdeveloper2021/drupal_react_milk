import MediaType, { MediaTypeInterface } from "./MediaType";
import RevisionableEntity, {
  RevisionableEntityInterface,
} from "./RevisionableEntity";
import { ImageFileInterface } from "./ImageFile";
import { PathObjectInterface } from "./PathObject";

export interface MediaInterface extends RevisionableEntityInterface {
  drupal_internal__mid?: string;
  path?: PathObjectInterface;
  bundle: MediaTypeInterface;
  name?: string;

  hasData(): boolean;

  getIncluded(): string;

  getThumbnail(): ImageFileInterface | undefined;
}

export abstract class Media
  extends RevisionableEntity
  implements MediaInterface {
  drupal_internal__mid?: string;

  name?: string;

  path?: PathObjectInterface;

  _bundle?: MediaType;

  field_filemime?: string;

  field_filesize?: number;

  field_height?: string;

  field_width?: string;

  status?: boolean;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  get label(): string {
    return this.name ?? this.title ?? "";
  }

  set title(incoming: string) {
    this._name = incoming;
  }

  get title(): string {
    return this._name;
  }

  get bundle(): MediaTypeInterface {
    return this._bundle;
  }

  set bundle(incoming: MediaTypeInterface) {
    this._bundle = new MediaType(incoming);
  }

  abstract hasData(): boolean;

  abstract getIncluded(): string;

  abstract getThumbnail(): ImageFileInterface;

  abstract getSource();
}

export default Media;
