import React, { useState } from "react";
import {
  EntityComponentProps,
  EntityComponentPropsInterface,
} from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import MilkenImage, { MilkenImageAttributes } from "../MilkenImage";
import { Col, Container, Row } from "react-bootstrap";

const PodcastEpisodeDefaultView: React.FunctionComponent = (
  props: EntityComponentPropsInterface
) => {
  const [paragraphData, setParagraphData] = useState(new PodcastEpisodeData());
  if (paragraphData.isEmpty()) {
    const ecp = new EntityComponentProps(props);
    ecp
      .getData(
        "?include=field_audio_file,field_podcast_image,field_podcast_image.image&jsonapi_include=true"
      )
      .then((res) => res.json())
      .then((ajaxData) => {
        setParagraphData(new PodcastEpisodeData(ajaxData.data));
      });
    return (
      <>
        <Loading />
      </>
    );
  }
  console.log("Paragraph Data", paragraphData);
  return (
    <>
      <Container>
        <Row>
          <Col lg={12} sm={12}>
            <h1>
              <span>Episode {paragraphData.field_episode}:</span>
              &nbsp;&#58;&nbsp;{paragraphData.field_summary.value}
            </h1>
            {paragraphData.field_podcast_image.map((item, key) => {
              console.log("Milken Image Data", item);
              const imageData = new MilkenImageAttributes(item);
              return <MilkenImage imageData={imageData} key={key} />;
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PodcastEpisodeDefaultView;
