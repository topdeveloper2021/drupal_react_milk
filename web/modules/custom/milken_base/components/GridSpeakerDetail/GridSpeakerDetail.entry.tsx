import React from "react";
import ReactDOM from "react-dom";
import GridSpeakerDisplay from "Components/GridSpeakerDisplay";

const GridSpeakerDisplayContainer = document.querySelector("grid-speaker-display");

console.debug("getting ready to render", GridSpeakerDisplayContainer);

const gridSpeakerEntity = JSON.parse(GridSpeakerDisplayContainer.getAttribute('data-grid-speaker-entity'));
const view_mode = GridSpeakerDisplayContainer.getAttribute('data-view-mode');

ReactDOM.render(
  <GridSpeakerDisplay
    data={gridSpeakerEntity.data}
    view_mode={view_mode}
  />,
  GridSpeakerDisplayContainer
);
