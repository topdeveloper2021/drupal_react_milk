import React, { useState } from "react";
import Loading from "../Loading";
import { ImageFile, ImageFileInterface } from "../../DataTypes/ImageFile";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Holder from "react-holder";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import ErrorDisplay from "../../Utility/ErrorDisplay";

export interface ImageFileDisplayProps {
  data: ImageFileInterface;
  view_mode: string;
  key?: number;
  style?: Record<string, unknown>;
  width?: string;
  height?: string;
  className?: string;
  srcsetSizes?: string;
}

export const ImageFileDisplay = (props: ImageFileDisplayProps) => {
  console.debug("ImageFileDisplay", props);
  const { data, view_mode, style, width, height, className, srcsetSizes } = props;
  const DataObject = new ImageFile(data);
  const [imageData, setImageData] = useState(DataObject);
  if (!DataObject.valid) {
    return (
      <img
      src="/sites/default/files/Missing%20Photo_0.jpg"
      alt="Missing image"
      style={ style ?? { width: "100%", height: "100%" } }
      className={className}
    />
    )
    // return <ErrorDisplay error={new Error("DataObject is not valid")} />;
  }
  if (!imageData?.hasData()) {
    const ecp = new EntityComponentProps(imageData);
    ecp
      .getData(imageData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        console.debug("MilkenImage: Data back from JSON", ajaxData);
        const newDO = new ImageFile(ajaxData.data);
        setImageData(newDO);
      });
    return (
      <>
        <Loading />
      </>
    );
  }

  console.debug("Image should have data now:", imageData);

  const attributes = {
    width: width ?? "100%",
    height: height ?? "200px,",
    style: {},
  };

  const imageTagStyle = style ?? {
    width: "100%",
    height: "100%",
  };

  if (style) {
    attributes.style = style;
  }
  const styleObject = imageData.imageStyleObject;
  
  let imageElement = (
    (view_mode === 'medium-raw')
    ? (
    <img
      src={imageData.image_style_uri.medium}
      alt={imageData.filename}
      style={imageTagStyle}
      className={className}
    />
    )
    : (view_mode === 'thumbnail-raw')
    ? (
    <img
      src={imageData.image_style_uri.thumbnail}
      alt={imageData.filename}
      style={imageTagStyle}
      className={className}
    />
    )
    :(
      <img
        data-drupal-id={imageData.id}
        data-drupal-type={imageData.type}
        data-uuid={imageData.id}
        {...styleObject.imageAttributes}
        sizes={srcsetSizes || ""}
        style={imageTagStyle}
        className={className}
        alt={imageData.filename}
      />
    )
  );

  return (
    <>
      <ErrorBoundary>
        {imageElement}
      </ErrorBoundary>
    </>
  );
};

ImageFileDisplay.defaultProps = {
  data: {
    valid: false,
  },
  view_mode: "card",
};

export default ImageFileDisplay;
