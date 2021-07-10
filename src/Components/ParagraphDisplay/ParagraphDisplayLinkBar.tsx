import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import * as DataObject from "../../DataTypes/ParagraphLinkBar";
import styled from "styled-components";

interface ParagraphDisplayLinkBarProps {
  data: DataObject.default;
}

const ParagraphDisplayLinkBar: React.FunctionComponent = (
  props: ParagraphDisplayLinkBarProps
) => {
  const { data } = props;

  // Redirect /events/xxxxx to /events/xxxxx/overview for Events Pages with a LinkBar
  let validUrlSegmentList = window.location.pathname
    .split("/")
    .filter((item) => {
      if (item.trim() !== "") return item;
    });
  if (validUrlSegmentList.length === 2 && validUrlSegmentList[0] === "events") {
    location.assign(
      "/" + validUrlSegmentList[0] + "/" + validUrlSegmentList[1] + "/overview"
    );
  }

  console.debug("ParagraphDisplayLinkBar: Data ", data);

  const LinkBarContainer = styled.div`
    background-color: #27262c;
    font-family: LatoWebBold;

    & a {
      color: #fff;
      text-decoration: none;
      & h2 {
        font-size: 1.2em;
        padding: 1.5em 0 !important;
        @media (max-width: 992px) {
          font-size: 0.9em;
        }
      }
    }

    & .active {
      background-color: #07060a;
    }

    & .row:hover .active {
      background-color: #27262c;
    }

    & .col { 
      @media screen and (max-width: 575.98px) {
        flex: 0 0 100%;
        max-width: 100%;
      }    
    }

    & .col:hover, .active:hover {
      background-color: #07060a !important;
      transition: background-color 0.5s;
    }

    @media screen and (min-width: 1200px) {
      font-size: 1.25em;
    }
  `;

  return (
    <LinkBarContainer className="container-fluid">
      <Row>
        {data.field_links.map((item, key) => {
          item.uri = item.uri.replace("internal:", "");
          let activeLinkClass =
            window.location.pathname == item.uri ? "active" : "";
          return (
            <Col className={activeLinkClass} key={key}>
              <a data-link-uri={item.uri} href={item.uri}>
                <h2 className="text-center text-uppercase m-0">{item.title}</h2>
              </a>
            </Col>
          );
        })}
      </Row>
    </LinkBarContainer>
  );
};

export { ParagraphDisplayLinkBar as default, ParagraphDisplayLinkBarProps };
