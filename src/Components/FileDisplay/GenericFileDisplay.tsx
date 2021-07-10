import React, { useState } from "react";
import { File, FileInterface } from "../../DataTypes/File";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";

export interface GenericFileDisplayProps {
  data: FileInterface;
  view_mode: string;
  label?: string;
}

export const GenericFileDisplay = (props: GenericFileDisplayProps) => {
  const { data, label } = props;
  const DataObject = new File(data);
  const [documentData, setDocumentData] = useState(DataObject);
  if (!documentData?.hasData()) {
    const ecp = new EntityComponentProps(documentData);
    ecp
      .getData(documentData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        console.debug("MilkenDocument data back from JSON", ajaxData);
        const DO = new File(ajaxData.data);
        setDocumentData(DO);
      });
  }

  return (
    <>
      <a
        href={documentData.uri.url}
        style={{
          background: "var(--color-milken-orange)",
          color: "white",
          fontWeight: "bold",
          letterSpacing: "0.1em",
          padding: "1em",
          textDecoration: "none",
          textTransform: "uppercase",
        }}
      >
        {label || documentData.filename}
      </a>
    </>
  );
};

export default GenericFileDisplay;
