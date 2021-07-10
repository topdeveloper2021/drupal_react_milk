import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SlideInterface } from "DataTypes/Slide";
import { SlideFiftyFifty } from "DataTypes/SlideFiftyFifty";
import { EntityComponentProps } from "DataTypes/EntityComponentProps";
import Loading from "../Loading";
import { ErrorBoundary } from "../../Utility/ErrorBoundary";
import { ImageFile } from "../../DataTypes/ImageFile";
import { KeyValueTextFieldDisplay } from "../../Fields/KeyValueTextFieldDisplay";
import styled from "styled-components";

export interface SlideDisplayFiftyFiftyProps {
  data: SlideInterface;
  view_mode: string;
}

export const SlideDisplayFiftyFifty: React.FunctionComponent = (
  props: SlideDisplayFiftyFiftyProps
) => {
  console.debug("SlideDisplayFiftyFifty Component Start", props);
  const { data, view_mode } = props;
  const DataObject = new SlideFiftyFifty(data);
  const [slideData, setSlideData] = useState(DataObject);

  if (!slideData.hasData()) {
    const ecp = new EntityComponentProps(slideData);
    ecp
      .getData(slideData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        setSlideData(new SlideFiftyFifty(ajaxData.data));
      });
    return <Loading />;
  }
  console.log("Slide Fifty Fifty Data:", slideData);

  const backgroundImage =
    slideData.field_background_image instanceof ImageFile
      ? slideData.field_background_image
      : new ImageFile(slideData.field_background_image);

  const textLeftOrRight = slideData.type.split("_").pop();
  const colOrder = (textLeftOrRight === "left") ? "align-items-center align-items-stretch flex-row-reverse" : "align-items-center align-items-stretch";
  
  const textLineContainer = styled.div``;

  const SlideContainer = styled.div`
    & .slide-text-column {
      background-color: ${slideData.field_background_color?.color};
      margin: 0;
      padding: 3em 2em;
      min-height: 24em;
      height: 33vw;
    }
  `;

  const WrapperSlideText = styled.div`

    & .h2 {
      font-family: 'LatoWebItalic';
      text-transform: uppercase;
      font-size: 1em;

      @media (max-width: 768px) {
        font-size: 1em;
      }
    }
    
    & .h1 {
      font-size: 2em;
      font-family: 'LatoWebBold';
      margin-bottom: 0.6em;
    }

    & .p {
      font-size: 1.25em;
      line-height: 1.35em;
      color: ${(slideData.field_text_color?.color === "#000000")?'#232323 !important':'white !important'};
    }

    & .h3 {
      font-size: 1.4em;
      line-height: 1.35em;
    }

    @media screen and (max-width: 1198.98px) {
      & .h1 { font-size: 1.7em; }
      & .p { font-size: 1.15em; }
      & .h3 { font-size: 1.25em; }
      & a { font-size: 0.8em; }
    }

    @media screen and (max-width: 575.98px) {
      & .h1 { font-size: calc(0.9em + 2.9vw); }
      & .p, .h3 { font-size: calc(0.5em + 2vw); }
      & a { font-size: 0.7em; }
    }

    & .li {
      display: list-item;
      margin-left: 1em;
      font-size: 1.25em;
      font-family: 'LatoWeb';
      color: ${(slideData.field_text_color?.color === "#000000")?'#232323 !important':'white !important'};
    }

  `;

  const colStyleImage = {
    backgroundColor: `${slideData.field_background_color?.color}`,
    backgroundImage: `url(${backgroundImage.imageStyleObject.large})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    margin: 0,
    padding: '3em 2em',
    minHeight: '24em',
    height: '33vw',
  };

  const textLines = (
    <KeyValueTextFieldDisplay
      Container={textLineContainer}
      style={{ color: `${slideData.field_text_color?.color}` }}
      data={slideData.field_slide_text}
    />
  );

  const slideLink = (slideData.field_link?.title && slideData.field_link?.uri) ? (
    <a
      href={`${slideData.field_link?.uri.replace('internal:','').replace('entity:','') || "#"}`}
      className="btn-milken-orange"
    >
      {`${slideData.field_link?.title || "View More"}`}
    </a>
  )
    :
    '';

  console.debug(textLines);

  return (
    <>
      <ErrorBoundary>
        <SlideContainer className="container-fluid">
          <Row className={colOrder} data-view-mode={view_mode} >
            <Col md={6} className="align-items-stretch" style={colStyleImage} >
            </Col>
            <Col md={6} className="d-flex justify-content-center align-items-center slide-text-column"  >
              <WrapperSlideText>
                {textLines}
                {slideLink}
              </WrapperSlideText>
            </Col>
          </Row>
        </SlideContainer>
      </ErrorBoundary>
    </>
  );
};

export default SlideDisplayFiftyFifty;
