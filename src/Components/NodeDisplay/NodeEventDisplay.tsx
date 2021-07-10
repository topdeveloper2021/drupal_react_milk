import React from "react";
import { NodeEventInterface } from "../../DataTypes/NodeEvent";

interface NodeEventDisplayProps {
  data: NodeEventInterface;
  view_mode: string;
}

const NodeEventDisplay: React.FunctionComponent = (
  props: NodeEventDisplayProps
) => {
  console.debug("Node Event Display", props);

  return (
    <div>
      <h1>Node Event</h1>
    </div>
  );
};

export default NodeEventDisplay;
