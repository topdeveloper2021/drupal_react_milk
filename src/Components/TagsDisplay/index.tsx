import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import ErrorBoundary from "../../Utility/ErrorBoundary"

export interface TagsDisplayProps {
  data: any;
}

export const TagsDisplay = (props: TagsDisplayProps) => {
  const { data } = props;

  console.debug("TagsDisplay", data);

  const TagsWrapper = styled.div`
    & a {
      color: #fff !important;
      padding: 0.3em 1em;
      text-decoration: none;
      background-color: #9a6397;
      font-size: 0.75em;
      line-size: 1.4;
      display: inline-block;
      white-space: nowrap;
      margin: 0.8em 0.8em 0.8em 0;
    }
  `;

  if (data.tagList.length !== undefined && data.tagList.length > 0) {
    return (
      <TagsWrapper className="container">
        <Row>
          <Col>
            <h5>Tags</h5>
            {data.tagList.map((item: any, key: number) => {

              let linkElement = (item.link_uri === '')
                ? <a key={key}>{item.tag}</a>
                : <a href={item.link_uri} key={key}>{item.tag}</a>;

              return (
                <ErrorBoundary key={key}>
                  {linkElement}
                </ErrorBoundary>
              );
            })}
          </Col>
        </Row>
      </TagsWrapper>
    );
  } else {
    return '';
  }
};

export default TagsDisplay;
