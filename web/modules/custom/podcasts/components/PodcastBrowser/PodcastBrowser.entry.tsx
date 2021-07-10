import * as React from "react";
import * as ReactDOM from "react-dom";
import PodcastBrowser from "Components/PodcastBrowser";

const PodcastBrowserContainer = document.querySelector("podcast-browser");

const PodcastBrowserSource = {
  id: PodcastBrowserContainer.dataset.id,
  type: PodcastBrowserContainer.dataset.type,
  view_mode: PodcastBrowserContainer.dataset.viewMode,
  url: PodcastBrowserContainer.dataset.url,
};

ReactDOM.render(
  <PodcastBrowser source={PodcastBrowserSource} />,
  PodcastBrowserContainer
);
