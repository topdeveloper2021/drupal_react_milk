
import * as MediaReportStyles from './media-report.scss';
import { MediaReport, MediaReportInterface } from "DataTypes/MediaReport";
import { WebComponentBase } from "Utility/WebComponentBase";

const MediaReportTemplate = document.createElement("template");

MediaReportTemplate.innerHTML = `
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
  "media-report",
  class MediaSponsorLogoElement extends WebComponentBase {

    entityData: MediaReportInterface;

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      try {
        const parsed = JSON.parse(this.getAttribute('data-entity'));
        this.entityData = new MediaReport(parsed.data);
        this.styles = MediaReportStyles.default.toString();
        this.template = MediaReportTemplate;
        this.addStyles(shadowRoot);
        this.applyTemplate(shadowRoot);
      } catch (err) {
        this.handleError(err);
      }
    }

    getThumbnailUrl = (): string => {
      return this.entityData.getThumbnail ?? null;
    }
  }
);
