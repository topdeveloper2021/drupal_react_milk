
import * as MediaVideoStyles from './media-video.scss';
import { MediaVideo, MediaVideoInterface } from "DataTypes/MediaVideo";
import { WebComponentBase } from "Utility/WebComponentBase";

const MediaVideoTemplate = document.createElement("template");

MediaVideoTemplate.innerHTML = `
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
  "media-video",
  class MediaVideoElement extends WebComponentBase {

    entityData: MediaVideoInterface;

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      try {
        const parsed = JSON.parse(this.getAttribute('data-entity'));
        this.entityData = new MediaVideo(parsed.data);
        this.styles = MediaVideoStyles.default.toString();
        this.template = MediaVideoTemplate;
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
