import React, { useState } from "react";
import SlideShow from "../Slideshow";
import { Col } from "react-bootstrap";
import ParagraphSlide, {
  ParagraphSlideInterface,
} from "../../DataTypes/ParagraphSlide";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import EntityComponentProps from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";

export interface ParagraphDisplaySlideProps {
  data: ParagraphSlideInterface;
  view_mode: string;
}

export const ParagraphDisplaySlide = (props: ParagraphDisplaySlideProps) => {
  const { data, view_mode } = props;
  const DataObject = new ParagraphSlide(data);
  const [paragraphData, setParagraphData] = useState(DataObject);
  if (!paragraphData.hasData()) {
    const ecp = new EntityComponentProps(paragraphData);
    ecp
      .getData(paragraphData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const newDO = new ParagraphSlide(ajaxData.data);
        setParagraphData(newDO);
      });
    return <Loading />;
  }
  return (
    <Col lg={12} style={{ margin: 0, padding: 0 }}>
      <ErrorBoundary>
        <SlideShow items={paragraphData.field_slides} view_mode={view_mode} />
      </ErrorBoundary>
    </Col>
  );
};

export default ParagraphDisplaySlide;
