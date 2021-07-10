import React from "react";
import ReactDOM from "react-dom";
import MenuDisplay from "Components/MenuDisplay";

// import * as MainNavigationCss from "./main-navigation.scss";

// const menuColumnTemplate = document.createElement("template");
// menuColumnTemplate.innerHTML = `
//   <style></style>
//   <div>
//     <slot name="column-title"></slot>
//     <slot name="column-content"></slot>
//   </div>
// `;
// 
// customElements.define(
//   "menu-column",
//   class MenuColumn extends HTMLElement {
//     constructor() {
//       super();
//       const shadowroot = this.attachShadow({ mode: "open" });
//       const clone = menuColumnTemplate.content.cloneNode(true);
//       shadowroot.appendChild(clone);
//       const style = document.createElement("style");
//       style.innerText = MainNavigationCss.default.toString();
//       document.querySelector("head").appendChild(style);
//     }
//   }
// );

customElements.define(
  "milken-menu-main",
  class MilkenMenuMain extends HTMLElement {
    constructor() {
      super();
      this.classList.remove("active");
      document
        .querySelector("#menu-reveal")
        .addEventListener("click", this.toggle.bind(this));
    }

    toggle() {
      console.log("toggle", this);
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        document.querySelector("#menu-reveal").classList.remove("is-active");
        document.querySelector("body").classList.remove("navbar-active");
      } else {
        this.classList.add("active");
        document.querySelector("#menu-reveal").classList.add("is-active");
        document.querySelector("body").classList.add("navbar-active");
      }
    }
  }
);


// ReactDOM.render(
//   <MenuDisplay data={false} />,
//   document.querySelector("milken-menu-main")
// );
