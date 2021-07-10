import React, { useState } from "react";
import Facet, { FacetProps } from "../../DataTypes/Facet";
import Select from "react-select";
import { useQueryState } from "use-location-state";

const HorizontalMenuFacet = (props: FacetProps) => {
  const [facetValues, setFacetValues] = useState(new Facet(props));
  const [fieldTerms, setFieldTerms] = useQueryState(
    props.field.replace("field_", ""),
    ""
  );

  if (!facetValues.hasValues()) {
    facetValues.refresh(setFacetValues);
    return <Select isLoading={true} />;
  }

  const onChangeHandler = (value, { action, removedValue }) => {
    setFieldTerms(
      value
        ?.map((v) => {
          return v.value;
        })
        .toString()
    );
  };

  const colors = [];

  const options = !facetValues.values
    ? []
    : facetValues.values
        .filter((value) => !!value.field_visibility)
        .map((value, key) => {
          colors.push(value.field_tag_color ?? "");

          return {
            value: value.machine_name,
            label: value.name,
          };
        });

  const readFieldTerms = !options
    ? []
    : options
        .map((value, key) => {
          const activeValues = fieldTerms.split(",");
          if (activeValues.includes(value.value)) {
            return value;
          }
        })
        .filter(Boolean);

  return (
    <div>
      {/*<label>{props.label}</label>*/}
      <Select
        value={readFieldTerms}
        options={options}
        isMulti
        onChange={onChangeHandler}
        placeholder={props.label}
      />
    </div>
  );
};

export default HorizontalMenuFacet;
