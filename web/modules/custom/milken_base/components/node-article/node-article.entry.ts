
import * as NodeArticleStyles from './node-article.scss';
import { NodeArticle, NodeArticleInterface } from "DataTypes/NodeArticle";
import {WebComponentBase} from "Utility/WebComponentBase";

const nodeArticleTemplate = document.createElement("template");

nodeArticleTemplate.innerHTML = `
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
  "node-article",
  class NodeArticleElement extends WebComponentBase {

    entityData: NodeArticleInterface;

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      const parsed = JSON.parse(this.getAttribute('data-entity'));
      this.entityData = new NodeArticle(parsed.data);
      this.styles = NodeArticleStyles.default.toString();
      this.template = nodeArticleTemplate;
      this.addStyles(shadowRoot);
      this.applyTemplate(shadowRoot);
    }

    getThumbnailUrl = (): string => {
      return null;
    }
  }
);
