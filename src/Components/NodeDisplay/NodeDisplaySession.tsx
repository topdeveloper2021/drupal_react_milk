import React, { useState } from "react";
import NodeSession, { NodeSessionInterface } from "../../DataTypes/NodeSession";
import EntityComponentProps from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import DateParts from "../../Utility/DateParts";
import { Row, Col } from "react-bootstrap";

export interface NodeDisplaySessionProps {
  data: NodeSessionInterface;
  key?: number;
  view_mode: string;
}

export const NodeDisplaySession = (props: NodeDisplaySessionProps) => {
  const { data, key, view_mode } = props;
  const DataObject = new NodeSession(data);
  const [sessionData, setSeessionData] = useState(DataObject);
  if (!sessionData.hasData()) {
    const ecp = new EntityComponentProps();
    ecp
      .getData(sessionData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const obj = new NodeSession(ajaxData.data);
        setSeessionData(obj);
      });
    return <Loading />;
  }
  const dates = sessionData.getStartEndObject();
  const startDate = DateParts(dates.getStartDateObject());
  const endDate = DateParts(dates.getEndDateObject());
  console.debug("Node Display Session dates:", startDate, endDate);

  switch (view_mode) {
    default:
      return (
        <Row
          data-id={sessionData.uuid}
          data-drupal-internal-nid={sessionData.drupal_internal__nid}
          data-entity-type={sessionData.type}
          key={key}
        >
          <Col data-field="start" sm={2}>
            {startDate.hour}:{startDate.minute}
            {startDate.dayPeriod}-{endDate.hour}:{endDate.minute}
            {startDate.dayPeriod}
          </Col>
          <Col data-field="title" lg={4} sm={2}>
            {sessionData.title}
          </Col>
          <Col data-field="summary" lg={4} sm={2}>
            {sessionData.field_short_summary}
          </Col>
          <Col data-field="long-description" lg={12} sm={12}>
            {sessionData.field_long_description}
          </Col>
        </Row>
      );
  }
  return <div>No Data</div>;
};

export default NodeDisplaySession;
