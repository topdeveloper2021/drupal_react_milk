import React from "react";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import ArticleDisplay from "../ArticleDisplay";
import * as DataObject from "../../DataTypes/NodeArticle";

export interface NodeArticleDisplayProps {
  data: DataObject.NodeArticleInterface;
  view_mode: string;
}

export const NodeArticleDisplay = (props: NodeArticleDisplayProps) => {
  return (
    <ErrorBoundary>
      <ArticleDisplay data={props.data} view_mode={props.view_mode} />
    </ErrorBoundary>
  );
};

export default NodeArticleDisplay;
