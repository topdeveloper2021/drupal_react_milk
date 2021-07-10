import React from "react";
import ReactDOM from "react-dom";
import PeopleDisplay from "Components/PeopleDisplay";

const PeopleDisplayContainer = document.querySelector("people-display");
const PeopleDisplayData = Object.assign({}, PeopleDisplayContainer.dataset);

console.debug("getting ready to render", PeopleDisplayContainer);

ReactDOM.render(
  <PeopleDisplay
    data={PeopleDisplayData}
    view_mode={PeopleDisplayContainer.dataset.viewMode}
  />,
  PeopleDisplayContainer
);
