import React, { useState } from "react";
import Facet, { FacetProps, FacetValue } from "../../DataTypes/Facet";
import { Dropdown } from "react-bootstrap";
import FontAwesomeIcon from "react-fontawesome";
import { useQueryState } from "use-location-state";

const DropdownFacet = (props: FacetProps) => {
  const [facetValues, setFacetValues] = useState(new Facet(props));
  const [activeTerm, setActiveTerm] = useQueryState(
    props.field.replace("field_", ""),
    ""
  );

  // TODO: Make these props
  const titleSubject = props.titleSubject || "Entries";
  const titleValuesToEnablePostfix = props.titleValuesToEnablePostfix || [];
  const titleConjunction = props.titleConjunction || "";

  if (!facetValues.hasValues()) {
    facetValues.refresh(setFacetValues);
    return (
      <h1 className="title-dropdown text-center">
        <FontAwesomeIcon name="spinner" />
      </h1>
    );
  }

  const dropdownSelectHandler = (machine_name) => {
    // let newFacetValues = facetValues.setActive(machine_name);
    // setFacetValues(newFacetValues);

    setActiveTerm(machine_name);
  };

  const renderedFacetValues = facetValues?.values.map(
    (value: FacetValue, key: number) => {
      if (!value.field_visibility) {
        return;
      }
      return (
        <Dropdown.Item
          key={key}
          eventKey={value.machine_name}
          value={value.machine_name}
        >
          {value.name}
        </Dropdown.Item>
      );
    }
  );

  const allOptionFacetValue = !props.allOptionTitle ? (
    []
  ) : (
    <>
      <Dropdown.Divider />
      <Dropdown.Item key={-1} eventKey={false} value={false}>
        {props.allOptionTitle}
      </Dropdown.Item>
    </>
  );

  const activeKey = facetValues?.values.find((value: FacetValue) => {
    return value.machine_name === activeTerm;
  }) ?? { label: "All" };

  // console.debug("Dropdown Facet:", facetValues);
  // const activeKey: FacetValue = facetValues.getActive().shift() || { label: "All" };

  // console.log(fieldTerms, facetValues);

  let prefix, postfix;

  if (titleSubject && titleValuesToEnablePostfix) {
    prefix = (
      <span className="d-none d-md-inline-block">
        {!titleValuesToEnablePostfix.includes(activeKey.label)
          ? `${titleSubject} ${titleConjunction} `
          : ""}
      </span>
    );
    postfix = titleValuesToEnablePostfix.includes(activeKey.label)
      ? " " + titleSubject
      : "";
  }

  return (
    <>
      <h1 className="title-dropdown text-center">
        <Dropdown onSelect={dropdownSelectHandler}>
          {prefix}
          <Dropdown.Toggle
            variant="outline"
            id={"facet-".concat(facetValues.id)}
          >
            {activeKey.label}
            {postfix}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {renderedFacetValues}
            {allOptionFacetValue}
          </Dropdown.Menu>
        </Dropdown>
      </h1>
    </>
  );
};

export default DropdownFacet;
