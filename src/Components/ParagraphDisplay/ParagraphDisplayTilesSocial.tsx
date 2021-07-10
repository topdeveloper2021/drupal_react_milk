import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faFacebookF,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";


interface ParagraphDisplayTilesSocialProps {
  data: any;
}

const ParagraphDisplayTilesSocial: React.FunctionComponent = (
  props: ParagraphDisplayTilesSocialProps
) => {
  const { data } = props;

  console.debug("ParagraphDisplayTilesSocial: Data ", data);

  const SocialTiles = styled.div`
  
    @media screen and (min-width: 1200px){
    }

    & .col:hover {
      background-color: #f0f2f4;
    }

    & a {
      color: #999aa3;
      display: block;
      padding: 3em 2em;
      text-align: center;
      text-decoration: none;

      & h4 {
        font-weight: bold;
      }

      & svg {
        color: #D2D4DA;
        display: block;
        width: 4em !important;
        height: 4em !important;
        margin: auto;
      }

    }

    & a:hover * {
      color: var(--color-milken-orange);
    }
  `;

  return (
    <SocialTiles className="container-fluid">
      <Row>
        {
          data.field_icon_link.map((item,key) => {
            let splitTitle = item.title.split("|");
            let fontIcon = (splitTitle[0] === "fa-facebook")
              ? faFacebookF
              : (splitTitle[0] === "fa-twitter") 
              ? faTwitter
              : (splitTitle[0] === "fa-linkedin") 
              ? faLinkedinIn
              : faInstagram;

            return (
              <Col className="col-12 col-sm-6 col-md-3">
                <a href={item.uri} target="_blank">
                  <h4>{splitTitle[1]}</h4>
                  <FontAwesomeIcon icon={fontIcon} />
                </a>
              </Col>
            )
            
            
          })
        }
      </Row>
    </SocialTiles>
  );
};

export { ParagraphDisplayTilesSocial as default, ParagraphDisplayTilesSocialProps };
