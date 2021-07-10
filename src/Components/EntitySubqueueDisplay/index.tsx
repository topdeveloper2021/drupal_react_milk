import React, { useState } from "react";
import {
  EntitySubqueue,
  EntitySubqueueInterface,
} from "../../DataTypes/EntitySubqueue";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ListDisplay from "../ListDisplay";
import { EntityInterface } from "../../DataTypes/Entity";
import { ListableInterface } from "../../DataTypes/Listable";

export interface EntitySubqueueDisplayProps extends EntityInterface {
  queue: EntitySubqueueInterface;
  view_mode: string;
}

export const EntitySubqueueDisplay = (props: EntitySubqueueDisplayProps) => {
  const { queue, view_mode } = props;
  const DataObject = new EntitySubqueue(queue);
  const [entitySubqueueData, setEntitySubqueueData] = useState(queue);

  if (!entitySubqueueData.hasData()) {
    const ecp = new EntityComponentProps(entitySubqueueData);
    ecp
      .getData(entitySubqueueData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        console.debug("EntitySubqueue back from ajax call");
        setEntitySubqueueData(new EntitySubqueue(ajaxData.data));
      });
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <ListDisplay
        id={entitySubqueueData.id}
        list={entitySubqueueData.items}
        view_mode={view_mode}
        browser="false"
      />
    </>
  );
};

export default EntitySubqueueDisplay;
