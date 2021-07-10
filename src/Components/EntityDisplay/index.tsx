import React from "react";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import { EntityInterface } from "../../DataTypes/Entity";
import EntityComponentFactory from "../EntityBrowser/EntityComponentFactory";

export interface EntityDisplayProps {
  data: EntityInterface | string;
  viewMode?: string;
  view_mode?: string;
  can_edit?: boolean;
}

export const EntityDisplay = (props) => {
  console.log("Entity Display: ", props);
  const { data, view_mode, viewMode, can_edit } = props;
  console.log("Data ", data);
  console.log("typeof Data ", typeof data);
  const DataObject = (
    (typeof data === "string") ? 
    (typeof JSON.parse(data).data !== 'undefined') ? JSON.parse(data).data 
    : JSON.parse(data)
    : data
  );
  console.log("DataObject", DataObject);
  if(typeof DataObject === "undefined") { return <h1>DATA IS NOT DEFINED</h1>; }
  const Component = (typeof DataObject !== "undefined") ? EntityComponentFactory(DataObject) : '';
  return (
    <ErrorBoundary>
      <Component
        data={DataObject}
        view_mode={view_mode ?? viewMode}
        can_edit={can_edit}
      />
    </ErrorBoundary>
  );
};

export default EntityDisplay;
