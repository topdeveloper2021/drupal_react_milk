import React, { useState } from "react";
import MediaImage from "../../DataTypes/MediaImage";
import Loading from "../Loading";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Holder from "react-holder";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import ErrorBoundary from "../../Utility/ErrorBoundary";

export interface MediaDisplayImageProps {
  data: MediaImage;
  view_mode: string;
}

export const MediaDisplayImage = (props: MediaDisplayImageProps) => {
  const { data, view_mode } = props;
  console.debug("MediaDisplayImage", props);
  const DataObject = new MediaImage(data);
  const [mediaImage, setMediaImage] = useState(DataObject);

  if (!mediaImage.valid) {
    return <div data-error={"DATA INVALID"} />;
  }

  if (!mediaImage.hasData()) {
    const ecp = new EntityComponentProps(mediaImage);
    ecp
      .getData(mediaImage.getIncluded())
      .then((res) => res.json())
      .then((incoming) => {
        const DataObject = new MediaImage(incoming.data);
        setMediaImage(DataObject);
      });
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <ImageFileDisplay data={mediaImage.getSource()} view_mode={view_mode} />
    </ErrorBoundary>
  );
};

export default MediaDisplayImage;
