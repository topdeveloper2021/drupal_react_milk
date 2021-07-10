import React from "react";
import { MediaVideoInterface } from "../../DataTypes/MediaVideo";

export interface VideoTileDisplayProps {
  data: MediaVideoInterface;
}

export const VideoTileDisplay = (props: VideoTileDisplayProps) => {
  const { data } = props;
  console.debug("Video Tile Display", data);
  return (
    <div>
      <h1>Video Tile display</h1>
    </div>
  );
};

export default VideoTileDisplay;
