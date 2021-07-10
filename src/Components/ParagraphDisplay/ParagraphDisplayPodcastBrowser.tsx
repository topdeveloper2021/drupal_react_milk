import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import * as DataObject from "../../DataTypes/ParagraphPodcastBrowser";
import styled from "styled-components";
import PodcastBrowser from "../PodcastBrowser";

interface ParagraphDisplayPodcastBrowserProps {
  data: DataObject.default;
}

const ParagraphDisplayPodcastBrowser: React.FunctionComponent = (
  props: ParagraphDisplayPodcastBrowserProps
) => {
  const { data } = props;

  console.debug("ParagraphDisplayPodcastBrowser: Data ", data);

  const PodcastContainer = styled.div`
  `;

  return (
    <PodcastContainer className="container-fluid pb-5 mb-5">
      <Row>
        <PodcastBrowser />
      </Row>
    </PodcastContainer>
  );
};

export { ParagraphDisplayPodcastBrowser as default, ParagraphDisplayPodcastBrowserProps };
