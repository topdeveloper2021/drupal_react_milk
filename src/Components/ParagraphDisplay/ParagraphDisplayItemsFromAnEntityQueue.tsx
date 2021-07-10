import React from "react";
import { Col, Container } from "react-bootstrap";
import * as DataObject from "../../DataTypes/ParagraphFourTileBlockQueue";
import EntityQueue from "../EntityQueue";

interface ParagraphDisplayItemsFromAnEntityQueueProps {
  data: DataObject.ParagraphFourTileBlockQueueInterface;
  view_mode: string;
}

const ParagraphDisplayItemsFromAnEntityQueue: React.FunctionComponent = (
  props: ParagraphDisplayItemsFromAnEntityQueueProps
) => {
  console.debug("ParagraphItemsFromAnEntityQueue", props);
  return (
    <Col lg={12} key={this.props.key}>
      <Container py={"2rem"}>
        <EntityQueue data={props.data} view_mode={props.view_mode ?? "full"} />
      </Container>
    </Col>
  );
};

export {
  ParagraphDisplayItemsFromAnEntityQueue as default,
  ParagraphDisplayItemsFromAnEntityQueueProps,
};
