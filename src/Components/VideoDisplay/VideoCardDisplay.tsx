import moment from "moment";
import { Container } from "react-bootstrap";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import { Card } from "react-bootstrap";
import React from "react";
import { MediaVideoInterface } from "../../DataTypes/MediaVideo";
import styled from "styled-components";

export interface VideoCardDisplayProps {
  data: MediaVideoInterface;
}

export const VideoCardDisplay = (props: VideoCardDisplayProps) => {
  const { data } = props;

  const published_synthetic = data.published_at !== null ? moment(data.published_at) : moment(data.created, "ddd MMM DD YYYY Z");

  const CardWrapper = styled.div`
    border-radius: 0;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    transition: box-shadow 250ms;

    &:hover {
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
    }

    & a {
      color: #35363c;
      text-decoration: none;

      & .h5 {
        font-weight: bold;
      }
    }

    & .tags {
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

  let tags = '';
  if (data.field_events.length !== undefined && data.field_events.length > 0) {
    data.field_events.map((item) => {
      tags += item.name === null ? '' : item.name 
      tags += ', ';
    });
    tags = tags.trim().slice(0, -1);
  }

  return (
    <div className="col-sm-6 col-lg-3">
      <CardWrapper className="card text-align-left mx-1 mt-1 mb-4">
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
            <ErrorBoundary>
              <ImageFileDisplay
                data={data.getThumbnail()}
                view_mode="thumbnail"
                style={{ maxWidth: "100%" }}
              />
              <DateWrapper>{published_synthetic.format('MMMM D, YYYY')}</DateWrapper>
            </ErrorBoundary>
          </CustomCardHeader>
          <Card.Body style={{ minHeight: "5em", paddingBottom: "0" }}>
            <Card.Title
              style={{
                fontSize: "1em",
                marginBottom: "0",
              }}
            >
              {data.name}
            </Card.Title>
          </Card.Body>
          <Card.Footer className="bg-white border-0">
            <p className="tags">{tags}</p>
          </Card.Footer>
        </a>
      </CardWrapper>
    </div>
  );
};

export default VideoCardDisplay;
