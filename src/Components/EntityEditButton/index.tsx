import React from "react";
import { EntityInterface } from "../../DataTypes/Entity";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface EntityEditButtonProps {
  data: EntityInterface;
  can_edit: boolean;
  editButtonHandler: unknown;
}

export const EntityEditButton = (props: EntityEditButtonProps) => {
  const { data, can_edit, editButtonHandler } = props;

  if (can_edit == true) {
    return (
      <div className="edit-link">
        <a
          href="#"
          data-type={data.type}
          data-id={data.id}
          onClick={editButtonHandler}
        >
          Edit
        </a>
      </div>
    );
  }
  return <span></span>;
};

export default EntityEditButton;
