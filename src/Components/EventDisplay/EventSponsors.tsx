import React from "react";
import { EventInterface } from "../../DataTypes/Event";

export interface EventSponsorProps {
  gridID: string;
  data: EventInterface;
}

export const EventSponsors = (props: EventSponsorProps) => {
  const { gridID, data } = props;

  return (
    <div>
      <h1>Event Sponsors for EventID: {gridID}</h1>
    </div>
  );
};
