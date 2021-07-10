import { MediaInterface } from "../../DataTypes/Media";
import MediaDisplayImage from "./MediaDisplayImage";
import MediaDisplayReport from "./Report";
import MediaDisplayPodcastEpisode from "./MediaDisplayPodcastEpisode";
import MediaDisplaySponsor from "./Sponsor";
import { VideoDisplay } from "../VideoDisplay";

/**
 * Create the View Component
 *
 * @param incoming: MediaInterface
 */
export function MediaComponentFactory(incoming: MediaInterface) {
  console.debug("MediaComponentFactory", incoming);
  switch (incoming.type) {
    case "media--image":
      return MediaDisplayImage;
    case "media--podcast_episode":
      return MediaDisplayPodcastEpisode;
    case "media--report":
      return MediaDisplayReport;
    case "media--sponsor_logo":
      return MediaDisplaySponsor;
    case "media--video":
      return VideoDisplay;
    default:
      console.error("cannot find component", incoming);
      throw new Error(
        "Cannot find component for props.type ".concat(incoming.type)
      );
  }
}

export default MediaComponentFactory;
