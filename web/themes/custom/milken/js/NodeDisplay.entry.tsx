import * as React from "react";
import * as ReactDOM from "react-dom";
import NodeDisplay from "Components/NodeDisplay";

const NodeDetail = document.querySelector("node-detail");

const NodeDetailData = {
  id: NodeDetail.dataset.id,
  type: NodeDetail.dataset.type,
};

ReactDOM.render(
  <NodeDisplay
    data={NodeDetailData}
    view_mode={NodeDetail.dataset.viewMode}
    can_edit={NodeDetail.dataset.canEdit}
  />,
  NodeDetail
);
