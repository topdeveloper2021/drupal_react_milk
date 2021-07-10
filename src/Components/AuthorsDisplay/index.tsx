import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import ErrorBoundary from "../../Utility/ErrorBoundary"
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";

export interface AuthorsDisplayProps {
  data: any;
}

export const AuthorsDisplay = (props: AuthorsDisplayProps) => {
  const { data } = props;

  console.debug("AuthorsDisplay", data);

  const AuthorsWrapper = styled.div`
    font-family: "LatoWeb";
    color: #212529;

    & a {
      text-decoration: none;
      color: #444;
    }

    & a h5 {
      font-family: 'LatoWebBold';
      margin: 0;
    }

    & h6 {
      opacity: 0.74;
      margin: 3px 0 0 0;
    }

    & .rounded-circle {
      width: 100%;
      height: 100%;
    }
  `;

  // Check if Authors should be displayed 
  if (data.authorList.length !== undefined && data.authorList.length > 0) {
    return ( 
      <AuthorsWrapper className="container px-3 pb-3 mb-3">
        <Row>
          <Col>
            <h5>Authors</h5>
            {data.authorList.map((item: any, key: number) => {
              let linkElement = (
                <a
                  // Check if image should have a link
                  href={item.isHidden === true ? "javascript:void(0)" : item.link}
                  className="d-flex align-items-center mt-4"
                >
                  <div style={{ width: "4em", height: "4em"}}>
                    <div className="rounded-circle overflow-hidden">
                      <ImageFileDisplay
                        data={item.photo}
                        view_mode="thumbnail-raw"
                        style={{ width: "4em", height: "4em", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="mx-3">
                    <h5>{item.name}</h5>
                    <h6>{item.pgtitle}</h6>
                  </div>
                </a>
              );

              return (
                <ErrorBoundary key={key}>
                  {linkElement}
                </ErrorBoundary>
              );
            })}
          </Col>
        </Row>
      </AuthorsWrapper>
    );
  } else {
    return '';
  }
};

export default AuthorsDisplay;
