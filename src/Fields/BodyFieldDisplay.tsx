import React from "react";
import { BodyFieldInterface } from "./BodyField";

export interface BodyFieldProps {
  data: Array<BodyFieldInterface> | BodyFieldInterface;
}

export const BodyFieldDisplay = (props: BodyFieldProps) => {
  const { data } = props;
  console.debug("BodyFieldDisplay", data);
  const articleText = Array.isArray(data)
    ? data?.map((fieldData: BodyFieldInterface) => fieldData.processed).join()
    : data.processed;
  return (
    <div className="container">
      <div className="row">
        <div className="col" dangerouslySetInnerHTML={{ __html: articleText }} />
      </div>
    </div>
  );
};

export default BodyFieldDisplay;
