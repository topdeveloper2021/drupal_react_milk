import React, { useState } from "react";
import MediaReport, { MediaReportInterface } from "DataTypes/MediaReport";
import { EntityComponentProps } from "DataTypes/EntityComponentProps";
import { MediaReportCardDisplay } from "./MediaReportCardDisplay";
import { MediaReportFullDisplay } from "./MediaReportFullDisplay";
import ErrorDisplay from "../../../Utility/ErrorDisplay";

export interface MediaDisplayReportProps {
  data: MediaReportInterface;
  view_mode: string;
  key: number;
}

export const MediaDisplayReport: React.FunctionComponent = (
  props: MediaDisplayReportProps
) => {
  const { data, view_mode, key } = props;
  const DataObject = data instanceof MediaReport ? data : new MediaReport(data);
  const [reportData, setReportData] = useState(DataObject);
  if (!DataObject.valid) {
    return <ErrorDisplay error={new Error("DataObject is not valid")} />;
  }
  if (!reportData.hasData()) {
    console.debug("Calling ECP", reportData);
    const ecp = new EntityComponentProps(reportData);
    ecp
      .getData(reportData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const DataObject = new MediaReport(ajaxData.data);
        setReportData(DataObject);
      });
  }
  console.debug("MediaDisplayReport: View mode", view_mode, data);
  switch (view_mode) {
    case "card":
      return <MediaReportCardDisplay data={reportData} key={key} />;
    case "full":
      return <MediaReportFullDisplay data={reportData} key={key} />;

    default:
      return (
        <div>
          <h4>Don't have a component for this report/{view_mode}</h4>
        </div>
      );
  }
};

export default MediaDisplayReport;
