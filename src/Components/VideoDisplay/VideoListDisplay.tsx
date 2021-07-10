import moment from "moment";
import React from "react";
import { EventInterface } from "../../DataTypes/Event";
import MediaVideo from "../../DataTypes/MediaVideo";

interface VideoListDisplayProps {
  data: EventInterface;
  key?: number;
}

export const VideoListDisplay = (props: VideoListDisplayProps) => {
  const { data, key } = props;
  const videoData = data instanceof MediaVideo ? data : new MediaVideo(data);
  const videoDate = moment(videoData.changed, moment.ISO_8601);
  return (
    <div
      style={{ display: "table-row", width: "100%" }}
      className="lg-col-12"
      key={key}
    >
      <span style={{ display: "table-cell" }}>{videoData.name}</span>
      <span style={{ display: "table-cell" }}>
        {videoDate.format("MMMM D, YYYY")}
      </span>
    </div>
  );
};

VideoListDisplay.defaultProps = {
  key: 0,
};

export default VideoListDisplay;
