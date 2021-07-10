export interface KeyValuePair {
  key: string;
  value: string;
  description: string;
}

export type SocialMediaLinkInterface = KeyValuePair;

export class SocialMediaLink implements KeyValuePair {
  key: string;

  value: string;

  description: string;

  get socialMediaSite(): string {
    return this.key;
  }

  get socialMediaHandle(): string {
    return this.value;
  }
}

export default SocialMediaLink;
