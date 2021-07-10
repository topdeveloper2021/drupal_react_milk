import styled from "styled-components";
import moment from "moment";
import ImageFileDisplay from "Components/FileDisplay/ImageFileDisplay";
import { Card } from "react-bootstrap";
import React from "react";
import MediaSponsorLogo from "DataTypes/MediaSponsorLogo";
import ErrorBoundary from "../../../Utility/ErrorBoundary";
import ErrorDisplay from "../../../Utility/ErrorDisplay";

export interface MediaSponsorTileDisplayProps {
  data: MediaSponsorLogo;
  key?: number;
  display_size?: string;
}

const SponsorTileWrapper = styled.div`
  transition: box-shadow ease-in 250ms;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);

  &:hover {
    // box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &.sponsor-image-medium img.card-img {
    max-width: 500px !important;
  }

  &.sponsor-image-medium img.card-img {
    max-width: 420px !important;
  }
`;

export const MediaSponsorTileDisplay = (
  props: MediaSponsorTileDisplayProps
) => {
  const { data, key, display_size } = props;
  console.log(data);
  if (!data.valid) {
    return <ErrorDisplay error={new Error("DataObject is not valid")} />;
  }

  let tileClass = "col-sm-6 col-md-3 sponsor-image-small";

  switch (display_size) {
    case "large": {
      tileClass = `col-md-6 sponsor-image-large`;
      break;
    }
    case "medium": {
      tileClass = `col-sm-8 col-md-5 sponsor-image-medium`;
    }
  }

  return (
    <SponsorTileWrapper className={`${tileClass}`} key={key}>
      <ErrorBoundary>
        <ImageFileDisplay
          data={data.field_media_image}
          view_mode="fullscreen"
          className={"card-img p-3"}
          style={{ maxWidth: "100%", objectFit: "contain", }}
          srcsetSizes="(max-width: 1000px) 200px, 400px"
        />
      </ErrorBoundary>
    </SponsorTileWrapper>
  );
};

export default MediaSponsorTileDisplay;
