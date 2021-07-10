
import * as MediaReportStyles from './location.scss';
import LocationDataFactory from "DataTypes/DataFactory/LocationDataFactory";
import { WebComponentBase } from "Utility/WebComponentBase";
import {OfficeLocationInterface} from "DataTypes/OfficeLocation";
import ConferenceCenterLocation from "DataTypes/ConferenceCenterLocation";

const LocationTemplate = document.createElement("template");

LocationTemplate.innerHTML = `
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
  "location",
  class LocationElement extends WebComponentBase {

    entityData: OfficeLocationInterface | ConferenceCenterLocation;

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      try {
        const parsed = JSON.parse(this.getAttribute('data-entity'));
        this.entityData = LocationDataFactory(parsed.data);
        this.styles = MediaReportStyles.default.toString();
        this.template = LocationTemplate;
        this.addStyles(shadowRoot);
        this.applyTemplate(shadowRoot);
      } catch (err) {
        this.handleError(err);
      }
    }

    getThumbnailUrl = (): string => {
      return null;
    }
  }
);
