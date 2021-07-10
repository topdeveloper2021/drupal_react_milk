import React from "react";
import { MediaVideoInterface } from "../../DataTypes/MediaVideo";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import moment from "moment";
import { TagsDisplay } from "../TagsDisplay"
import { SocialDisplay } from "../SocialDisplay"

export interface VideoFullDisplayProps {
  data: MediaVideoInterface;
}

export const VideoFullDisplay = (props: VideoFullDisplayProps) => {
  const { data } = props;
  const url = data.field_media_oembed_video;

  console.debug("VideoFullDisplay", data);

  const iFrameHTML = (data.field_embedded_oembed != null)
    ? data?.field_embedded_oembed
    : '<iframe width="200" height="113" src="https://www.youtube.com/embed/' + data?.field_embedded_id + '?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

  console.debug("iFrameHTML", iFrameHTML);

  const VideoElMainWrapper = styled.div`
  `;

  const VideoElFrameWrapper = styled.div`
    background: #27262c;
    width: 100%;

    @media only screen and (max-width: 767.98px) {
      padding-top: 55.25%;
    }

    & > iframe {
      display: block;
      margin: auto;

      @media only screen and (max-width: 767.98px) {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }

      @media only screen and (min-width: 768px) {
        width: 600px;
        height: 339px;
      }

      @media only screen and (min-width: 1200px) {
        width: 700px;
        height: 452px;
      }
    }
  `;

  const ElMainContentWrapper = styled.div`
    & .section-social {
      order: 1;

      @media only screen and (max-width: 1199.98px) {
        order: 3;
      }
    }

    & .section-content {
      order: 2;

      @media only screen and (max-width: 1199.98px) {
        order: 1;
      }

      & p {
        color: #000;
        font-size: 1.25em;
        line-height: 1.5em;
        margin-bottom: 1.5em;
      }
      
    }

    & .section-tags {
      order: 3;
      @media only screen and (max-width: 1199.98px) {
        order: 2;
      }
      
      & .published-date {
        font-family: LatoWebItalic;
        font-size: 1.25em;
        color: #999AA3;
        line-height: 1.8em;
      }
    }
  `;

  const ElEventTag = styled.span`
    color: var(--color-milken-blue);
    font-family: latoWebBlack;
    font-size: 0.9em;
    text-transform: uppercase;
  `;

  const ElTitle = styled.h1`
    font-family: 'LatoWebBold';
    margin-bottom: 0.5em;

    @media only screen and (max-width: 767.98px) {
      font-size: 2em;
    }
  `;

  const published_synthetic = data.published_at !== null ? moment(data.published_at) : moment(data.created, "ddd MMM DD YYYY Z");

  let tagList = [];
  let tagEvents = '';

  if (data.field_events.length !== undefined && data.field_events.length > 0) {
    tagEvents = data.field_events[0].name;
  }
  if (data.field_regions.length !== undefined && data.field_regions.length > 0) {
    data.field_regions.map(
      (item) => {
        tagList.push({ link_uri: '', tag: item.name });
      }
    )
  }
  if (data.field_tags.length !== undefined && data.field_tags.length > 0) {
    data.field_tags.map(
      (item) => {
        tagList.push({ link_uri: '', tag: item.name });
      }
    )
  }
  if (data.field_topics.length !== undefined && data.field_topics.length > 0) {
    data.field_topics.map(
      (item) => {
        tagList.push({ link_uri: '', tag: item.name });
      }
    )
  }

  return (
    <VideoElMainWrapper className="container-fluid p-0">
      <Row className="no-gutters">
        <Col>
          <VideoElFrameWrapper
            dangerouslySetInnerHTML={{ __html: iFrameHTML }}
          />
        </Col>
      </Row>
      <Row>
        <ElMainContentWrapper className="container-fluid" style={{ width: "90%", margin: "2em auto" }}>
          <Row>
            <Col xs="12" xl="1" className="section-social">
              <SocialDisplay data={{ "name": data.name }}></SocialDisplay>
            </Col>
            <Col xs="12" xl="8" className="section-content">
              <Container>
                <ElEventTag>{tagEvents}</ElEventTag>
              </Container>
              <ElTitle className="container">{data.name}</ElTitle>
              <div dangerouslySetInnerHTML={{ __html: data.field_body?.value }} className="container"/>
            </Col>
            <Col xs="12" xl="3" className="section-tags mb-3">
              <div className="published-date container mb-3">{"Published " + published_synthetic.format('MMMM D, YYYY')}</div>
              <TagsDisplay data={{ tagList: tagList }} />
            </Col>
          </Row>
        </ElMainContentWrapper>
      </Row>
    </VideoElMainWrapper>
  );
};

export default VideoFullDisplay;
