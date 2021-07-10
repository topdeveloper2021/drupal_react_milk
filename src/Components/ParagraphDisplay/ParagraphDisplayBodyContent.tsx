import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ParagraphBodyContent, {
  ParagraphBodyContentInterface,
} from "../../DataTypes/ParagraphBodyContent";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import { BodyFieldDisplay } from "../../Fields/BodyFieldDisplay";
import styled from "styled-components";
import { ImageFile } from "../../DataTypes/ImageFile";
import MediaDisplay from "Components/MediaDisplay";



export interface ParagraphDisplayBodyContentProps {
  data: ParagraphBodyContentInterface;
  view_mode: string;
}

export const ParagraphDisplayBodyContent = (
  props: ParagraphDisplayBodyContentProps
) => {
  const { data, view_mode } = props;
  const DataObject = new ParagraphBodyContent(data);
  const [paragraphData, setParagraphData] = useState(DataObject);
  if (!paragraphData.hasData()) {
    const ecp = new EntityComponentProps(paragraphData);
    ecp
      .getData(paragraphData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const newDO = new ParagraphBodyContent(ajaxData.data);
        setParagraphData(newDO);
      });
      
    console.debug("Fetching ParagraphBodyContent Data", paragraphData);

    return <Loading />;
  }
  
  const backgroundImageObject =
    paragraphData.field_background_image instanceof ImageFile
      ? paragraphData.field_background_image
      : (paragraphData.field_background_image !== null)
      ? new ImageFile(paragraphData.field_background_image)
      : null;

  const backgroundImageStyle = 
    (backgroundImageObject.imageStyleObject?.large !== null)
    ? 'url(' + backgroundImageObject.imageStyleObject?.large + ')'
    : 'none';

  const fontColor = (
    paragraphData.field_background === "#0065CC" ||
    paragraphData.field_background === "#FF6237" || 
    paragraphData.field_background === "#666" ||
    paragraphData.field_background === "#000") ? 
    'white' :
    'black';

  const WrapperSection = styled.section`
    background-color: ${paragraphData.field_background};
    background-image: ${backgroundImageStyle};
    background-size: cover;
    background-position: center center;
    color: ${fontColor};

    & h1 {
      font-size: 2.5em;
      font-family: 'LatoWebBold';

      @media (max-width: 991.98px){
        font-size: 2em;
      }
      
      @media (max-width: 575.98px){
        font-size: 1.5em;
      }
    }

    & h2 {
      font-family: 'LatoWebBold';
      font-size: 2.25rem;  
      margin: 1em 0 0.5em;
    }

    & p {
      font-size: 1.25em;
      line-height: 1.35;
      margin: 0 0 2em 0;
      color: ${(fontColor === "black")?'#232323':'white'}
    }

    & .row {
    }

    & blockquote {
      float: right;
      width: 50%;
      border: none;
      color: #35363c;
      font-size: 1.5em;
      line-height: 1.25em;
      font-style: normal;
      position: relative;
      text-align: left;
      font-family: LatoWebBold;
      margin: 0px 0px 50px 60px;
      background-color: #fff;
      box-shadow: 0 0 26px 0 rgb(50 50 50 / 10%);
      padding: 20px; 

      @media (max-width: 767.98px){
        font-size: 1.25em;
        float: none;
        margin: 0 !important;
        width: 94%;
      }
    }

    
  `;

  // After render, get all code within script tags and run it (Tableau etc)
  useEffect(
    () => {
      document
        .querySelectorAll(".paragraph-body-content script")
        .forEach((item)=>{
          window.eval(item.innerHTML);
        });
    }
  )

  useEffect(() => {
    const MediaDisplayContainers = document.querySelectorAll("media-display[data-bundle=image]");

    MediaDisplayContainers.forEach((item) => {

      let MediaDisplayData = Object.assign({}, item.dataset);

      ReactDOM.render(
        <MediaDisplay
          data={MediaDisplayData}
          view_mode='medium-raw'
        />,
        item
      );
    });
  });

    
  return (
    <WrapperSection className="paragraph-body-content">
      <BodyFieldDisplay data={paragraphData.field_body} />
    </WrapperSection>
  );
};

export default ParagraphDisplayBodyContent;
