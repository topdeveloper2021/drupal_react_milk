import { EntityComponentProps } from "./EntityComponentProps";

export interface ImageStyleAttributesInterface {
  srcSet: string;
  className: string;
  "data-aspectratio": string;
  "data-sizes": string;
  style: object;
}

export interface ImageStyleObjectInterface {
  srcSet: string;
  imageAttributes: ImageStyleAttributesInterface;
  backgroundImageSet: string;
}

export class ImageStyleObject implements ImageStyleObjectInterface {
  thumbnail: string;

  medium: string;

  large: string;

  fullscreen: string;

  [propName: string]: any; // Other sizes

  constructor(values: Array<Record<string, string>> = null) {
    if (values !== null) {
      this.reduce(values);
    }
  }

  reduce(values) {
    const reduced = values.reduce(this.reducer);
    Object.assign(this, reduced);
  }

  reducer(accumulator = {}, currentValue, idx, sourceArray) {
    const keys = Object.keys(currentValue);
    accumulator[keys[0]] = currentValue[keys[0]];
    return accumulator;
  }

  getStyleByMachineName(styleName: string): string | null {
    return (this[styleName] as string) ?? null;
  }

  get srcSet(): string {
    return `${this.thumbnail} 100w, ${this.medium} 220w, ${this.large} 480w, ${this.fullscreen} 1920w`;
  }

  get imageAttributes(): ImageStyleAttributesInterface {
    return {
      srcSet: this.srcSet,
      className: "lazyload",
      "data-sizes": "auto",
      style: {
        objectFit: "cover",
      },
    };
  }

  get backgroundImageSet() {
    return this.thumbnail;
  }
}

export class HolderImageStyleObject implements ImageStyleObjectInterface {
  include: "&include=field_media_image,bundle";

  ecp: EntityComponentProps;

  constructor(props) {
    console.log("HolderImageStyleObject", props);
    if (props.id && props.type) {
      this.ecp = new EntityComponentProps(props);
    }
  }

  get srcSet() {
    return `"holder.js/100x100" 100w, "holder.js/220x220" 220w, "holder.js/480x480" 480w, "holder.js/1920x1080" 1920w`;
  }

  async getData() {
    console.debug(this.ecp);
    return this.ecp.getData(this.include);
  }

  get imageAttributes() {
    return {
      srcSet: this.srcSet,
      className: "lazyload",
      "data-aspectratio": "220/150",
      "data-sizes": "auto",
      style: {
        objectFit: "cover",
      },
    };
  }

  getStyleByMachineName(): string {
    return this.srcSet;
  }

  /* eslint-disable */
  get backgroundImageSet() {
    return `image-set( url("holder.js/100x100") 100w, url("holder.js/220x220") 220w, url("holder.js/480x480") 480w, url("holder.js/1920x1080") 1920w )`;
  }
  /* eslint-enable */
}

export default ImageStyleObject;
