import React, { useState } from "react";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import { EventInterface } from "../../DataTypes/Event";
import { EventComponentFactory } from './EventComponentFactory';
import { EventDataFactory } from "./EventDataFactory";

/**
 * implementation of the Controller
 *
 * @param EventDisplayProps
 */
export interface EventDisplayProps {
  data: EventInterface;
  view_mode: string;
  key?: number;
}

export const EventDisplay = (props: EventDisplayProps) => {
  const { data, view_mode, key } = props;
  const DataObject = EventDataFactory(data);
  const [eventData, setEventData] = useState(DataObject);
  if (!eventData.hasData()) {
    const ecp = new EntityComponentProps(eventData);
    ecp
      .getData(eventData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const DataObject = EventDataFactory(ajaxData.data);
        setEventData(DataObject);
      });
    return (
      <>
        <Loading />
      </>
    );
  }
  console.debug("render me, baby. Do it long and hard and NOW", eventData);
  const Component = EventComponentFactory(view_mode);
  console.debug("component factory", Component);
  return <Component data={eventData} key={key} />;
};

export default EventDisplay;
