import React, { useState } from "react";
import { List } from "../List";
import { EntityQueueInterface } from "../../DataTypes/EntitySubqueue";
import EntityComponentProps from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";

export interface EntityQueueProps {
  data: EntityQueueInterface;
  view_mode: string;
}

export const EntityQueue = (props: EntityQueueProps) => {
  const { data, view_mode } = props;
  const DataObject = new EntityQueue(data);
  const [queueData, setQueueData] = useState(DataObject);
  if (!queueData.hasData()) {
    const ecp = new EntityComponentProps(queueData);
    ecp
      .getData(queueData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        setQueueData(new EntityQueue(ajaxData.data));
      });
    return <Loading />;
  }
  return (
    <List
      id={this.props.id}
      items={this.state.attributes.items}
      view_mode={this.props.view_mode}
      entityTypeId={this.props.entityTypeId}
      browser={false}
    />
  );
};

export default EntityQueue;
