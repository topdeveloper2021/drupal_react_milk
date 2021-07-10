import React, { SyntheticEvent } from "react";
import {
  FacetList,
  FacetListInterface,
  FacetValue,
} from "../../DataTypes/Facet";
import { Formik, Field, Form } from "formik";
import SearchResult from "./SearchResult";

export interface FacetListDisplayProps {
  facetList: FacetListInterface;
  results: Array<SearchResult>;
  key: number;
  filterOnChangeHandler: any;
}

export const FacetListDisplay = (props: FacetListDisplayProps) => {
  console.log("Facet List Display:", props);
  const { facetList, key, filterOnChangeHandler, results } = props;
  const DataObject = new FacetList(facetList);
  results.map((item) => {
    // @todo: add label translation
    console.log("Result:", item, facetList);
    const value = new FacetValue({
      id: item[facetList.formProperty],
      value: item[facetList.formProperty],
      label: item[facetList.formProperty],
    });
    DataObject.addFacetValue(value);
  });
  console.log("About to render", DataObject);
  return (
    <div data-form-property={facetList.formProperty} key={key}>
      <h5>{facetList.label}</h5>
      <Formik>
        {({ values }) => (
          <Form>
            {DataObject.facets.map((item, key) => {
              const myMachineName = facetList.formProperty.concat(
                "[",
                item.id,
                "]"
              );
              console.debug("FACET RENDER: ", item, myMachineName);

              return (
                <div className="form-check" key={key}>
                  <Field
                    type="checkbox"
                    id={item.id}
                    name={myMachineName}
                    value={item.id}
                    checked={true}
                    className="form-check-input"
                    data-form-property={facetList.formProperty}
                    data-value={item.id}
                    onChange={filterOnChangeHandler}
                  />
                  <label
                    key={key}
                    htmlFor={item.id}
                    className="form-check-label"
                  >
                    {item.label}
                  </label>
                </div>
              );
            })}
          </Form>
        )}
      </Formik>
    </div>
  );
};

FacetListDisplay.defaultProps = {
  facets: [],
  key: Math.floor(Math.random() * Math.floor(99999)),
};

export default FacetListDisplay;
