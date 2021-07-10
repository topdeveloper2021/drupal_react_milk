/**
 * Node List Display
 * Generic list of nodes when the bundle is unknown.
 *
 *
 *
 */

import React from "react";
import { EntityInterface } from "../../DataTypes/Entity";
import NodeDisplay from "./index";
import { ListableInterface } from "../../DataTypes/Listable";
import ErrorBoundary from "../../Utility/ErrorBoundary";

interface NodeDisplayListProps {
  list: ListableInterface;
  view_mode: string;
}

const NodeDisplayList: React.FunctionComponent = (
  props: NodeDisplayListProps
) => {
  const { list, view_mode } = props;
  return (
    <>
      {list.items?.map((item: EntityInterface, key: number) => {
        return (
          <ErrorBoundary key={key}>
            <NodeDisplay data={item} view_mode={view_mode} />
          </ErrorBoundary>
        );
      })}
    </>
  );
};

export { NodeDisplayList as default, NodeDisplayListProps };
