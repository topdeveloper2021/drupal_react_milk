import React from "react";

export const LanguageReferenceWidget = (props) => {
  console.log("LanguageReferenceWidget", props);
  return (
    <div>
      <h4>Language: </h4>
    </div>
  );
};

export const PathWidget = (props) => {
  console.log("PathWidget", props);
  return (
    <div>
      <h4>PathWidget: </h4>
    </div>
  );
};

export const ParagraphReferenceWidget = (props) => {
  console.log("ParagraphReferenceWidget", props);
  return (
    <div>
      <h4>ParagraphReferenceWidget: </h4>
    </div>
  );
};

export const ImageReferenceWidget = (props) => {
  console.log("ImageReferenceWidget", props);
  return (
    <div>
      <h4>ImageReferenceWidget: </h4>
    </div>
  );
};

export const MediaReferenceWidget = (props) => {
  console.log("MediaReferenceWidget", props);
  return (
    <div>
      <h4>MediaReferenceWidget: </h4>
    </div>
  );
};

export const Widgets = {
  LanguageReferenceWidget: LanguageReferenceWidget,
  PathWidget: PathWidget,
  ParagraphReferenceWidget: ParagraphReferenceWidget,
  ImageReferenceWidget: ImageReferenceWidget,
  MediaReferenceWidget: MediaReferenceWidget,
};

export default Widgets;
