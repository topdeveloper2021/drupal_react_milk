import { ParagraphInterface } from "../../DataTypes/Paragraph";
import ParagraphDisplayAuthor from "./ParagraphDisplayAuthor";
import ParagraphDisplayBlock from "./ParagraphDisplayBlock";
import ParagraphDisplayBodyContent from "./ParagraphDisplayBodyContent";
import ParagraphDisplayEventDisplay from "./ParagraphDisplayEventDisplay";
import ParagraphDisplayFacetExplorer from "./ParagraphDisplayFacetExplorer";
import ParagraphDisplayLinkBar from "./ParagraphDisplayLinkBar";
import ParagraphDisplayOurCenters from "./ParagraphDisplayOurCenters";
import ParagraphDisplayPeople from "./ParagraphDisplayPeople";
import ParagraphDisplayPodcastBrowser from "./ParagraphDisplayPodcastBrowser";
import { ParagraphDisplayPodcastEpisode } from "./ParagraphDisplayPodcastEpisode";
import ParagraphDisplayProgramDay from "./ParagraphDisplayProgramDay";
import ParagraphDisplayPullQuote from "./ParagraphDisplayPullQuote";
import ParagraphDisplaySlide from "./ParagraphDisplaySlide";
import ParagraphDisplayStats from "./ParagraphDisplayStats"
import ParagraphTabsDisplay from "../ParagraphTabsDisplay";
import ParagraphDisplayTiles from "./ParagraphDisplayTiles";
import ParagraphDisplayTilesSocial from "./ParagraphDisplayTilesSocial";

/**
 * Create the View Component
 *
 * @param incoming: ParagraphIterface
 */
export const ParagraphComponentFactory = (incoming: ParagraphInterface) => {
  console.debug("Paragraph Component Factory", incoming);
  switch (incoming.type) {
    case "paragraph--author":
      return ParagraphDisplayAuthor;
    case "paragraph--block":
      return ParagraphDisplayBlock;
    case "paragraph--body_content":
      return ParagraphDisplayBodyContent;
    case "paragraph--event_display":
      return ParagraphDisplayEventDisplay;
    case "paragraph--facet_explorer":
      return ParagraphDisplayFacetExplorer;
    case "paragraph--link_bar":
      return ParagraphDisplayLinkBar;
    case "paragraph--our_centers":
      return ParagraphDisplayOurCenters;
    case "paragraph--people":
      return ParagraphDisplayPeople;
    case "paragraph--podcast_browser":
      return ParagraphDisplayPodcastBrowser;
    case "paragraph--podcast_episode":
      return ParagraphDisplayPodcastEpisode;
    case "paragraph--program_day":
      return ParagraphDisplayProgramDay;
    case "paragraph--pull_quote":
      return ParagraphDisplayPullQuote;
    case "paragraph--slide":
      return ParagraphDisplaySlide;
    case "paragraph--stats":
      return ParagraphDisplayStats;
    case "paragraph--paragraph_tab":
      return ParagraphTabsDisplay;
    case "paragraph--content_tiles":
    case "paragraph--event_tiles":
    case "paragraph--items_from_an_entityqueue":
    case "paragraph--media_tiles":
    case "paragraph--slide_tiles":
    case "paragraph--tiles_sponsors":
      return ParagraphDisplayTiles;
    case "paragraph--tiles_social":
      return ParagraphDisplayTilesSocial;

    default:
      console.error(`missing config for ${incoming.type}`);
      throw new Error(`Missing config for ${incoming.type}`);
  }
};

export default ParagraphComponentFactory;
