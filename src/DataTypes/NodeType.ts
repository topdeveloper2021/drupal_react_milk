interface NodeTypeInterface {
  type: string;
  id: string;
}

class NodeType implements NodeTypeInterface {
  type: string;

  id: string;

  constructor(incoming: NodeTypeInterface) {
    Object.assign(this, incoming);
  }
}

export { NodeType as default, NodeTypeInterface };
