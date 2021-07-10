import React from "react";
import * as DataObject from "../../DataTypes/ParagraphFourTileBlockQueue";

interface ParagraphDisplayMediaTilesFromAViewProps {
  data: DataObject.ParagraphFourTileBlockQueueInterface;
  view_mode: string;
}

const ParagraphDisplayMediaTilesFromAView: React.FunctionComponent = (
  props: ParagraphDisplayMediaTilesFromAViewProps
) => {
  console.debug("ParagraphMediaTilesFromAView", props);
  return (
    <div>
      <h1>ParagraphMediaTilesFromAView</h1>
    </div>
  );
};

export {
  ParagraphDisplayMediaTilesFromAView as default,
  ParagraphDisplayMediaTilesFromAViewProps,
};
