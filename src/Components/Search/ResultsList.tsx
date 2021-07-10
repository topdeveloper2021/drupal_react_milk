import React, { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import SearchResult, { SearchResultProps } from "./SearchResult";
import { FacetList, FacetListManager, FacetValue } from "../../DataTypes/Facet";

interface ResultsListProps {
  results: Array<SearchResultProps>;
  currentActiveRequest: boolean;
  setFilters: any;
}

const ResultsList = (props: ResultsListProps) => {
  const { results, currentActiveRequest, setFilters } = props;
  if (currentActiveRequest === true) {
    return (
      <Row className="h-100">
        <Col lg={12} className={"col-sm-12 my-auto"}>
          <div className={"w-25 text-align-center border-0"}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        </Col>
      </Row>
    );
  } else if (results.length >= 1) {
    const mapResults = (results: Array<SearchResultProps>) => {
      const filters = new FacetListManager();
      // @todo: add facets to filters list and send back to parent component
      const toReturn = results.map((result, key) => {
        return (
          <li key={key}>
            <SearchResult {...result} />
          </li>
        );
      });
      return toReturn;
    };

    return <ol>{mapResults(results)}</ol>;
  } else {
    return <h1>No results found.</h1>;
  }
};

ResultsList.defaultProps = {
  results: [],
  currentActiveRequest: false,
};

export default ResultsList;
