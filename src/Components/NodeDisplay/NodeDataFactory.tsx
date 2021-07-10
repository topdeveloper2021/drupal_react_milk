import { NodeInterface } from "../../DataTypes/Node";
import NodeLandingPage from "../../DataTypes/NodeLandingPage";
import NodeOpportunity from "../../DataTypes/NodeOpportunity";
import NodeEvent from "../../DataTypes/NodeEvent";
import NodeArticle from "../../DataTypes/NodeArticle";
import NodeSession from "../../DataTypes/NodeSession";

/**
 * Create Data Model
 *
 * @param incoming: NodeInterface
 */
export const NodeDataFactory = (incoming: NodeInterface) => {
  console.debug("NodeDataFactory", incoming);
  switch (incoming.type) {
    case "node--landing_page":
      return new NodeLandingPage(incoming);
    case "node--opportunity":
      return new NodeOpportunity(incoming);
    case "node--event":
      return new NodeEvent(incoming);
    case "node--article":
      return new NodeArticle(incoming);
    case "node--session":
      return new NodeSession(incoming);
    default:
      console.error("Cannot determine Data Class", incoming);
      throw new Error("Cannot Determine Data Class for ".concat(incoming.type));
  }
};

export default NodeDataFactory;
