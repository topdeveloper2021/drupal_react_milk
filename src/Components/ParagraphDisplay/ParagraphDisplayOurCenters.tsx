import React, {useState} from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import styled from "styled-components";
import Loading from "../Loading";

interface ParagraphDisplayOurCentersProps {
  data: any;
}

const ParagraphDisplayOurCenters: React.FunctionComponent = (
  props: ParagraphDisplayOurCentersProps
) => {
  const { data } = props;
  
  const [fetchRan, setFetchRan] = useState(false);
  const [centersList, setCentersList] = useState(null);
  
  
  // Fetch Centers List
  if (!fetchRan) {
    fetch('/api/v1.0/our_centers?_format=json&vocabulary=centers')
      .then((res) => res.json())
      .then((incoming) => {
        setCentersList(incoming);
        setFetchRan(true);
        console.debug("ParagraphDisplayOurCenters: centersList ", centersList);
      }
    );
  }

  if (!fetchRan){
    return (
      <Loading />
    );
  }

  const centersListHTML = centersList.map((item, index) => {
    return (
      <li
        key={index}
        data-key={index}
        className={'list-group-item' + (index === 0 ? ' active' : '')}
        onClick={setActive}
      >{item.name}</li>
    )
  })

  function setActive(e) {
    let allListItems = document.querySelectorAll("li.list-group-item");
    [...allListItems].map(item => {
      item.classList.remove("active")
    })
    e.target.classList.add("active");

    let allCentersCardItems = document.querySelectorAll(".our-centers--center-card");
    [...allCentersCardItems].map(item => {
      item.classList.remove("active")
    })

    let targetKey = e.target.dataset.key;
    document
      .getElementById(`our-centers--center-card-${targetKey}`)
      .classList
      .add("active");
  }

  const centersCard = centersList.map((item, index) =>
    <Card
      key={index}
      className={"our-centers--center-card" + (index === 0 ? ' active' : '')}
      id={`our-centers--center-card-${index}`}
    >
      <div className="card-header p-0">
        <a href={item.field_link} dangerouslySetInnerHTML={{__html: item.field_image}} />
      </div>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <a className="center-link" href={item.field_link}>{item.name}</a>
          <p>{item.field_summary}</p>
        </div>
        <a href={item.field_link} className="btn-milken-orange mt-0 align-self-start">Learn More</a>
      </div>
    </Card>
  )

  const CentersWrapper = styled.div`

    & .container {
      @media screen and (max-width: 992px) {
        max-width: 95%;
      }
    }

    & h2 {
      font-family: "LatoWebBold";
      font-size: 2.5em;
    }

    & .centersListHTML {
      & h4 {
        letter-spacing: 2px;
        color: #000;
        font-size: 1.25em;
        font-family: 'LatoWebItalic';
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: 1.5em;
      }
      & .list-group-item {
        cursor: pointer;
        border: none;
        border-left: 3px solid transparent;
        color: #000;
        line-height: 1.43;
        font-family: 'LatoWebMedium';

        &.active, :hover {
          color: var(--color-milken-orange);
          border-left: 3px solid var(--color-milken-orange);
          background-color: #f0f2f4;
        }
      }
    }

    & .centersCard {
      & .our-centers--center-card {
        display: none;
        border: none;

        &.active {
          display: block;
        }

        & .card-header {
          height: 18em;

          & a {
            & img {
              height: 100% !important;
              width: 100% !important;
              max-width: 100%;
              object-fit: cover;
            }
          }
        }

        & .card-body {
          background-color: #f1f4f6;
          color: dimgray;
          min-height: 15em;

          & p {
            margin-top: 0.5em;
            font-size: 1.15em;
          }

          & .center-link {
            font-family: "LatoWebBold";
            color: #35363c;
            font-size: 1.45em;
          }
        }
      }
    }
  `

  console.debug("ParagraphDisplayOurCenters: Data ", data);

  return (
    <CentersWrapper className="my-5">
      <Container>
        <h2 className="text-center mb-5">Our Centers</h2>
        <Row>
          <Col xs={12} md={5} className="centersListHTML">
            <h4>CENTERS AND PRACTICE AREAS</h4>
            <ul className="list-group mb-5">
              {centersListHTML}
            </ul>
          </Col>
          <Col xs={12} md={7} className="centersCard">
            {centersCard}
          </Col>
        </Row>
      </Container>
    </CentersWrapper>
  );
};

export { ParagraphDisplayOurCenters as default, ParagraphDisplayOurCentersProps };
