import React from "react";
import styled from "styled-components";
import { SlideDisplay } from "../SlideDisplay";
import { SlideInterface } from "../../DataTypes/Slide";
import Loading from "../Loading";
import { KeyValueTextFieldDisplay } from "../../Fields/KeyValueTextFieldDisplay";
export interface SlideShowProps {
  items?: Array<SlideInterface>;
  view_mode: string;
}

export const SlideShow = (props: SlideShowProps) => {
  console.debug("SlideShow", props);
  const { items, view_mode } = props;
  if (items.length === 0) {
    return <Loading />;
  }
  if (items.length === 1) {
    return <SlideDisplay data={items[0]} view_mode={view_mode} />;
  }

  const SlideshowIndicatorsList = styled.ol`
    margin: 0;
    align-items: flex-end;

    & > li {
      height: 80px;
      display: block;
      margin: 0px;
      background: rgb(46, 46, 52);
      flex-grow: 1;
      flex-shrink: 0;
      text-indent: 0px;
      opacity: 1;
      color: rgb(134, 135, 139);
      border-left: 1px solid rgb(21, 22, 24);
      border-right: 1px solid rgb(21, 22, 24);
      cursor: pointer;

      @media screen and (max-width: 768px) {
        height: 30px !important;
        display: block !important;
        margin: 0px 5px !important;
        background: none !important;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 0 !important;
        -webkit-flex-shrink: 0;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        text-indent: 0px;
        opacity: 1;
        color: rgb(134,135,139);
        border-left: none !important;
        border-right: none !important;
        cursor: pointer;
        width: auto !important;
      }

      & .mobile-slide-btn{
        height:10px;
        width:10px;
        border: 1px solid white;
        border-radius: 50%;

        @media screen and (min-width: 768px) {
          display:none;
        }

        @media screen and (max-width: 768px) {
          display:block;
        }
      }

      &.active{
        padding-top: 7px;
        box-shadow: 0px -5px 15px 0px black;
        margin-top: 5px;
        border-color: transparent;
        background-color: #0063ca;
        
        & .mobile-slide-btn{
          background:white;
        }

        @media screen and (max-width: 768px) {
          padding-top: 0px !important;
          box-shadow: none !important;
          margin-top: 0px !important;
          border-color: transparent !important;
          background-color: transparent !important;
        }
      }

      & > div{
        @media only screen and (max-width: 768px) {
          display:none;
        }
      }

      & .h2 {
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 2px;
        color: white;
        font-family: 'LatoWeb';
        font-weight: lighter;
      }
        
      & .h1 {
        font-size: 1em;
        color: white;
        font-weight: lighter;
        font-family: 'LatoWeb';
        
        @media only screen and (max-width: 1200px) {
          font-size: 0.8em;
        }
      }
    }  
  `;

  const KeyValueTextFieldDisplayContainer = styled.div`
    margin: 0.8rem;
  `;

  return (
    <div className="carousel slide" data-ride="carousel" id="SlideShowCarousel">
      <SlideshowIndicatorsList className="carousel-indicators">
        {items.map((item, key) => {
          return (
            <li
              key={key}
              className={key === 0 ? " active" : ""}
              data-target="#SlideShowCarousel"
              data-slide-to={key}
              title={item.title ?? "default-value"}
              id={"indicator-".concat(item.id)}
            >
              <span className="mobile-slide-btn"></span>
              <KeyValueTextFieldDisplayContainer>
                <KeyValueTextFieldDisplay
                  data={item.field_slide_text?.slice(0, 2)}
                />
              </KeyValueTextFieldDisplayContainer>
            </li>
          );
        })}
      </SlideshowIndicatorsList>
      <div className="carousel-inner">
        {items.map((slide: SlideInterface, key: number) => {
          console.debug("Sending to slide display...", slide);
          return (
            <div
              className={"carousel-item ".concat(key === 0 ? "active" : "")}
              key={key}
              id={slide.id}
            >
              <SlideDisplay
                data={slide}
                total_slides={items.length}
                view_mode={props.view_mode ?? "full"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

SlideShow.defaultProps = {
  items: [],
  view_mode: "full",
};

export default SlideShow;
