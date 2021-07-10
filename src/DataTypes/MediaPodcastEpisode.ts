import { ImageFile, ImageFileInterface } from "./ImageFile";
import { AudioFile, AudioFileInterface } from "./AudioFile";
import { DocumentFile, DocumentFileInterface } from "./DocumentFile";
import { TextField } from "../Fields/TextField";
import { PathObject, PathObjectInterface } from "./PathObject";
import { MediaType, MediaTypeInterface } from "./MediaType";
import { Media, MediaInterface } from "./Media";

export interface MediaPodcastServiceLinkInterface {
  key: string;
  description: string;
  value: string;
}

export interface MediaPodcastEpisodeInterface extends MediaInterface {
  name?: string;
  field_promo_image?: any;
  field_body?: TextField;
  field_episode?: number;
  field_media_audio_file?: AudioFileInterface;
  field_media_image?: ImageFileInterface;
  field_media_in_library?: boolean;
  field_service_links?: Array<MediaPodcastServiceLinkInterface>;
  field_summary?: TextField;
  field_transcript?: DocumentFileInterface;
  field_people?: any;
  field_topics?: any;
  field_tags?: any;
  field_centers?: any;
  field_regions?: any;
  media_type?: MediaType;
  parent_field_name?: string;
  parent_type?: string;
  path?: PathObject;
  thumbnail?: ImageFile;
}

export class MediaPodcastEpisode extends Media implements MediaPodcastEpisodeInterface {
  name: string;
  field_photo_subject_name?: string;
  field_photo_subject_title?: string;
  parent_field_name?: string;
  parent_type?: string;
  field_promo_image?: any;
  field_body?: TextField;
  field_episode?: number;
  field_media_in_library?: boolean;
  field_service_links?: Array<MediaPodcastServiceLinkInterface>;
  field_summary?: TextField;
  field_people?: any;
  field_topics?: any;
  field_tags?: any;
  field_centers?: any;
  field_regions?: any;

  protected _field_media_audio_file?: AudioFile;
  protected _field_media_image?: ImageFile;
  protected _field_transcript?: DocumentFile;
  protected _media_type?: MediaType;
  protected _path?: PathObject;
  protected _thumbnail?: ImageFile;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  getIncluded(): string {
    return "&include=field_promo_image.field_media_image,field_media_image,thumbnail,field_media_audio_file,field_people,field_guests,field_topics,field_tags,field_centers,field_regions";
  }

  hasData(): boolean {
    return this.status !== undefined && this.field_people[0].created !== undefined;
  }

  get field_media_audio_file(): AudioFileInterface {
    return this._field_media_audio_file;
  }

  set field_media_audio_file(incoming: AudioFileInterface) {
    if (incoming) {
      this._field_media_audio_file = new AudioFile(incoming);
    }
  }

  get field_media_image(): ImageFileInterface {
    return this._field_media_image;
  }

  set field_media_image(value: ImageFileInterface) {
    this._field_media_image = new ImageFile(value);
  }

  get field_transcript(): DocumentFileInterface {
    return this._field_transcript;
  }

  set field_transcript(value: DocumentFileInterface) {
    this._field_transcript = new DocumentFile(value);
  }

  get media_type(): MediaTypeInterface {
    return this._media_type;
  }

  set media_type(value: MediaTypeInterface) {
    this._media_type = new MediaType(value);
  }

  get path(): PathObjectInterface {
    return this._path;
  }

  set path(value: PathObjectInterface) {
    this._path = new PathObject(value);
  }

  get thumbnail(): ImageFileInterface {
    return this.field_media_image;
  }

  set thumbnail(value: ImageFileInterface) {
    this.field_media_image = new ImageFile(value);
  }



  getThumbnail() {
    return this.field_media_image;
  }

  getSource() {
    return this._field_media_audio_file;
  }
}

export default MediaPodcastEpisode;
