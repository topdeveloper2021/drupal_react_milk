import styled from "styled-components";
import moment from "moment";
import ImageFileDisplay from "Components/FileDisplay/ImageFileDisplay";
import { Card } from "react-bootstrap";
import React from "react";
import MediaSponsorLogo from "DataTypes/MediaSponsorLogo";
import ErrorBoundary from "../../../Utility/ErrorBoundary";
import ErrorDisplay from "../../../Utility/ErrorDisplay";

export interface MediaSponsorCardDisplayProps {
  data: MediaSponsorLogo;
  key?: number;
}

const CardWrapper = styled.div`
  min-width: 222px;

  &:hover {
    box-shadow: 0 8px 16px 0 grey;
  }

  & a {
    max-width: 319px;
    color: #35363C;
    text-decoration: none;

    & .h5 {
      font-weight: bold;
    }
  }

`;

const CustomCardHeader = styled.div`
  position: relative;
`;

const DateWrapper = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.53);
  color: white;
  text-align: right;
  padding-right: 0.5em;
  position: absolute;
  bottom: 0;
`;

export const MediaSponsorCardDisplay = (props: MediaSponsorCardDisplayProps) => {
  const { data, key } = props;
  if (!data.valid) {
    return <ErrorDisplay error={new Error("DataObject is not valid")} />;
  }
  const created = moment(data.changed, "ddd MMM DD YYYY Z");

  console.debug("Thumbnail: ", data.getThumbnail());
  return (
    <CardWrapper
      className="card my-4 mx-2 text-align-left flex-shrink-1"
      key={key}
    >
      <ErrorBoundary>
        <a
          href={
            data.path.alias
              ? data.path.alias
              : "/media/" + data.drupal_internal__mid
          }
          data-drupal-id={data.drupal_internal__mid}
          data-drupal-type={data.type}
          data-uuid={data.id}
        >
          <CustomCardHeader>
            <ImageFileDisplay
              data={data.field_cover}
              view_mode="thumbnail"
              className={"card-img"}
              style={{ maxWidth: "100%" }}
              srcsetSizes="(max-width: 1000px) 200px, 400px"
            />
            <DateWrapper>{created.format("MMMM D, YYYY")}</DateWrapper>
          </CustomCardHeader>
          <Card.Body style={{ minHeight: "5em", paddingBottom: "0" }}>
            <Card.Title style={{ fontSize: "1em", marginBottom: "0" }}>
              {data.name}
            </Card.Title>
          </Card.Body>
          <Card.Footer className="bg-white border-0">
            Authors and Tags
          </Card.Footer>
        </a>
      </ErrorBoundary>
    </CardWrapper>
  );
};

export default MediaSponsorCardDisplay;
