import {ImageFileInterface} from "./ImageFile";
import {ImageStyleObjectInterface} from "./ImageStyleObject";
import {LinkListInterface} from "./LinkList";
import {ImageFileMetaDataInterface} from "./ImageFile";
import {UserInterface} from "./User";
import { FileURIInterface } from './File'
import Path from 'path'

export interface RemoteThumbnailInterface {
  url: string;
}

export class RemoteThumbnail implements ImageFileInterface {
  private parsed: URL;
  private _url: string;
  private _changed: string;
  private _created: string;
  private _drupal_internal__fid: number;
  private _filemime: string;
  private _filename: string;
  private _filesize: number | string;
  private _id: string;
  private _imageStyleObject: ImageStyleObjectInterface;
  private _image_style_uri: Array<object>;
  private _links: LinkListInterface;
  private _meta: ImageFileMetaDataInterface;
  private _status: boolean;
  private _type: string;
  private _uid: UserInterface;
  private _uri: FileURIInterface;

  getIncluded(): string {
    return "";
  }

  hasData(): boolean {
    return true;
  }

  constructor(props) {
    this._url = props.url;
    this.parsed = new URL(props.url);
  }


  get url(): string {
    return this._url;
  }

  get changed(): string {
    return this._changed;
  }

  get created(): string {
    return this._created;
  }

  get drupal_internal__fid(): number {
    return -1;
  }

  get filemime(): string {
    return "application/image";
  }

  get filename(): string {
    return Path.basename(this.parsed.pathname);
  }

  get filesize():number|string {
    return -1;
  }

  get id(): string {
    return this.url
  }

  get imageStyleObject(): ImageStyleObjectInterface {
    return this._imageStyleObject;
  }

  get image_style_uri(): Array<object> {
    return this.url;
  }

  get links(): LinkListInterface {
    return { self: this.url };
  }

  get meta(): ImageFileMetaDataInterface {
    return this._meta;
  }

  get status(): boolean {
    return true;
  }

  get type(): string {
    return this._type;
  }

  get uid(): UserInterface {
    return this._uid;
  }

  get uri(): FileURIInterface {
    return this._uri;
  }
}

export default RemoteThumbnail;
