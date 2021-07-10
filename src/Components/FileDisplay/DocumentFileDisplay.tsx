import React, { useState } from "react";
import {
  DocumentFile,
  DocumentFileInterface,
} from "../../DataTypes/DocumentFile";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";

export interface DocumentFileDisplayProps {
  data: DocumentFileInterface;
  view_mode: string;
  label?: string;
}

export const DocumentFileDisplay = (props: DocumentFileDisplayProps) => {
  const { data, label } = props;
  const DataObject = new DocumentFile(data);
  const [documentData, setDocumentData] = useState(DataObject);
  if (!documentData?.hasData()) {
    const ecp = new EntityComponentProps(documentData);
    ecp
      .getData(documentData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        console.debug("MilkenDocument data back from JSON", ajaxData);
        const DO = new DocumentFile(ajaxData.data);
        setDocumentData(DO);
      });
  }

  return (
    <>
      <a
        href={documentData.uri.url}
        className="btn-milken-orange"
      >
        {label || documentData.filename}
      </a>
    </>
  );
};

export default DocumentFileDisplay;
