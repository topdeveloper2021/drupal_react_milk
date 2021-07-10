import React from "react";
import { FacetListInterface } from "../../DataTypes/Facet";
import FacetListDisplay from "./FacetListDisplay";
import SearchResult from "./SearchResult";

interface FiltersProps {
  searchParams?: Array<FacetListInterface>;
  results: Array<SearchResult>;
}

const Filters = (props: FiltersProps) => {
  console.log("Filter List Props:", props);
  const { searchParams, results } = props;

  const FilterOnChangeHandler = (changes) => {
    let newSearchParams = searchParams;
    if (
      newSearchParams === undefined ||
      !newSearchParams instanceof URLSearchParams
    ) {
      newSearchParams = new URLSearchParams(document.location.search);
    }
    console.debug("Filter On Change Handler", changes);
    const { formProperty, value } = changes.currentTarget?.dataset;
    if (newSearchParams.has(formProperty)) {
      newSearchParams.set(formProperty, value);
    } else {
      newSearchParams.append(formProperty, value);
    }
    console.debug("New Search Params", newSearchParams.toString());
    document.location.search = newSearchParams.toString();
  };

  if (results.length >= 1) {
    return (
      <>
        <FacetListDisplay
          facetList={{
            label: "Entity Type Id",
            formProperty: "entity_type_id",
          }}
          results={results}
          filterOnChangeHandler={FilterOnChangeHandler}
        />
        <FacetListDisplay
          facetList={{
            label: "Bundle",
            formProperty: "bundle",
          }}
          results={results}
          filterOnChangeHandler={FilterOnChangeHandler}
        />
      </>
    );
  } else {
    return <div></div>;
  }
};

export default Filters;
