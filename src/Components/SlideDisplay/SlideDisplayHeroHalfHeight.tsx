import React, { useState } from "react";
import { SlideDisplayProps } from ".";
import SlideFiftyFifty from "../../DataTypes/SlideFiftyFifty";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { ImageFile } from "../../DataTypes/ImageFile";
import { ErrorBoundary } from "../../Utility/ErrorBoundary";
import Loading from "../Loading";
import { KeyValueTextFieldDisplay } from "../../Fields/KeyValueTextFieldDisplay";

export const SlideDisplayHeroHalfHeight: React.FunctionComponent = (
  props: SlideDisplayProps
) => {
  console.debug("FiftyFifty", props);
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
  const backgroundImage =
    slideData.field_background_image instanceof ImageFile
      ? slideData.field_background_image
      : new ImageFile(slideData.field_background_image);

  // ========== STYLES ==========
  const rowStyle = {
    backgroundColor: `${slideData.field_background_color?.color}`,
    margin: 0,
    padding: 0,
  };

  const isHeroImage = (slideData.field_is_hero_image === undefined || slideData.field_is_hero_image === true) ? true : false;

  const slideTextStyle = (isHeroImage) ?
    {
      top: "50%",
      transform: "translateY(-50%)",
      display: "block",
      position: "absolute",
      paddingLeft: "7.5vw",
    }
    :
    {
      paddingTop: "5em",
      paddingBottom: "5em",
    };

  console.debug("slideData Var", slideData);
  console.debug("background image object: ", backgroundImage);
  const Jumbotron = styled.div`
    min-height: ${(isHeroImage) ? "300px" : ""};
    width: 100%;
    background-position: center;
    background-clip: border-box;
    background-size: cover;
    background-image: url("${backgroundImage.imageStyleObject.thumbnail}");
    @media (min-width: 400px) {
      background-image: url("${backgroundImage.imageStyleObject.medium}");
    }
    @media (min-width: 720px) {
      background-image: url("${backgroundImage.uri.url}");
    }

    & .text-slide .h1 {
      @media (max-width: 576px) {
        font-size: 2em;
      }
    }

    & .text-slide div {
      @media (max-width: 576px) {
        font-size: 1.3em;
      }
    }
  `;

  console.debug("Jumbotron style", Jumbotron);
  const textLineContainer = styled.div``;
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

  // ========== RENDER ==========
  return (
    <>
      <ErrorBoundary>
        <Row
          className="align-items-center"
          style={rowStyle}
          data-view-mode={view_mode}
        >
          <Jumbotron className="jumbotron jumbotron-fluid d-block align-items-center m-0 p-0">
            <Container
              style={slideTextStyle}
              className={(slideData.field_text_centered === true) ? 'text-slide text-center' : 'text-slide'}
            >{textLines}{slideLink}</Container>
          </Jumbotron>
        </Row>
      </ErrorBoundary>
    </>
  );
};

export default SlideDisplayHeroHalfHeight;
