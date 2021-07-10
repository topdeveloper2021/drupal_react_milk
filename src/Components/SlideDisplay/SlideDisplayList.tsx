import React from "react";
import { EntityInterface } from "../../DataTypes/Entity";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import SlideDisplay from "./index";
import { ListableInterface } from "../../DataTypes/Listable";

export interface SlideDisplayListProps {
  list: ListableInterface;
  view_mode: string;
}

export const SlideDisplayList: React.FunctionComponent = (
  props: SlideDisplayListProps
) => {
  const { list, view_mode } = props;
  return (
    <>
      {list.items?.map((item: EntityInterface, key: number) => {
        return (
          <ErrorBoundary key={key}>
            <SlideDisplay data={item} view_mode={view_mode} />
          </ErrorBoundary>
        );
      })}
    </>
  );
};

export default SlideDisplayList();
