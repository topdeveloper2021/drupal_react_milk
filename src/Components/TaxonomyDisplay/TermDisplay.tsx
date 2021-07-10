import React, { useState } from "react";
import {
  TaxonomyTerm,
  TaxonomyTermInterface,
} from "../../DataTypes/TaxonomyTerm";
import EntityComponentProps from "../../DataTypes/EntityComponentProps";

export interface TermDisplayProps {
  data: TaxonomyTermInterface;
  view_mode: string;
  key: number;
}

export const TermDisplay = (props: TermDisplayProps) => {
  const { data, key } = props;
  const DataObject = new TaxonomyTerm(data);
  const [termData, setTermData] = useState(DataObject);
  if (!termData.hasData()) {
    const ecp = new EntityComponentProps(termData);
    ecp
      .getData(termData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const newDO = new TaxonomyTerm(ajaxData.data);
        setTermData(newDO);
      });
  }
  console.debug("Should have data by now:", termData);
  return (
    <>
      <span
        key={key}
        className="badge bg-primary"
        data-tag-machine-id={termData.machine_name}
      >
        {termData.name}
      </span>
    </>
  );
};

TermDisplay.defaultProps = {
  view_mode: "tag",
};

export default TermDisplay;
