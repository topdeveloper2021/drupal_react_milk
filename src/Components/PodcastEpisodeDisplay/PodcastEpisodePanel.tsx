import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import PodcastEpisodeServiceLinks from "./PodcastEpisodeServiceLinks";
import AudioFileDisplay from "../FileDisplay/AudioFileDisplay";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import styled, { StyledComponent } from "styled-components";
import { MediaPodcastEpisodeInterface } from "../../DataTypes/MediaPodcastEpisode";
import ErrorBoundary from "../../Utility/ErrorBoundary";

export interface PodcastEpisodePanelProps extends MediaPodcastEpisodeInterface {
  data: MediaPodcastEpisodeInterface;
  view_mode: string;
  container: StyledComponent;
}


export const PodcastEpisodePanel: React.FunctionComponent = (
  props: PodcastEpisodePanelProps
) => {
  const { data, view_mode, container } = props;

  const LearnMoreLink = styled.a`
    color: var(--color-milken-orange);
    font-weight: bold;
  `;

  const PodcastEpisodePanel = styled.div`
    font-size: 0.85em;

    @media (max-width: 399.98px) {
      justify-content: center;
    }

    & .bubble-image-container {
      width: 8em;
      height: 8em;
      border-radius: 50%;
      overflow: hidden;

      & img {
        width: 100%;  
        height: 100%;
      }
    }

    & .podcast-guest-info {
      & h4 {
        font-size: 1.1em; 
        font-weight: bold; 
        font-style: italic;
        margin: 0.7em 0 0;
      }
  
      & h5 {
        font-size: 0.9em; 
      }
    }
  `

  console.debug("PodcastEpisodePanel", props);
  return (
    <>
      <Card.Body className="px-0 py-3">
          <Row>
            <Col xs={12} md={3}>
              {data.field_guests.map((item) => {
                return (
                  <PodcastEpisodePanel className="d-flex flex-column align-items-center">
                    <ErrorBoundary>
                      <div className="bubble-image-container">
                        <ImageFileDisplay
                          data={item.field_photo[0]}
                          view_mode="thumbnail-raw"
                          style={{ objectFit: "cover"}}
                        />
                      </div>
                    </ErrorBoundary>
                    <Col className="podcast-guest-info text-center p-0 my-2">
                      <h4>{item.field_first_name} {item.field_middle_name} {item.field_last_name}</h4>
                      <h5>{item.field_pgtitle}</h5>
                    </Col>
                  </PodcastEpisodePanel>
                )
              })}
            </Col>
            <Col xs={12} md={9}>
              <Row style={{ margin: "auto" }}>
                <Col>
                  <span
                    dangerouslySetInnerHTML={{ __html: data.field_body?.value }}
                    className={"text-muted"}
                  ></span>
                  <br />
                  <p>
                    <LearnMoreLink href={data.path.alias}>
                      LEARN MORE &gt;
                    </LearnMoreLink>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className={"col-md-10"}>
                  <br />
                  <ErrorBoundary>
                    {console.debug("PodcastEpisodePanel: AudioFile Render ", data.field_episode)}
                    <AudioFileDisplay
                      data={data.field_media_audio_file}
                      view_mode={"full"}
                    />
                  </ErrorBoundary>
                  <br />
                </Col>
              </Row>
              <Row>
                <PodcastEpisodeServiceLinks links={data.field_service_links} />
              </Row>
            </Col>
          </Row>
      </Card.Body>
    </>
  );
};

export default PodcastEpisodePanel;
