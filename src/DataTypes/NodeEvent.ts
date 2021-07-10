import Node, { NodeInterface } from "./Node";

type NodeEventInterface = NodeInterface;

class NodeEvent extends Node implements NodeEventInterface {

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  hasData(): boolean {
    return false;
  }

  getIncluded() {
    return "";
  }
}

export { NodeEvent as default, NodeEventInterface };
