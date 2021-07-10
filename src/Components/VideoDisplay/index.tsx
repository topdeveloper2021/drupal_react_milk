import React, { useState } from "react";
import styled from "styled-components";
import MediaVideo from "../../DataTypes/MediaVideo";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import VideoFullDisplay from "./VideoFullDisplay";
import VideoCardDisplay from "./VideoCardDisplay";
import VideoTileDisplay from "./VideoTileDisplay";
import VideoListDisplay from "./VideoListDisplay";

export const VideoDisplay = (props) => {
  const { data, view_mode, column } = props;
  const ColumnDiv =
    column ??
    styled.div`
      max-width: 18rem;
    `;
  const [videoData, setVideoData] = useState(new MediaVideo(data));
  if (!videoData.hasData()) {
    const ecp = new EntityComponentProps(videoData);
    ecp
      .getData(videoData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        setVideoData(new MediaVideo(ajaxData.data));
      });
  }

  switch (view_mode) {
    case "full":
      return <VideoFullDisplay data={data} />;
    case "tile":
    case "card":
      // For this entity, they are the same.
      return <VideoCardDisplay data={data} />;
    case "list":
      return <VideoListDisplay data={data} />;
    default:
      throw new Error(
        "Cannot find component for view mode: ".concat(view_mode)
      );
  }
};
