import React from "react";
import TaxonomyTerm from "../../DataTypes/TaxonomyTerm";
import TermDisplay from "./TermDisplay";

export interface TermListDisplayProps {
  items: Array<TaxonomyTerm>;
  view_mode: string;
}

export const TermListDisplay = (props: TermListDisplayProps) => {
  const { items, view_mode } = props;
  if (items.length) {
    items.map((item, key) => (
      <TermDisplay data={item} key={key} view_mode={view_mode} />
    ));
  }
  return (
    <div>
      <span className="alert error">No items to display in LIST.</span>
    </div>
  );
};

export default TermListDisplay;
