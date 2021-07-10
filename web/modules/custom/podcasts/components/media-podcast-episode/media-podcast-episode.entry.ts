
import * as MediaPodcastEpisodeStyles from './media-podcast-episode.scss';
import { MediaPodcastEpisode, MediaPodcastEpisodeInterface } from "DataTypes/MediaPodcastEpisode";
import { WebComponentBase } from "Utility/WebComponentBase";

const MediaPodcastEpisodeTemplate = document.createElement("template");

MediaPodcastEpisodeTemplate.innerHTML = `
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
  "media-podcast-episode",
  class MediaPodcastEpisode extends WebComponentBase {
    entityData: MediaPodcastEpisodeInterface;

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      try {
        const parsed = JSON.parse(this.getAttribute('data-entity'));
        this.entityData = new MediaPodcastEpisode(parsed.data);
        this.styles = MediaPodcastEpisodeStyles.default.toString();
        this.template = MediaPodcastEpisodeTemplate;
        this.addStyles(shadowRoot);
        this.applyTemplate(shadowRoot);
      } catch (err) {
        this.handleError(err);
      }
    }

    getThumbnailUrl(): string {
      return this.entityData.field_media_image?.imageStyleObject.medium;
    }

  }
);
