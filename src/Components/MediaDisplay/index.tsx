import React, { useState } from "react";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import { MediaInterface } from "../../DataTypes/Media";
import MediaComponentFactory from "./MediaComponentFactory";
import MediaDataFactory from "./MediaDataFactory";

/**
 * Create the Controller
 *
 * @param props: MediaDisplayProps
 */

export interface MediaDisplayProps {
  key?: number;
  data: MediaInterface;
  view_mode: string;
  display_size?: string;
}

export const MediaDisplay: React.FunctionComponent = (
  props: MediaDisplayProps
) => {
  const { key, data, view_mode, display_size } = props;
  const DataObject = MediaDataFactory(data);
  const [mediaData, setMediaData] = useState(DataObject);
  console.debug("MediaDisplay", props, mediaData);
  if (!mediaData.hasData()) {
    const ecp = new EntityComponentProps(mediaData);
    ecp
      .getData(mediaData.getIncluded())
      .then((res) => res.json())
      .then((remoteData) => {
        console.debug("Media Remote Data", remoteData);
        const newDataObject = MediaDataFactory(remoteData.data);
        setMediaData(newDataObject);
      });
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const Component = MediaComponentFactory(mediaData);
  console.debug("get MediaDisplayComponent", Component);
  return <Component key={key} data={mediaData} view_mode={view_mode} display_size={display_size} />;
};

export default MediaDisplay;
