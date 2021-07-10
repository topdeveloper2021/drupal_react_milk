import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import moment from "moment";

export interface SocialDisplayProps {
  data: any;
}

export const SocialDisplay = (props: SocialDisplayProps) => {
  const { data } = props;

  console.debug("SocialDisplay", data);

  const SocialWrapper = styled.div`
    & svg {
      background: #f1f4f6;
      color: #959595;
      font-size: 2.25em;
      border-radius: 50%;
      padding: 0.33em;
      margin: 0.2em;
      width: 1.25em !important;
      height: 1.25em !important;
    }
  `;

  return (
    <SocialWrapper className="container">
      <Row>
        <Col>
            <h5>Share</h5>
            <a href={"https://twitter.com/intent/tweet?url=" + window.location.href +"&text=" + data.name}>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href={"https://www.facebook.com/share.php?u=" + window.location.href +"&quote=" + data.name}>
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href={"https://www.linkedin.com/sharing/share-offsite/?url=" + window.location.href +"&title=" + data.name}>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
        </Col>
      </Row>
    </SocialWrapper>
  );
};

export default SocialDisplay;
