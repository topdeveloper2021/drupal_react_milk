import styled from "styled-components";
import moment from "moment";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import { Card } from "react-bootstrap";
import React from "react";
import { EventDataFactory } from "./EventDataFactory";
import { EventInterface } from "../../DataTypes/Event";

interface EventCardDisplayProps {
  data: EventInterface;
  key?: number;
}

export const EventCardDisplay = (props: EventCardDisplayProps) => {
  const { data, key } = props;
  const eventData = EventDataFactory(data);
  const ContainerDiv = styled.div`
    max-width: 18rem;
    margin-bottom: 2rem;
  `;
  const eventDate = moment(eventData.field_event_date, moment.ISO_8601);
  return (
    <>
      <ContainerDiv className={"card text-align-left"} key={key ?? 0}>
        <a
          href={eventData.path.alias}
          className="my-5"
          data-drupal-id={eventData.drupal_internal__id}
          data-drupal-type={eventData.type}
          data-uuid={eventData.id}
        >
          <ImageFileDisplay
            data={eventData.field_title_card_image}
            view_mode="thumbnail"
            width="100%"
            height="220px"
            className="card-img-top"
          />
          <Card.Body style={{ minHeight: "150px" }}>
            <Card.Title>{eventData.title}</Card.Title>
          </Card.Body>
          <Card.Footer>{eventDate.format("MMMM D, YYYY")}</Card.Footer>
        </a>
      </ContainerDiv>
    </>
  );
};

export default EventCardDisplay;
