import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import NodeLandingPage from "DataTypes/NodeLandingPage";
import ParagraphDisplayList from "Components/ParagraphDisplay/ParagraphDisplayList";
import MenuDisplay from "../../MenuDisplay";

export interface NodeDisplayLandingPageFullProps {
  data: NodeLandingPage;
  can_edit: boolean;
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;

  & .paragraph-body-content {
    padding-top: 3.5em;
    padding-bottom: 3em;
  }
`;

export const NodeDisplayLandingPageFull = (props) => {
  const { data, can_edit } = props;
  console.debug("LandingPageData.items => ", data);

  let secondaryMenuData = 
    (
      data.field_secondary_menu?.status !== null && 
      data.field_secondary_menu?.status !== undefined && 
      data.field_secondary_menu?.status === true 
    ) ? 
    {
      menu_id: data.field_secondary_menu?.drupal_internal__id,
      menu_label: data.field_secondary_menu?.label,
    }
    : false;

  if ( !!secondaryMenuData && !!document.querySelector("milken-menu-main") ) {
    ReactDOM.render(
      <MenuDisplay 
      data={secondaryMenuData}/>,
      document.querySelector("milken-menu-main")
    );
  }

  return (
    <>
      <Container>
        <ParagraphDisplayList list={data.field_content} can_edit={can_edit} />
      </Container>
    </>
  );
};

export default NodeDisplayLandingPageFull;
