import React, {useState} from "react";
import { Col, Row, Container } from "react-bootstrap";
import * as DataObject from "../../DataTypes/ParagraphPeople";
import styled from "styled-components";
import Loading from "../Loading";
import ListDisplay from "../ListDisplay";
import {DrupalJsonApiParams} from 'drupal-jsonapi-params';
import Staff from "../../DataTypes/People/Staff";

interface ParagraphDisplayPeopleProps {
  data: DataObject.default;
  view_mode: string;
}

const ParagraphDisplayPeople: React.FunctionComponent = (
  props: ParagraphDisplayPeopleProps
) => {

  const { data } = props;

  console.debug("ParagraphDisplayPeople: Data ", data);

  const [peopleList, setPeopleList] = useState(null);
  const [fetchRan, setFetchRan] = useState(false);

  let ArrayPersonsObject = [];

  if(!fetchRan) {
    fetch(data.content_list_query)
    .then((res) => res.json())
    .then((incoming) => {
      incoming.data.map(
        person => {
          ArrayPersonsObject.push(new Staff(person));
        }
      )
      setPeopleList(ArrayPersonsObject);
      setFetchRan(true);
      console.debug("ParagraphDisplayPeople: ArrayPersonData ", peopleList);
    });
  }

  const PeopleContainer = styled.div`
    background-color: #e3e8eb;

    & a:hover{
      background-color: #FFFFFF;
    }
    @media screen and (min-width: 1200px){
      font-size: 1.25em;
    }

    & .text-align-center h1 {
      font-size: 2em;
      font-family: 'LatoWebBold';
    }
  `;

  if (!fetchRan) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <PeopleContainer className="container-fluid p-5">
      {
        (typeof(data.field_section_header) === "string") ? 
          <Row>
            <Col className="text-align-center pb-5">
              <h1>
                {data.field_section_header}
              </h1>
            </Col>
          </Row>
        :''
      }
      <Row>
        <ListDisplay
          id={"tiles-list-".concat(data.id)}
          list={peopleList}
          view_mode={data.field_view_mode}
        />
      </Row>
    </PeopleContainer>
  );
};

export { ParagraphDisplayPeople as default, ParagraphDisplayPeopleProps };
