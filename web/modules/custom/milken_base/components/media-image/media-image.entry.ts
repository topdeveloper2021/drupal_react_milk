
import * as MediaImageStyles from './media-image.scss';
import {MediaImage, MediaImageInterface} from "DataTypes/MediaImage";
import {WebComponentBase} from "Utility/WebComponentBase";

const mediaImageTemplate = document.createElement("template");

mediaImageTemplate.innerHTML = `
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
  "media-image",
  class MediaImageElement extends WebComponentBase {
    entityData: MediaImageInterface;

    constructor() {
      super();
      try {
        const shadowRoot = this.attachShadow({ mode: "open" });
        const parsed = JSON.parse(this.getAttribute('data-entity'));
        this.entityData = new MediaImage(parsed.data);
        this.styles = MediaImageStyles.default.toString();
        this.template = mediaImageTemplate;
        this.addStyles(shadowRoot);
        this.applyTemplate(shadowRoot);
      } catch(err) {
        this.errorHandler(err);
      }
    }

    getThumbnailUrl = (): string => {
      return this.entityData.field_media_image?.imageStyleObject.medium;
    }
  }
);
