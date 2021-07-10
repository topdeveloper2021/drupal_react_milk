import styled from "styled-components";
import moment from "moment";
import ImageFileDisplay from "Components/FileDisplay/ImageFileDisplay";
import { Card } from "react-bootstrap";
import React from "react";
import MediaReport from "DataTypes/MediaReport";
import ErrorBoundary from "../../../Utility/ErrorBoundary";
import ErrorDisplay from "../../../Utility/ErrorDisplay";

export interface MediaReportCardDisplayProps {
  data: MediaReport;
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

  & .authors {
    color: #999AA3;
    margin: 0;
    font-size: 0.95em;
    text-overflow: ellipsis;
    white-space: nowrap; 
    overflow: hidden;
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

export const MediaReportCardDisplay = (props: MediaReportCardDisplayProps) => {
  const { data, key } = props;
  if (!data.valid) {
    return <ErrorDisplay error={new Error("DataObject is not valid")} />;
  }

  const published_synthetic = data.published_at !== null ? moment(data.published_at) : moment(data.created, "ddd MMM DD YYYY Z");

  let authors = '';
  if (data.field_authors.length !== undefined && data.field_authors.length > 0) {
    data.field_authors.map((item) => {
      authors += item.field_first_name === null ? '' : item.field_first_name
      authors += item.field_middle_name === null ? '' : (' ' + item.field_middle_name)
      authors += item.field_last_name === null ? '' : (' ' + item.field_last_name)
      authors += ', ';
    });
    authors = authors.trim().slice(0, -1);
  }

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
            <DateWrapper>{published_synthetic.format("MMMM D, YYYY")}</DateWrapper>
          </CustomCardHeader>
          <Card.Body style={{ minHeight: "5em", paddingBottom: "0" }}>
            <Card.Title style={{ fontSize: "1em", marginBottom: "0" }}>
              {data.name}
            </Card.Title>
          </Card.Body>
          <Card.Footer className="bg-white border-0">
            <p className="authors">{authors}</p>
          </Card.Footer>
        </a>
      </ErrorBoundary>
    </CardWrapper>
  );
};

export default MediaReportCardDisplay;
