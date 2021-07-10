import React from "react";
import ReactDOM from "react-dom";
import ArticleDisplay from "Components/ArticleDisplay";

const ArticleDisplayContainer = document.querySelector("article-detail");
const ArticleDisplayData = Object.assign({}, ArticleDisplayContainer.dataset);

console.debug("getting ready to render", ArticleDisplayContainer);

ReactDOM.render(
  <ArticleDisplay
    data={ArticleDisplayData}
    view_mode={ArticleDisplayContainer.dataset.viewMode}
  />,
  ArticleDisplayContainer
);
