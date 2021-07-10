import React, { useState } from "react";
import { SlideInterface } from "../../DataTypes/Slide";
import EntityComponentProps from "../../DataTypes/EntityComponentProps";
import SlideDataFactory from "./SlideDataFactory";
import Loading from "../Loading";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";

export interface SlideDisplayImageOnlyProps {
  data: SlideInterface;
  key?: number;
  className?: string;
  style?: Record<string, string>;
  srcsetSizes?: string;
  view_mode?: string;
}

export const SlideDisplayImageOnly = (props: SlideDisplayImageOnlyProps) => {
  const { data, key, className, style, srcsetSizes, view_mode } = props;
  const DataObject = SlideDataFactory(data);
  const [slideData, setSlideData] = useState(DataObject);
  if (!slideData.hasData()) {
    const ecp = new EntityComponentProps(slideData);
    ecp
      .getData(slideData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const newDO = SlideDataFactory(ajaxData.data);
        setSlideData(newDO);
      });
    return <Loading />;
  }
  return (
    <ImageFileDisplay
      data={slideData.field_background_image}
      key={key}
      view_mode={view_mode}
      className={className}
      style={style}
      srcsetSizes={srcsetSizes}
    />
  );
};

SlideDisplayImageOnly.defaultProps = {
  view_mode: "thumbnail",
  className: "card-img",
  style: { maxWidth: "100%" },
  srcsetSizes: "(max-width: 1000px) 200px, 400px",
};

export default SlideDisplayImageOnly;
