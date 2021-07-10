import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import MediaPodcastEpisode, {
  MediaPodcastEpisodeInterface,
} from "../../DataTypes/MediaPodcastEpisode";
import PodcastEpisodeFull from "./PodcastEpisodeFull";
import PodcastEpisodeCard from "./PodcastEpisodeCard";
import PodcastEpisodePanel from "./PodcastEpisodePanel";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import ErrorBoundary from "../../Utility/ErrorBoundary";

export interface PodcastEpisodeProps extends MediaPodcastEpisodeInterface {
  data: MediaPodcastEpisodeInterface;
  key?: number;
  open?: boolean;
  onSelectHandler?: any;
  view_mode?: string;
}

export const PodcastEpisodeDisplay = (props: PodcastEpisodeProps) => {
  console.debug("Podcast Episode Display: Props ", props);
  const { data, key, onSelectHandler, view_mode } = props;
  const DataObject = new MediaPodcastEpisode(data);
  const [episodeData, setEpisodeData] = useState(DataObject);
  const [fetchRan, setFetchRan] = useState(false);
  console.debug("PodcastEpisodeDisplay State: EpisodeData: ", episodeData);
  
  if (!episodeData.hasData() && !fetchRan) {
    setFetchRan(true);
    const ecp = new EntityComponentProps(episodeData);
    ecp
      .getData(DataObject.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        setEpisodeData(new MediaPodcastEpisode(ajaxData.data));
      });
  }

  switch(view_mode){
    case 'panel':
      
      return (
        <ErrorBoundary>
          <PodcastEpisodePanel data={episodeData} open={open} />
        </ErrorBoundary>
      );

    case 'full':

      return (
        <ErrorBoundary>
          <PodcastEpisodeFull data={episodeData} open={open} />
        </ErrorBoundary>
      );

    case 'card':

      return (
        <ErrorBoundary>
          <PodcastEpisodeCard data={episodeData} open={open} />
        </ErrorBoundary>
      );
  }
};

export default PodcastEpisodeDisplay;
