/**
 * List Display
 * Use this when you don't know what kind of entities you're displaying.
 *
 *
 *
 */

import React, { useRef } from "react";
import { EntityInterface } from "../../DataTypes/Entity";
import styled from "styled-components";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import ListDisplayFactory from "./ListDisplayFactory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export interface ListDisplayProps {
  id: string;
  list: Array<EntityInterface> | Promise<Array<EntityInterface>>;
  view_mode: string;
  container?: JSX.Element;
  display_size?: string;
}

export const ListDisplay = function (props: ListDisplayProps) {
  const { id, list, view_mode, container, display_size } = props;

  const ContainerComponent =
    container ??
    styled.div`
      position: relative;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    `;

  const ArrowWrapper = styled.span`
    height: 100%;
    font-size: 3em;
    position: absolute;
    right: 0;
    top: 0;
    box-shadow: 0 0 0.5em 0.65em #fff;
  `;

  const ArrowRight = styled.span`
    position: absolute;
    right: 10%;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  `;

  console.debug("list display:", list);
  if (!Array.isArray(list)) {
    return (
      <>
        <ContainerComponent>
          <h1>Nothing in list to display</h1>
        </ContainerComponent>
      </>
    );
  }

  const refListDisplay = useRef(null);
  const onArrowRightClick = () => {
    refListDisplay.current.scrollLeft <
    refListDisplay.current.scrollWidth - refListDisplay.current.offsetWidth
      ? (refListDisplay.current.scrollLeft =
          refListDisplay.current.scrollLeft + 238)
      : (refListDisplay.current.scrollLeft = "0");
  };

  return (
    <ContainerComponent
      id={"list-".concat(id)}
      className={`${
        props.view_mode == "tile"
          ? "list-display-component d-flex flex-wrap justify-content-center"
          : props.view_mode == "card"
          ? "list-display-component row no-gutters"
          : props.view_mode == "card-large"
          ? "col d-flex flex-wrap"
          : props.view_mode == "row"
          ? ""
          : "list-display-component"
      }`}
      ref={refListDisplay}
      style={{ scrollBehavior: "smooth" }}
    >
      {list.map((item: EntityInterface, key: number) => {
        if( item.id === 'missing' || item.type === 'unknown' ) {
          return (
            <div className="col-2">List contains a "missing" item. Please edit this page and delete and re-create this section. List: ${id}.</div>
          );
        }
        
        console.debug(" ==> list item:", item);
        const Component = ListDisplayFactory(item);
        return (
          <ErrorBoundary key={key}>
            <Component data={item} view_mode={view_mode} key={key} display_size={display_size} />
          </ErrorBoundary>
        );
      })}

      {/* props.view_mode == "card" ? (
        <ArrowWrapper className={"d-lg-none my-a"} onClick={onArrowRightClick}>
          <ArrowRight>
            <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
          </ArrowRight>
        </ArrowWrapper>
      ) : null */}
    </ContainerComponent>
  );
};

export default ListDisplay;
