import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ErrorBoundary from "Utility/ErrorBoundary";
import MediaDisplayImage from "Components/MediaDisplay/MediaDisplayImage";
import NodeLandingPage from "DataTypes/NodeLandingPage";


export interface NodeDisplayLandingPageCardLargeProps {
  data: NodeLandingPage;
  key: number;
}

export const NodeDisplayLandingPageCardLarge = (
  props: NodeDisplayLandingPageCardLargeProps
) => {
  const { data, key } = props;
  
  const CardOuter = styled.a`
    padding: 1em;

    & :hover {
      text-decoration: none;
    }

    & .card-container {
      padding: 0;
      cursor: pointer;
      text-decoration: none;
      width: 100%;
      position: relative;

      & .card-body {
        position: relative;
      }
    }

    & .card-container:hover {
      box-shadow: 0 8px 16px 0 grey;
    }

    & .card-container:hover .card-title {
      color: var(--color-milken-orange) !important;
    }
    & .card-container:hover .card-body div {
      display: unset;
    }
  `;

  const CardDateLabel = styled.div`
    background-color: #9a6397;
    bottom: 0px;
    color: #fff;
    display: ${(data.field_tile_label == null) ? 'none !important' : 'block'};
    font-family: LatoWebMedium;
    font-size: 1em;
    height: 2em;
    left: 0px;
    line-height: 1em;
    padding: 0.5em 1em;
    position: absolute;

    @media (min-width: 768px) and (max-width: 1199.98px) {
      font-size: 0.8em;
    }
  `;

  const CardLinkBox = styled.div`
    display: none;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    border-bottom: 4px solid var(--color-milken-orange);
  `;

  return (
    <CardOuter
      href={data.path.alias !== null ? data.path.alias : '/node/' + data.drupal_internal__nid}
      key={key}
      className="card border-0 col-sm-12 col-md-4"
    >
      <div className="card-container">
        <Card.Body style={{ padding: 0 }}>
          <ErrorBoundary>
            <MediaDisplayImage
              data={data.field_hero_image}
              view_mode={"medium-raw"}
            />
            <CardDateLabel>{data.field_tile_label}</CardDateLabel>
          </ErrorBoundary>
          <CardLinkBox>
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{
                float: "right",
                color: "white",
                backgroundColor: "var(--color-milken-orange)",
                padding: ".5em",
                width: "3em",
                height: "2.98em",
              }}
            />
          </CardLinkBox>
        </Card.Body>
        <Card.Title
          className="py-3 mb-0 mx-2 font-weight-bold"
          style={{ fontSize: "1.0em", color: "#111" }}
        >
          {data.title}
        </Card.Title>
      </div>
    </CardOuter>
  );
};

export default NodeDisplayLandingPageCardLarge;
