import Paragraph, { ParagraphInterface } from "./Paragraph";
import MediaPodcastEpisode, {
  MediaPodcastEpisodeInterface,
} from "./MediaPodcastEpisode";

export interface ParagraphPodcastEpisodeInterface extends ParagraphInterface {
  field_episode_ref: MediaPodcastEpisodeInterface;
}

export class ParagraphPodcastEpisode extends Paragraph {
  private _field_episode_ref: MediaPodcastEpisode;
  get field_episode_ref(): MediaPodcastEpisodeInterface {
    return this._field_episode_ref;
  }

  set field_episode_ref(value: MediaPodcastEpisodeInterface) {
    this._field_episode_ref = new MediaPodcastEpisode(value);
  }
  getIncluded(): string {
    return "&include=field_episode_ref";
  }
  hasData(): boolean {
    return this.status !== undefined;
  }
}

export default ParagraphPodcastEpisode;
