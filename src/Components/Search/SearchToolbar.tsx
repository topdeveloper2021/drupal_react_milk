import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import Select from "react-select";
import classnames from "classnames";
import { FaThLarge, FaList } from "react-icons/fa";
import { sortOptions, perpageOptions } from "./Backend/static";
import styled from "styled-components";

import { Button, CustomSelect } from "../Shared/Styles";

const ToolbarButton = styled.button`
  display: flex;
  height: calc(1.5em + 0.75rem + 2px);
  align-self: flex-end;
  border: transparent;
  background: transparent !important;

  padding: 4px;
  margin: 0 2px;
  svg {
    width: 1.6em;
    height: 1.6em;
  }
  &:not(.disabled) {
    svg {
      fill: var(--color-milken-orange);
    }
  }
  &.disabled {
    svg {
      fill: var(--color-milken-gray);
    }
  }
`;

export default function SearchToolbar(props) {
  const {
    sortby,
    perpage,
    viewMode,
    setSortby,
    setPerpage,
    setViewMode,
  } = props;

  return (
    <div id="toolbar" className="d-flex justify-content-end my-4">
      <div className="d-inline mx-3">
        <label htmlFor="sortby">Sort by:</label>
        <select
          name="sortby"
          className="custom-select"
          value={sortby}
          options={sortOptions}
          onChange={(e) => setSortby(e.target.value)}
        >
          {sortOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="d-inline mx-3">
        <label htmlFor="perpage">Results per page:</label>
        <select
          name="perpage"
          className="custom-select"
          value={perpage}
          options={perpageOptions}
          onChange={(e) => setPerpage(e.target.value)}
        >
          {perpageOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {/* Hide the Grid/List buttons since list doesn't work great
      <div className="d-flex mx-3">
        <ToolbarButton
          className={classnames(
            "view-btn",
            " justify-content-center",
            "align-items-center",
            { disabled: viewMode == "list" }
          )}
          onClick={() => setViewMode("grid")}
        >
          <FaThLarge />
        </ToolbarButton>
        <ToolbarButton
          className={classnames(
            "view-btn",
            " justify-content-center",
            "align-items-center",
            { disabled: viewMode != "list" }
          )}
          onClick={() => setViewMode("list")}
        >
          <FaList />
        </ToolbarButton>
      </div> */}
    </div>
  );
}

SearchToolbar.propTypes = {
  viewMode: PropTypes.any,
  setViewMode: PropTypes.func,
  perpage: PropTypes.any,
  setPerpage: PropTypes.func,
  sortby: PropTypes.any,
  setSortby: PropTypes.func,
};
