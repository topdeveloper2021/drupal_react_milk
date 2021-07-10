import React, {useEffect} from "react";
import { Col, Row, Container } from "react-bootstrap";
import * as DataObject from "../../DataTypes/ParagraphEventDisplay";
import styled from "styled-components";
import GridEventsSpeakers from "../GridEvents/GridEventsSpeakers";
import GridEventsProgram from "../GridEvents/GridEventsProgram";

interface ParagraphDisplayEventDisplayProps {
  data: DataObject.default;
  view_mode: string;
}

const ParagraphDisplayEventDisplay: React.FunctionComponent = (
  props: ParagraphDisplayEventDisplayProps
) => {
  const { data } = props;

  console.debug("ParagraphDisplayEventDisplay: Data ", data);

  const MainContainer = styled.div``;

  useEffect(
    () => {
      document.querySelector("body").classList.add('event-pages-smaller-font');
    }
  );

  let activeTabFromURL = window.location.pathname
    .split("/")
    .slice(-1)
    .pop()
    .toLowerCase();
  let activeComponent =
    activeTabFromURL === "speakers" ? (
      <GridEventsSpeakers 
        gridId={data.field_grid_event_id} 
        view_mode="card" 
      />
    ) : (
      <GridEventsProgram
        gridId={data.field_grid_event_id}
        timeZone={data.field_time_zone}
        view_mode="accordion"
      />
    );

  return (
    <MainContainer className="container-fluid">{activeComponent}</MainContainer>
  );
};

export {
  ParagraphDisplayEventDisplay as default,
  ParagraphDisplayEventDisplayProps,
};
