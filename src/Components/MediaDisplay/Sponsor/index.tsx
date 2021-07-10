import React, { useState } from "react";
import MediaSponsorLogo, { MediaSponsorLogoInterface } from "DataTypes/MediaSponsorLogo";
import { EntityComponentProps } from "DataTypes/EntityComponentProps";
import { MediaSponsorCardDisplay } from "./MediaSponsorCardDisplay";
import { MediaSponsorFullDisplay } from "./MediaSponsorFullDisplay";
import { MediaSponsorTileDisplay } from "./MediaSponsorTileDisplay";
import ErrorDisplay from "../../../Utility/ErrorDisplay";

export interface MediaDisplaySponsorProps {
  data: MediaSponsorLogoInterface;
  view_mode: string;
  key: number;
  display_size?: string;
}

export const MediaDisplaySponsor: React.FunctionComponent = (
  props: MediaDisplaySponsorProps
) => {
  const { data, view_mode, key, display_size } = props;
  const DataObject = data instanceof MediaSponsorLogo ? data : new MediaSponsorLogo(data);
  const [sponsorData, setSponsorData] = useState(DataObject);
  if (!DataObject.valid) {
    return <ErrorDisplay error={new Error("DataObject is not valid")} />;
  }
  if (!sponsorData.hasData()) {
    console.debug("Calling ECP", sponsorData);
    const ecp = new EntityComponentProps(sponsorData);
    ecp
      .getData(sponsorData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const DataObject = new MediaSponsorLogo(ajaxData.data);
        setSponsorData(DataObject);
      });
  }
  console.debug("MediaDisplayReport: View mode", view_mode, data);
  switch (view_mode) {
    case "card":
      return <MediaSponsorCardDisplay data={sponsorData} key={key} />;
    case "full":
      return <MediaSponsorFullDisplay data={sponsorData} key={key} />;
    case "tile":
      return <MediaSponsorTileDisplay data={sponsorData} key={key} display_size={display_size} />;
    default:
      return (
        <div>
          <h4>Don't have a component for this report/{view_mode}</h4>
        </div>
      );
  }
};

export default MediaDisplaySponsor;
