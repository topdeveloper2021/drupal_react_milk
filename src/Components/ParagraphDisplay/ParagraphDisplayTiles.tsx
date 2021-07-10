import React, { useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { ParagraphTilesInterface } from "../../DataTypes/ParagraphTiles";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ParagraphDataFactory from "./ParagraphDataFactory";
import ListDisplay from "../ListDisplay";
import Paragraph, { ParagraphInterface } from "../../DataTypes/Paragraph";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlayCircle,
  faBook,
  faPodcast,
  faNewspaper,
  faVideo,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";

export interface ParagraphDisplayTilesProps {
  data: ParagraphTilesInterface;
}

export interface ParagraphDisplayTilesState {
  data: Paragraph;
  loading: boolean;
  loaded: boolean;
}

export class ParagraphDisplayTiles extends React.Component<
  ParagraphDisplayTilesProps,
  ParagraphDisplayTilesState
> {
  constructor(props) {
    super(props);
    const { data } = props;
    const DataObject = ParagraphDataFactory(data);
    this.state = {
      data: DataObject,
      loading: false,
      loaded: DataObject.hasData(),
    };
    this.scrollOnClickHandler = this.scrollOnClickHandler.bind(this);
  }

  scrollOnClickHandler() {
    // Scoll on click handler goes here
  }

  componentDidMount() {
    const { data, loading } = this.state;
    if (!data.hasData() && !loading) {
      console.debug("Paragraph does not have data", data);
      this.setState({ loaded: false, loading: true });
      const ecp = new EntityComponentProps(data);
      ecp
        .getData(data.getIncluded())
        .then((res) => res.json())
        .then((ajaxData) => {
          const returnedData = ParagraphDataFactory(ajaxData.data);
          this.setState({
            loaded: true,
            loading: false,
            data: returnedData,
          });
        });
    }
  }

  render() {
    const { data, loading, loaded } = this.state;

    if (loading) {
      return (
        <>
          <Loading />
        </>
      );
    }
    if (loaded) {
      let containerClassNames = (data.field_view_mode == "card")
        ? "position-relative overflow-hidden py-5"
        : (data.field_view_mode == "card-large")
          ? "py-5 tiles-card-large"
          : (data.field_view_mode == "tile")
            ? "text-center pb-5"
            : "py-5";

      let containerBackgroundColor = (data.field_view_mode == "card" && data.type == "paragraph--media_tiles")
        ? '#e2e7ea'
        : (data.field_view_mode == "card" && data.type == "paragraph--content_tiles")
          ? '#e2e7ea'
          : (data.field_view_mode == "tile" && data.type == "paragraph--content_tiles")
            ? '#f0f3f5'
            : '#FFFFFF';

      let elSubheader = (data.field_section_subheader !== undefined && data.field_section_subheader !== null)
        ? <p>{data.field_section_subheader}</p>
        : '';

      const SectionWrapper = styled.section`
        background-color: ${containerBackgroundColor};
      
        & .tiles-card-large {
          max-width: 1600px;
        }

        & h2 {
          font-family: 'LatoWebBold';
          font-size: 1.5em;
          font-weight: bold;
          margin-bottom: 0;
          padding-top: 1em;
        }

        & .list-display-component {

          @media screen and (max-width: 576px) {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }

          & a {
            display: flex;
            flex-direction: column;
          }

          & .col-sm-6, .col-lg-3 {
            display: flex;
          }
        }

        & .subheader {
          padding-left: 2em;
          @media screen and (max-width: 992px) {
            padding: 0 2.3em;
          }

          & h2 {
            color: #35363c;
            font-size: 1.846em;
            position:relative;
            margin: 0;
            padding: 1em 0;
            
            &::after {
              content: "";
              background: #0063ca;
              position: absolute;
              bottom: 0;
              left: 0;
              width: 34px;
              height: 4px;
            }
            @media screen and (max-width: 576px) {
              font-size: 1.6em;
            }
          }

          & p {
            font-size: 1.54em;
            color: dimgray;
            line-height: 2em;
            margin: 1.3em 0;
            @media screen and (max-width: 576px) {
              font-size: 1.3em;
            }
          }
        }
      `;

      let titleIcon =
        (data.field_view_mode == "card" && data.type == "paragraph--media_tiles" && data.tiles[0].type === "media--video_stream")
          ? faVideo
          : (data.field_view_mode == "card" && data.type == "paragraph--media_tiles" && data.tiles[0].type === "media--video")
            ? faPlayCircle
            : (data.field_view_mode == "card" && data.type == "paragraph--media_tiles" && data.tiles[0].type === "media--report")
              ? faBook
              : (data.field_view_mode == "card" && data.type == "paragraph--media_tiles" && data.tiles[0].type === "media--podcast_episode")
                ? faPodcast
                : (data.field_view_mode == "card" && data.type == "paragraph--content_tiles" && data.tiles[0].type === "node--landing_page")
                  ? faNewspaper
                  : (data.field_view_mode == "card" && data.type == "paragraph--content_tiles" && data.tiles[0].type === "node--article")
                    ? faNewspaper
                    : faExclamation;

      let headerSection = (data.field_view_mode == "tile")
        ? (
          <div className="col">
            <h2> {data.field_title} </h2>
            {elSubheader}
          </div>
        )
        : (data.field_view_mode == "card-large")
          ? (
            <div className="col-12 col-lg-3 subheader">
              <h2> {data.field_title} </h2>
              {elSubheader}
            </div>
          )
          : (
            <div className="row" style={{ margin: "0 -10px 20px", }} >
              <div className="col d-flex justify-content-between align-items-center">
                <h2>
                  <FontAwesomeIcon icon={titleIcon} className="mr-2" />
                  {data.field_title}
                </h2>
                {elSubheader}
                {/* <a className="btn-milken-orange mt-0">Button</a> */}
              </div>
            </div>
          );

      return (
        <SectionWrapper>
          <Container
            fluid={data.field_view_mode == "card" || data.field_view_mode == "card-large" ? true : false}
            className={containerClassNames}
          >
            <div className={data.field_view_mode == "card-large" ? 'row' : ''}>
              {headerSection}
              <ListDisplay
                id={"tiles-list-".concat(data.id)}
                list={data.tiles}
                view_mode={data.field_view_mode}
                display_size={data.field_display_size}
              />
            </div>
          </Container>
        </SectionWrapper>
      );
    }
    return <div />;
  }
}

export default ParagraphDisplayTiles;
