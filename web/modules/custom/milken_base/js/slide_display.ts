const slideDisplayTemplate = document.createElement("template");

slideDisplayTemplate.innerHTML = `
<style type="text/css">
.card{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-width:0;word-wrap:break-word;background-color:#fff;background-clip:border-box;border:1pxsolidrgba(0,0,0,0.125);border-radius:0.25rem;}.card>hr{margin-right:0;margin-left:0;}.card>.list-group:first-child.list-group-item:first-child{border-top-left-radius:0.25rem;border-top-right-radius:0.25rem;}.card>.list-group:last-child.list-group-item:last-child{border-bottom-right-radius:0.25rem;border-bottom-left-radius:0.25rem;}.card-body{-ms-flex:11auto;flex:11auto;min-height:1px;padding:1.25rem;}.card-title{margin-bottom:0.75rem;}.card-subtitle{margin-top:-0.375rem;margin-bottom:0;}.card-text:last-child{margin-bottom:0;}.card-link:hover{text-decoration:none;}.card-link+.card-link{margin-left:1.25rem;}.card-header{padding:0.75rem1.25rem;margin-bottom:0;background-color:rgba(0,0,0,0.03);border-bottom:1pxsolidrgba(0,0,0,0.125);}.card-header:first-child{border-radius:calc(0.25rem-1px)calc(0.25rem-1px)00;}.card-header+.list-group.list-group-item:first-child{border-top:0;}.card-footer{padding:0.75rem1.25rem;background-color:rgba(0,0,0,0.03);border-top:1pxsolidrgba(0,0,0,0.125);}.card-footer:last-child{border-radius:00calc(0.25rem-1px)calc(0.25rem-1px);}.card-header-tabs{margin-right:-0.625rem;margin-bottom:-0.75rem;margin-left:-0.625rem;border-bottom:0;}.card-header-pills{margin-right:-0.625rem;margin-left:-0.625rem;}.card-img-overlay{position:absolute;top:0;right:0;bottom:0;left:0;padding:1.25rem;}.card-img,.card-img-top,.card-img-bottom{-ms-flex-negative:0;flex-shrink:0;width:100%;}.card-img,.card-img-top{border-top-left-radius:calc(0.25rem-1px);border-top-right-radius:calc(0.25rem-1px);}.card-img,.card-img-bottom{border-bottom-right-radius:calc(0.25rem-1px);border-bottom-left-radius:calc(0.25rem-1px);}.card-deck.card{margin-bottom:15px;}@media(min-width:576px){.card-deck{display:-ms-flexbox;display:flex;-ms-flex-flow:rowwrap;flex-flow:rowwrap;margin-right:-15px;margin-left:-15px;}.card-deck.card{-ms-flex:100%;flex:100%;margin-right:15px;margin-bottom:0;margin-left:15px;}}.card-group>.card{margin-bottom:15px;}@media(min-width:576px){.card-group{display:-ms-flexbox;display:flex;-ms-flex-flow:rowwrap;flex-flow:rowwrap;}.card-group>.card{-ms-flex:100%;flex:100%;margin-bottom:0;}.card-group>.card+.card{margin-left:0;border-left:0;}.card-group>.card:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0;}.card-group>.card:not(:last-child).card-img-top,.card-group>.card:not(:last-child).card-header{border-top-right-radius:0;}.card-group>.card:not(:last-child).card-img-bottom,.card-group>.card:not(:last-child).card-footer{border-bottom-right-radius:0;}.card-group>.card:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0;}.card-group>.card:not(:first-child).card-img-top,.card-group>.card:not(:first-child).card-header{border-top-left-radius:0;}.card-group>.card:not(:first-child).card-img-bottom,.card-group>.card:not(:first-child).card-footer{border-bottom-left-radius:0;}}.card-columns.card{margin-bottom:0.75rem;}@media(min-width:576px){.card-columns{-webkit-column-count:3;-moz-column-count:3;column-count:3;-webkit-column-gap:1.25rem;-moz-column-gap:1.25rem;column-gap:1.25rem;orphans:1;widows:1;}.card-columns.card{display:inline-block;width:100%;}}
</style>
<div class="card">
    <div class="card-header">
      <slot name="background-image-thumbnail"></slot>
    </div>
    <div class="card-body">
      <div class="card-title"><slot name="title"></slot></div>
    </div>
  </div>
</div>
`;

customElements.define(
  "slide-display",
  class SlideDisplay extends HTMLElement {
    mountPoint: HTMLElement;

    constructor() {
      super();
      console.debug("SlideDisplay", this, this.attributes);
      const shadowRoot = this.attachShadow({ mode: "open" });
      this.mountPoint = document.createElement("div");
      shadowRoot.appendChild(this.mountPoint);
      const clone = slideDisplayTemplate.content.cloneNode(true);
      this.mountPoint.appendChild(clone);
    }

    connectedCallback() {
      console.debug("connected callback", this);
    }
  }
);
