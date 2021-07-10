import React from "react";
import styled from "styled-components";
import { EntityInterface } from "../../DataTypes/Entity";
import ListDisplay from "../ListDisplay";

interface TileDisplayProps {
  items: Array<EntityInterface>;
  container: any;
}

export const TileDisplay = (props: TileDisplayProps) => {
  const { items, container } = props;
  const ContainerComponent =
    container ??
    styled.div`
      display: flex;
    `;

  return (
    <>
      <ContainerComponent>
        <ListDisplay
          items={items}
          view_mode="tile"
          container={ContainerComponent}
        />
      </ContainerComponent>
    </>
  );
};
