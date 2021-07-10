import moment from "moment";
import React from "react";
import { EventDataFactory } from "./EventDataFactory";
import { EventInterface } from "../../DataTypes/Event";

interface EventListItemDisplayProps {
  data: EventInterface;
  key?: number;
}

export const EventListItemDisplay = (props: EventListItemDisplayProps) => {
  const { data, key } = props;
  const eventData = data instanceof Event ? data : EventDataFactory(data);
  const eventDate = moment(eventData.field_event_date, moment.ISO_8601);
  return (
    <div style={{ display: "table-row", width: "100%" }} key={key}>
      <span style={{ display: "table-cell" }}>{eventData.title}</span>
      <span style={{ display: "table-cell" }}>
        {eventDate.format("MMMM D, YYYY")}
      </span>
    </div>
  );
};

EventListItemDisplay.defaultProps = {
  key: 0,
};

export default EventListItemDisplay;
