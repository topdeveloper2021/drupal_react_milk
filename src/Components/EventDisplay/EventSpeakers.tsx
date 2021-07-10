import React from "react";
import { EventInterface } from "../../DataTypes/Event";

export interface EventSpeakersProps {
  gridID: string;
  data: EventInterface;
}

export const EventSpeakers = (props: EventSpeakersProps) => {
  const { gridID, data } = props;

  return (
    <div>
      <h1>Speakers for EventID: {gridID}</h1>
    </div>
  );
};
