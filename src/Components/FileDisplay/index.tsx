import React, { useState } from "react";
import { FileInterface } from "../../DataTypes/File";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import { ErrorBoundary } from "../../Utility/ErrorBoundary";
import { FileComponentFactory } from "./FileComponentFactory";
import { FileDataFactory } from "./FileDataFactory";

/**
 * Implementation of the Controller
 *
 * @param FileDisplayProps
 */
interface FileDisplayProps {
  data: FileInterface;
  key?: number;
}

const FileDisplay = (props: FileDisplayProps) => {
  const { data, key } = props;
  const DataObject = FileDataFactory(data);
  const [fileData, setFileData] = useState(DataObject);
  if (!fileData.hasData()) {
    const ecp = new EntityComponentProps(fileData);
    ecp
      .getData(fileData.getIncluded())
      .then((res) => res.json)
      .then((ajaxData) => {
        const newDO = FileDataFactory(ajaxData.data);
        setFileData(newDO);
      });
    return (
      <>
        <Loading />
      </>
    );
  }
  const Component = FileComponentFactory(fileData);
  return (
    <ErrorBoundary key={key ?? 0}>
      <Component data={fileData} />
    </ErrorBoundary>
  );
};

export {
  FileDisplay as default,
  FileDisplay,
  FileDisplayProps,
  FileComponentFactory,
  FileDataFactory,
};
