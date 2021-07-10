
import * as MediaSponsorLogoStyles from './media-sponsor-logo.scss';
import { MediaSponsorLogo, MediaSponsorLogoInterface } from "DataTypes/MediaSponsorLogo";
import { WebComponentBase } from "Utility/WebComponentBase";

const MediaSponsorLogoTemplate = document.createElement("template");

MediaSponsorLogoTemplate.innerHTML = `
<div class="card" >
    <div class="card-header"><slot name="bundle"></slot></div>
    <div class="card-body">
      <slot name="title"></slot>
      <div class="card-title"><slot name="title"></slot></div>
    </div>
  </div>
</div>
`;

customElements.define(
  "media-sponsor-logo",
  class MediaSponsorLogoElement extends WebComponentBase {

    entityData: MediaSponsorLogoInterface;

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      try {
        const parsed = JSON.parse(this.getAttribute('data-entity'));
        this.entityData = new MediaSponsorLogo(parsed.data);
        this.styles = MediaSponsorLogoStyles.default.toString();
        this.template = MediaSponsorLogoTemplate;
        this.addStyles(shadowRoot);
        this.applyTemplate(shadowRoot);
      } catch (err) {
        this.handleError(err);
      }
    }

    getThumbnailUrl = (): string => {
      return this.entityData.thumbnail?.uri.url ?? "";
    }
  }
);
