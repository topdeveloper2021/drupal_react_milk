import React from "react";
import ReactDOM from "react-dom";
import EntityBrowser from "Components/EntityBrowser";

const EntityBrowserContainer = document.querySelector("entity-browser");

const EntityBrowserSource = {
  id: EntityBrowserContainer.dataset.id,
  type: EntityBrowserContainer.dataset.type,
  url: EntityBrowserContainer.dataset.url,
};

ReactDOM.render(
  <EntityBrowser
    source={EntityBrowserSource}
    view_mode={EntityBrowserContainer.dataset.viewMode}
  />,
  EntityBrowserContainer
);
