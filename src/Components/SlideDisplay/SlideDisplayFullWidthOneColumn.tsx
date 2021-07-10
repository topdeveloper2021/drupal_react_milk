import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";
import {
  SlideFullWidthOneColumn,
  SlideFullWidthOneColumnInterface,
} from "DataTypes/SlideFullWidthOneColumn";
import { EntityComponentProps } from "DataTypes/EntityComponentProps";
import { ImageFile } from "../../DataTypes/ImageFile";
import { ErrorBoundary } from "../../Utility/ErrorBoundary";
import Loading from "../Loading";
import { KeyValueTextFieldDisplay } from "../../Fields/KeyValueTextFieldDisplay";

export interface SlideDisplayFullWidthOneColumnProps {
  data: SlideFullWidthOneColumnInterface;
  total_slides?: number;
  view_mode: string;
}

export const SlideDisplayFullWidthOneColumn: React.FunctionComponent = (
  props: SlideDisplayFullWidthOneColumnProps
) => {
  const { data, total_slides, view_mode } = props;
  const DataObject = new SlideFullWidthOneColumn(data);
  console.debug("Full Width One Column DATA:", data);

  // ========== BACKGROUND IMAGE STUFF ==========

  const [slideData, setSlideData] = useState(DataObject);

  if (!slideData.hasData()) {
    const ecp = new EntityComponentProps(slideData);
    ecp
      .getData(slideData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        console.debug("SlideDisplayFullWidthOneColumn: ajaxData", ajaxData);
        setSlideData(new SlideFullWidthOneColumn(ajaxData.data));
      });
    return <Loading />;
  }
  
  // ========== STYLES ==========
  const rowStyle = {
    backgroundColor: `${slideData.field_background_color?.color}`,
    margin: 0,
    padding: 0,
  };
  
  const backgroundImage =
    slideData.field_background_image instanceof ImageFile
      ? slideData.field_background_image
      : new ImageFile(slideData.field_background_image);

  const isHeroImage = (slideData.field_is_hero_image === undefined || slideData.field_is_hero_image === true) ? true : false;

  let slideTextContainerClasses = 'slide-text' 
  + ((slideData.field_text_centered === true) ? ' text-center' : '') 
  + ((isHeroImage === true) ? ' hero-tall' : ' hero-short') ;

  const Jumbotron = styled.div`
    width: 100%;
    background-clip: border-box;
    background-image: url("${backgroundImage.imageStyleObject.fullscreen}");
    background-position: center;
    background-size: cover;

    @media (min-width: 1200px) {
      background-image: url("${backgroundImage.uri.url}");
      min-height: ${(isHeroImage === true) ? '650px' : 'unset'};
    } 

    @media (max-width: 1199.98px) {
      font-size: 0.85em;
      min-height: ${(isHeroImage === true) ? '50vw' : 'unset'};
    } 

    @media (max-width: 575.98px) {
      font-size: 0.75em;
      min-height: ${(isHeroImage === true) ? ((total_slides > 1) ? 'calc(20em + 12vw)' : '45vw') : 'unset'};
    } 

    & .slide-text {

      &.hero-short {
        padding-top: 5em;
        padding-bottom: 5em;      
      }
    
      &.hero-tall {
        display: block;
        padding-left: 7.5vw;
        position: absolute;
        top: ${(total_slides > 1) ? '45%' : '50%'};
        transform: ${(total_slides > 1) ? 'translateY(-55%)' : 'translateY(-50%)'};
  
        @media (max-width: 575.98px) {
          font-size: 0.85em;
        }  
      }

      & .h2 {
        font-family: 'LatoWebItalic';
        text-transform: uppercase;
        font-size: 1.25em;

        @media (max-width: 768px) {
          font-size: 1em;
        }
      }

      & .h1 {
        font-size: 2.5em;
        font-family: 'LatoWebBold';

        @media (max-width: 1199.98px) {
          font-size: calc(0.7em + 2.5vw);
        }
        
        // @media (max-width: 767.98px) {
        //   font-size: 1.9em;
        // }

        // @media (max-width: 575.98px) {
        //   font-size: 1.7em;
        // }
      }

      & .h3 {
        font-family: 'LatoWeb';
        font-size: 1.5em;

        @media (max-width: 768px) {
          font-size: 1.4em;
        }

        @media (max-width: 576px) {
          font-size: 1.3em;
        }
      }
      
      & .p {
        font-size: 1.25em;
        margin-bottom: 1em;
        color: ${(slideData.field_text_color?.color === "#000000")
          ?'dimgray !important'
          :slideData.field_text_color?.color + ' !important'};
      }
    }

  `;

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
            <Container className={slideTextContainerClasses} >
              {textLines}{slideLink}
            </Container>
          </Jumbotron>
        </Row>
      </ErrorBoundary>
    </>
  );
};

export default SlideDisplayFullWidthOneColumn;
