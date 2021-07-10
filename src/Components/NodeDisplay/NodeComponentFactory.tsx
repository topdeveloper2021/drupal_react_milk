import { NodeArticleDisplay } from "./NodeArticleDisplay";
import { NodeLandingPageDisplay } from "./LandingPage";
import { NodeOpportunityCardDisplay } from "./NodeOpportunityCardDisplay";
import { NodeDisplaySession } from "./NodeDisplaySession";

/**
 * Create View Component
 *
 * @param incoming: NodeInterface
 */
export const NodeComponentFactory = (incoming) => {
  console.debug("NodeComponentFactory", incoming);
  switch (incoming.type) {
    case "node--article":
      return NodeArticleDisplay;
    case "node--landing_page":
      return NodeLandingPageDisplay;
    case "node--opportunity":
      return NodeOpportunityCardDisplay;
    case "node--session":
      return NodeDisplaySession;
    default:
      console.error("Cannot determine Component", incoming);
      throw new Error("Cannot Determine Component for ".concat(incoming.type));
  }
};

export default NodeComponentFactory;
