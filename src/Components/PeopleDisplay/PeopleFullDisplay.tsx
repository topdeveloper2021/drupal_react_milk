import React from 'react';
import { Container, Row, Col, Image } from "react-bootstrap";
import styled from "styled-components";
import { TagsDisplay } from "../TagsDisplay"
import { SocialDisplay } from "../SocialDisplay"
import ImageFileDisplay from '../FileDisplay/ImageFileDisplay';

const PersonFullDisplay = (props: any) => {

  const { data } = props;

  const PersonElMainWrapper = styled.div`
    & .hero-wrapper {
      background: var(--color-milken-blue);\

      & .img-container {
        max-width: 30em;
      }

      @media only screen and (max-width: 768px) {
        & .justify-content-end {justify-content: center !important;}
        & .img-container {max-width: 100%;}
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

  let teamList = [];
  if (data.field_teams.length !== undefined && data.field_teams.length > 0) {
    data.field_teams.map(
      (item) => {
        teamList.push({ link_uri: '', tag: item.name });
      }
    );
  }

  return (
    <PersonElMainWrapper className="container-fluid">
      <Row className="hero-wrapper">
        <Col md="6" sm="12" className="d-flex align-items-center justify-content-end p-0 pr-xl-5">
          <div className="name-title p-5 mx-lg-5">
            <a href="#" onClick={() => { history.back() }}>&lt; Back to previous page</a>
            <h1>{data.field_first_name} {data.field_last_name}</h1>
            <h5>{data.field_pgtitle}</h5>
          </div>
        </Col>
        <Col md="6" sm="12" className="p-0">
          <ImageFileDisplay
            data={data?.field_photo[0]}
            view_mode="medium-raw"
            className="img-container"
          />
        </Col>
      </Row>
      <Row className="main-wrapper py-4 mx-lg-5">
        <Col sm="6" lg="1" className="section-social pt-3">
          <SocialDisplay data={{ "name": data.name }}></SocialDisplay>
        </Col>
        <Col lg="8" className="section-content p-3 px-4 px-md-5">
          <p dangerouslySetInnerHTML={{ __html: data.field_biotext }}></p>
        </Col>
        <Col sm="6" lg="3" className="section-tags pt-3">
          <TagsDisplay data={
            {
              published_date_string: "",
              tagList: teamList
            }
          }></TagsDisplay>
        </Col>
      </Row>
    </PersonElMainWrapper>
  );

};
export default PersonFullDisplay;