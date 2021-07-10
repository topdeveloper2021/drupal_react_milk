import {EntityInterface} from "../DataTypes/Entity";


export abstract class WebComponentBase extends HTMLElement {

  template: HTMLTemplateElement;
  styles: string;
  mountPoint: HTMLElement;
  entityData: EntityInterface;
  abstract getThumbnailUrl(): string;

  /**
   * Take the HTML template provided as the base fromework
   * for the component and apply the templated values from
   * the data provided.
   *
   * @param sr
   */
  applyTemplate = (sr: ShadowRoot) => {
    // Supply the template with a value for "title" slot
    const toAppend = document.createElement('h5');
    toAppend.slot = "title";
    toAppend.textContent = this.entityData.label;
    this.appendChild(toAppend);
    const bundleType = document.createElement("span");
    bundleType.slot = "bundle";
    bundleType.className = "bundle";
    bundleType.textContent = this.entityData.constructor.name
    this.appendChild(bundleType);
    // Then apply the template to the shadowroot
    this.mountPoint = document.createElement("div");
    sr.appendChild(this.mountPoint);
    const clone = this.template.content.cloneNode(true);
    this.mountPoint.appendChild(clone);
  }


  errorHandler = (err: Error) => {
    console.error("ERROR:", this.constructor.name, err.message);
    const errorDisplay = document.createElement("span")
    errorDisplay.innerText = err.message;
    errorDisplay.className = "error";
    this.shadowRoot.appendChild()
  }

  /**
   * Add styles to shadow dom from css file in the components folder.
   *
   * @param sr
   */
  addStyles = (sr: ShadowRoot) => {
    const style = document.createElement('style');
    style.textContent = this.styles;
    sr.appendChild(style);
  }

  connectedCallback() {
    console.log("Connected callback", this.getThumbnailUrl());
    const thumbnail = this.getThumbnailUrl();
    if (thumbnail) {
      const backgroundImage = `background-image: url('${thumbnail}'); background-repeat: no-repeat; background-size: cover;`;
      this.mountPoint.querySelector('.card').setAttribute('style', backgroundImage);
    }
  }
}
