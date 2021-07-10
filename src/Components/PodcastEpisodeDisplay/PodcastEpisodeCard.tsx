import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import PodcastEpisodeServiceLinks from "./PodcastEpisodeServiceLinks";
import AudioFileDisplay from "../FileDisplay/AudioFileDisplay";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import styled, { StyledComponent } from "styled-components";
import { MediaPodcastEpisodeInterface } from "../../DataTypes/MediaPodcastEpisode";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import moment from "moment";
import AuthorsDisplay from "../AuthorsDisplay";
import { TagsDisplay } from "../TagsDisplay";
import { SocialDisplay } from "../SocialDisplay";

export interface PodcastEpisodeCardProps extends MediaPodcastEpisodeInterface {
  data: MediaPodcastEpisodeInterface;
  view_mode: string;
  container: StyledComponent;
}

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

export const PodcastEpisodeCard: React.FunctionComponent = (
  props: PodcastEpisodeCardProps
) => {
  const { data, view_mode, container } = props;

  const published_synthetic = data.published_at !== null ? moment(data.published_at) : moment(data.created, "ddd MMM DD YYYY Z");

  //TODO: get a default slide if field_promo_slide is empty

  let authorString = '';

  if (data.field_people?.length !== undefined && data.field_people.length > 0) {
    data.field_people.map(
      (item) => {
        authorString += item.field_first_name === null ? '' : item.field_first_name;
        authorString += item.field_middle_name === null ? '' : (' ' + item.field_middle_name);
        authorString += item.field_last_name === null ? '' : (' ' + item.field_last_name);
        authorString += ', ';
      }
    );
    authorString = authorString.trim().slice(0, -1);
  }

  console.debug("PodcastEpisodeCard", props);
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
                data={data.field_promo_image?.field_media_image}
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
            <p className="tags">{authorString}</p>
          </Card.Footer>
        </a>
      </CardWrapper>
    </div>
  );
};

export default PodcastEpisodeCard;
