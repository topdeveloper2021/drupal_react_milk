import React, { useState } from "react";
import { EventInterface } from "../../DataTypes/Event";
import { EventDataFactory } from "./EventDataFactory";
import EntityComponentProps from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";

export interface EventDoubleHeightTileProps {
  data: EventInterface;
  key?: number;
}

export const EventDoubleHeightTile = (props: EventDoubleHeightTileProps) => {
  const { data, key } = props;
  const DataObject = EventDataFactory(data);
  const [eventData, setEventData] = useState(DataObject);
  if (!eventData.hasData()) {
    const ecp = new EntityComponentProps(eventData);
    ecp
      .getData(eventData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const returnedData = EventDataFactory(ajaxData.data);
        setEventData(returnedData);
      });
    return <Loading />;
  }
  console.debug("Event should have its data to display:", eventData);
  return (
    <>
      <h1>Double Height TileProps</h1>
    </>
  );
};

export default EventDoubleHeightTile;
