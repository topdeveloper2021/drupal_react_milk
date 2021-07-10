import React from "react";
import PodcastEpisodeDisplay from "../PodcastEpisodeDisplay";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import ParagraphPodcastEpisode from "../../DataTypes/ParagraphPodcastEpisode";

export interface ParagraphDisplayPodcastEpisodeProps {
  data: ParagraphPodcastEpisode;
  view_mode: string;
  key?: number;
}

export const ParagraphDisplayPodcastEpisode = (
  props: ParagraphDisplayPodcastEpisodeProps
) => {
  const { data, view_mode, key } = props;
  return (
    <ErrorBoundary key={key}>
      <PodcastEpisodeDisplay
        data={data.field_episode_ref}
        view_mode={view_mode}
      />
    </ErrorBoundary>
  );
};
