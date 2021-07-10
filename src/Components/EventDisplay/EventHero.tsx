import React, { useState } from "react";
import { EventInterface } from "../../DataTypes/Event";
import { Jumbotron, Container } from "react-bootstrap";
import MediaDisplay from "../MediaDisplay";
import moment from "moment";
import MediaDataFactory from "../MediaDisplay/MediaDataFactory";
import EntityComponentProps from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";

export interface EventHeroProps {
  data: EventInterface;
}

export const EventHero = (props: EventHeroProps) => {
  const { data } = props;
  if (data.data !== undefined) {
    return <div />;
  }
  const DataObject = MediaDataFactory(data);
  const [heroData, setHeroData] = useState(DataObject);

  if (!heroData.hasData()) {
    const ecp = new EntityComponentProps(heroData);
    ecp
      .getData(heroData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const NewDataObject = MediaDataFactory(ajaxData.data);
        setHeroData(NewDataObject);
      });
    return <Loading />;
  }

  console.log("Hero should have data by now: ", heroData);

  const eventDate = moment(heroData.field_event_date, moment.ISO_8601);

  const jumbotronStyle = {
    minHeight: "300px",
    minWidth: "100%",
    paddingVertical: "1rem",
  };

  return (
    <Jumbotron style={jumbotronStyle} fluid={true}>
      <Container>
        <MediaDisplay data={heroData} view_mode="full" />
      </Container>
    </Jumbotron>
  );
};
