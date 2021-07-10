
import * as React from "react";
import * as ReactDOM from "react-dom";
import PhilanthropyHub from "Components/PhilanthropyHub";

const PhilanthropyHubContainer = document.querySelector('philanthropy-hub');

const PhilanthropyHubSource = {
  id: PhilanthropyHubContainer.dataset.id,
  type: PhilanthropyHubContainer.dataset.type,
  view_mode: PhilanthropyHubContainer.dataset.viewMode,
  url: PhilanthropyHubContainer.dataset.url
}

console.debug("getting ready to render", PhilanthropyHubSource);

ReactDOM.render(
  <PhilanthropyHub source={PhilanthropyHubSource} />,
  PhilanthropyHubContainer
);


