
import * as MediaVideoStreamStyles from './media-video-stream.scss';
import { MediaVideoStream, MediaVideoStreamInterface } from "DataTypes/MediaVideoStream";
import { WebComponentBase } from "Utility/WebComponentBase";

const MediaVideoStreamTemplate = document.createElement("template");

MediaVideoStreamTemplate.innerHTML = `
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
  "media-video-stream",
  class MediaVideoStreanElement extends WebComponentBase {

    entityData: MediaVideoStreamInterface;

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      try {
        const parsed = JSON.parse(this.getAttribute('data-entity'));
        this.entityData = new MediaVideoStream(parsed.data);
        this.styles = MediaVideoStreamStyles.default.toString();
        this.template = MediaVideoStreamTemplate;
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
