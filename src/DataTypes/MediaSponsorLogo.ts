import Media, { MediaInterface } from "./Media";
import ImageFile, { ImageFileInterface } from "./ImageFile";
import Event from "./Event";

export interface MediaSponsorLogoInterface extends MediaInterface {
  field_media_image: ImageFileInterface;
}

export class MediaSponsorLogo
  extends Media
  implements MediaSponsorLogoInterface {
  private _field_media_image: ImageFileInterface;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  getIncluded(): string {
    return "&include=field_media_image";
  }

  get field_media_image(): ImageFileInterface {
    return this._field_media_image;
  }

  set field_media_image(incoming: ImageFileInterface) {
    this._field_media_image = new ImageFile(incoming);
  }

  getSource() {
    return this.field_media_image;
  }

  getThumbnail(): ImageFileInterface {
    this.field_media_image ?? null;
  }

  hasData(): boolean {
    return this.status !== undefined;
  }
}

export default MediaSponsorLogo;
