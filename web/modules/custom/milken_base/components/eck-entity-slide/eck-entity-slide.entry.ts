import { SlideInterface } from 'DataTypes/Slide';
import {SlideDataFactory} from "Components/SlideDisplay/SlideDataFactory";
import { ImageFile } from 'DataTypes/ImageFile';
import * as eckStyles from './eck-entity-slide.scss';
import {WebComponentBase} from "Utility/WebComponentBase";


const slideDisplayTemplate = document.createElement("template");
slideDisplayTemplate.innerHTML = `
<div class="card" >
    <div class="card-header"><slot name="bundle"></slot></div>
    <div class="card-body">
      <div class="card-title"><slot name="title"></slot></div>
    </div>
  </div>
</div>
`;

customElements.define(
  "eck-entity-slide",
  class EckEntitySlideElement extends WebComponentBase {
    entityData: SlideInterface;

    constructor() {
      super();
      try {
        const shadowRoot = this.attachShadow({ mode: "open" });
        const parsed = JSON.parse(this.getAttribute('data-entity'));
        this.entityData = SlideDataFactory(parsed.data);
        this.styles = eckStyles.default.toString();
        this.template = slideDisplayTemplate;
        this.addStyles(shadowRoot);
        this.applyTemplate(shadowRoot);
      } catch(err) {
        this.errorHandler(err);
      }

    }

    getThumbnailUrl = (): string => {
      return this.entityData.field_background_image?.imageStyleObject.medium;
    }
  }
);
