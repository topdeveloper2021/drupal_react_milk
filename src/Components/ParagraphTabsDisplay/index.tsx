import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ParagraphTab, {
  ParagraphTabInterface,
} from "../../DataTypes/ParagraphTab";
import ParagraphDisplayList from "../ParagraphDisplay/ParagraphDisplayList";
import ParagraphsToolbar from "./ParagraphToolbar";
import { JSONSchema } from "@apidevtools/json-schema-ref-parser";
import ParagraphDataFactory from "../ParagraphDisplay/ParagraphDataFactory";
import uuidv4 from "../../Utility/uuidv4";
import ErrorBoundary from "../../Utility/ErrorBoundary";

export interface ParagraphTabsDisplayProps {
  data: ParagraphTabInterface;
  view_mode: any;
}

export class ParagraphTabsDisplay extends React.Component<ParagraphTabInterface> {

  data: ParagraphTabInterface;

  /**
   * Constructor.
   *
   * @param { ParagraphTabsDisplayProps } props - Main incoming props.
   */
  constructor(props: ParagraphTabsDisplayProps) {
    console.debug("ParagraphTabsDisplay(constructor) => props", props);
    super(props);
    const { data } = props;
    this.state = {
      admin_title: data.admin_title,
      content: data.field_tab_content,
    };
  }

  
  /**
   * Check if Tab should render based on Window Path and Admin_Title field.
   *
   * @return { boolean } Rendered Element.
   */
   shouldRender(validPaths: string) {
    if(validPaths === null || validPaths === undefined){throw new Error("Paragraph Tab: Admin Title is empty. I don't know what to render!");}
    let shouldRender = false;
    let currentPath = window.location.pathname;
    let validPathList = validPaths.split(';');
    validPathList.map( (validPath) => { 
      shouldRender = ( shouldRender || currentPath.indexOf(validPath.trim().toLocaleLowerCase()) > -1 ) ? true : false; 
    });
    return shouldRender;
  }
  
  /**
   * Make hero smaller for certain pages.
   *
   * @return { boolean } Rendered Element.
   */
  smallerHero() {
    let validPathList = ['program', 'speakers'];
    let targetClass = ".event-slide-auto-resize";
    let desiredHeight = '350px';
    // If nothing contains the class, stop processing further
    if(document.querySelector(targetClass) == undefined) return;
    let heroImage = document.querySelector(targetClass)?.parentElement?.parentElement;
    let currentPath = window.location.pathname;
    let shouldResize = false;
    validPathList.map( (validPath) => { 
      shouldResize = ( shouldResize || currentPath.indexOf(validPath.trim().toLocaleLowerCase()) > -1 ) ? true : false; 
    });
    if( shouldResize ) {
      heroImage.style.minHeight = desiredHeight;
      console.debug(`ParagraphTabsDisplay => ${targetClass} resized the Hero image: `, heroImage);
    }
  }

  /**
   * Main render.
   *
   * @return { React.ElementRef } Rendered Element.
   */
  render() {
    const { content, admin_title } = this.state;

    if( !this.shouldRender(admin_title) ) return(<></>);

    setTimeout(this.smallerHero, 500);


    return (
      <Container fluid={true}>
        <Row>
          <Col lg={12} sm={12} className="p-0">
            <ParagraphDisplayList
              view_mode="full"
              list={content}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ParagraphTabsDisplay;
