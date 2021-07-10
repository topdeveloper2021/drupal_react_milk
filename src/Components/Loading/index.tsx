import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Loading = () => {
  return (
    <Container>
      <Row>
        <Col lg={12}>
          <img src='/sites/default/files/MilkenLoadingSpinner.gif' alt='loading animation' />
        </Col>
      </Row>
    </Container>
  );
};

export default Loading;
