import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";

export interface SimplePagination {

}

export const SimplePagination = (props: SimplePaginationProps) => {
  const {
      totalPages,
      totalItems,
      itemsPerPage,
      currentPage,
      setCurrentPage
  } = props;

  return (
    <div>
      {totalPages}
      {totalItems}
      {currentPage}
      1 2 3 4 5 6 7 8 9
    </div>
  );
};

SimplePagination.propTypes = {
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalItems: PropTypes.number,
  setCurrentPage: PropTypes.any
};

export default SimplePagination;
