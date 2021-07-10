import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import styled from "styled-components";
import { SocialDisplay } from "../SocialDisplay"

interface GridSpeakerDisplayProps {
  data: any;
  view_mode?: string;
}

const GridSpeakerDisplay: React.FunctionComponent = (
  props: GridSpeakerDisplayProps
) => {
  const { data, view_mode } = props;

  console.debug("GridSpeakerDisplay: data ", data);
  const [fetchRan, setFetchRan] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  const MainContainer = styled.div`
    & .hero-wrapper {
      background: var(--color-milken-blue);

      @media only screen and (max-width: 768px) {
        & .justify-content-end {justify-content: center !important;}
        & img {width: 100%;}
      }
      
      & .name-title {
        color: #fff;
        max-width: 30em;
    
        & a {
          color: var(--color-milken-orange);
          letter-spacing: 2px;
          font-family: 'LatoWebBold';
          font-size: 0.9em;
          text-transform: uppercase;
        }
    
        & h1 {
          font-family: 'LatoWebBold';
          font-size: 3rem;
          margin: 27px 0 18px;
        }
        
        & h5 {
          font-size: 1.5em;
        }
      }
    }

    & .main-wrapper {
      & .section-social {
        order: 1;
      }

      & .section-content {
        order: 2;
        @media only screen and (max-width: 992px) {
          order: 3;
        }
      }

      & .section-tags {
        order: 3;

        @media only screen and (max-width: 992px) {
          order: 2;
        }
      }
    }
  `;

  const ElMainContentWrapper = styled.div`
  `;

  return (
    <MainContainer className="container-fluid">
      <Row className="hero-wrapper">
        <Col md="6" sm="12" className="d-flex align-items-center justify-content-end p-0 pr-xl-5">
          <div className="name-title p-5 mx-lg-5">
            <a href="#" onClick={() => { history.back() }}>&lt; Back to previous page</a>
            <h1>{data.field_first_name} {data.field_middle_name} {data.field_last_name}</h1>
            <h5 dangerouslySetInnerHTML={{__html: decodeURIComponent(data.field_description)}}/>
          </div>
        </Col>
        <Col md="6" sm="12" className="p-0">
          <img className="img-fluid" src={"https://grid.milkeninstitute.org/events/speakers/" + data.field_biopic} />
        </Col>
      </Row>
      <Row className="main-wrapper py-4 mx-lg-5">
        <Col sm="6" lg="1" className="section-social pt-3">
          <SocialDisplay data={{ "name": data.name }}></SocialDisplay>
        </Col>
        <Col g="8" className="section-content p-3 px-4 px-md-5">
          <p dangerouslySetInnerHTML={{__html: data.field_biotext}}></p>
        </Col>
        <Col sm="6" lg="3" className="section-tags pt-3">
        </Col>
      </Row>
    </MainContainer>
  );
};

export { GridSpeakerDisplay as default, GridSpeakerDisplayProps };