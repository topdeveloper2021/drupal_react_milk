
import * as NodeCareerStyles from './node-career.scss';
import { NodeCareer, NodeCareerInterface } from "DataTypes/NodeCareer";
import { WebComponentBase } from "Utility/WebComponentBase";

const NodeCareerTemplate = document.createElement("template");

NodeCareerTemplate.innerHTML = `
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

    entityData: NodeCareerInterface;

    constructor() {
      super();
      const shadowRoot = this.attachShadow({mode: "open"});
      try {
        const parsed = JSON.parse(this.getAttribute('data-entity'));
        this.entityData = new NodeCareer(parsed.data);
        this.styles = NodeCareerStyles.default.toString();
        this.template = NodeCareerTemplate;
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
