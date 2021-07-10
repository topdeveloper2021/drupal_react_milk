import { MediaInterface } from "../../DataTypes/Media";
import MediaImage from "../../DataTypes/MediaImage";
import MediaPodcastEpisode from "../../DataTypes/MediaPodcastEpisode";
import MediaReport from "../../DataTypes/MediaReport";
import MediaSponsorLogo from "../../DataTypes/MediaSponsorLogo";
import MediaVideo from "../../DataTypes/MediaVideo";

/**
 * Create the Data Model
 *
 * @param incoming: MediaInterface
 */
export function MediaDataFactory(incoming: MediaInterface): MediaInterface {
  console.debug("MediaDataFactory", incoming);
  switch (incoming.type) {
    case "media--image":
      return new MediaImage(incoming);
    case "media--podcast_episode":
      return new MediaPodcastEpisode(incoming);
    case "media--report":
      return new MediaReport(incoming);
    case "media--sponsor_logo":
      return new MediaSponsorLogo(incoming);
    case "media--video":
      return new MediaVideo(incoming);
    default:
      console.error("Cannot determine Data Class", incoming);
      throw new Error("Cannot Determine Data Class for ".concat(incoming.type));
  }
}

export default MediaDataFactory;
