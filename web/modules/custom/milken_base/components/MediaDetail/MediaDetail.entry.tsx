import React from "react";
import ReactDOM from "react-dom";
import MediaDisplay from "Components/MediaDisplay";

const MediaDisplayContainer = document.querySelector("media-display");
const MediaDisplayData = Object.assign({}, MediaDisplayContainer.dataset);

console.debug("getting ready to render", MediaDisplayContainer);

ReactDOM.render(
  <MediaDisplay
    data={MediaDisplayData}
    view_mode={MediaDisplayContainer.dataset.viewMode}
  />,
  MediaDisplayContainer
);
