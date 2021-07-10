
import * as PeopleStyles from './people.scss';
import DatatypePeopleFactory from "DataTypes/People/Factory";
import { WebComponentBase } from "Utility/WebComponentBase";
import { PeopleInterface } from "DataTypes/People";

const PeopleTemplate = document.createElement("template");

PeopleTemplate.innerHTML = `
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
  "people",
  class PeopleElement extends WebComponentBase {

    entityData: PeopleInterface;

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      try {
        const parsed = JSON.parse(this.getAttribute('data-entity'));
        this.entityData = DatatypePeopleFactory(parsed.data);
        this.styles = PeopleStyles.default.toString();
        this.template = PeopleTemplate;
        this.addStyles(shadowRoot);
        this.applyTemplate(shadowRoot);
      } catch (err) {
        this.handleError(err);
      }
    }

    getThumbnailUrl = (): string => {
      return this.entityData.field_photo?.uri?.url ?? null;
    }
  }
);
