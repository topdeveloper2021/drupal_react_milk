import React from "react";
import { MediaPodcastEpisodeInterface } from "../../DataTypes/MediaPodcastEpisode";
import PodcastEpisodeDisplay from "../PodcastEpisodeDisplay";
import ErrorBoundary from "../../Utility/ErrorBoundary";

interface MediaDisplayPodcastEpisodeProps {
  data: MediaPodcastEpisodeInterface;
  view_mode: string;
}

const MediaDisplayPodcastEpisode: React.FunctionComponent = (
  props: MediaDisplayPodcastEpisodeProps
) => {
  return (
    <ErrorBoundary>
      <PodcastEpisodeDisplay {...props} />
    </ErrorBoundary>
  );
};

export default MediaDisplayPodcastEpisode;
