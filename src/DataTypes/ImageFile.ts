import Entity, { EntityInterface } from "./Entity";
import ImageStyleObject, {
  ImageStyleObjectInterface,
} from "./ImageStyleObject";
import File, { FileInterface } from "./File";

export interface ImageFileMetaDataInterface {
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
}

export interface ImageFileInterface extends FileInterface {
  filemime: string;
  filename: string;
  filesize: number | string;
  image_style_uri: ImageStyleObjectInterface;
  meta: ImageFileMetaDataInterface;
  status: boolean;
  imageStyleObject: ImageStyleObjectInterface;
}

export class ImageFile extends File implements ImageFileInterface {
  filemime: string;

  filename: string;

  filesize: number | string;

  _image_style_uri?: ImageStyleObject;

  meta: ImageFileMetaDataInterface;

  status: boolean;

  constructor(incoming: ImageFileInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }

  get image_style_uri(): ImageStyleObjectInterface {
    return this._image_style_uri;
  }

  set image_style_uri(incoming) {
    if (Array.isArray(incoming)) {
      this.setImageStyles(incoming);
    }
    if (incoming instanceof ImageStyleObject) {
      this._image_style_uri = incoming;
    }
  }

  hasData(): boolean {
    return this.status !== undefined;
  }

  getIncluded(): string {
    return "";
  }

  get imageMultiUrl(): string {
    return this.hasData()
      ? this.imageStyleObject?.srcSet
      : `"holder.js/100x100" 100w, "holder.js/220x220" 220w, "holder.js/480x480" 480w, "holder.js/1920x1080" 1920w`;
  }

  get imageStyleObject(): ImageStyleObjectInterface | null {
    return this._image_style_uri ?? null;
  }

  setImageStyles(incoming: Array<Record<string, string>>) {
    this._image_style_uri = new ImageStyleObject(incoming);
  }
}

export default ImageFile;
