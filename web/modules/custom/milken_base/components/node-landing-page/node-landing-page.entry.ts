
import * as NodeLandingPageStyles from './node-landing-page.scss';
import { NodeLandingPage, NodeLandingPageInterface } from "DataTypes/NodeLandingPage";
import {WebComponentBase} from "Utility/WebComponentBase";

const nodeLandingPageDisplayTemplate = document.createElement("template");

nodeLandingPageDisplayTemplate.innerHTML = `
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
  "node-landing-page",
  class NodeLandingPageElement extends WebComponentBase {

    entityData: NodeLandingPageInterface;

    constructor() {
      super();
      const shadowRoot = this.attachShadow({mode: "open"});
      try {
        const parsed = JSON.parse(this.getAttribute('data-entity'));
        this.entityData = new NodeLandingPage(parsed.data);
        this.styles = NodeLandingPageStyles.default.toString();
        this.template = nodeLandingPageDisplayTemplate;
        this.addStyles(shadowRoot);
        this.applyTemplate(shadowRoot);
      } catch(err) {
        this.errorHandler(err);
      }

    }

    getThumbnailUrl(): string {
      return this.entityData.field_hero_image?.uri.url;
    }
  }
);
