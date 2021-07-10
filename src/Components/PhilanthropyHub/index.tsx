import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PhilanthropyHubSource from "./PhilanthropyHubSource";
import DropdownFacet from "./DropdownFacet";
import HorizontalMenuFacet from "./HorizontalMenuFacet";
import { ListComponentSourceInterface } from "../../DataTypes/ListSource";
import NodeOpportunityCardDisplay from "../NodeDisplay/NodeOpportunityCardDisplay";

export interface PhilanthropyHubProps {
  source: ListComponentSourceInterface;
  view_mode: string;
}

export const PhilanthropyHub: React.FunctionComponent = (
  props: PhilanthropyHubProps
) => {
  console.debug("Philanthropy Hub", props);
  const { source, view_mode } = props;
  const DataSource = new PhilanthropyHubSource(source);
  const [sourceData, setSourceData] = useState(DataSource);

  sourceData.onHashChangedCallback = (itemList) => {
    console.debug("back from all calls", itemList);
    const clone = new PhilanthropyHubSource(sourceData.toObject());
    clone.items = itemList;
    console.debug("Datasource Cloned", clone);
    setSourceData(clone);
  };

  useEffect(() => {
    sourceData.onHashChanged();
    window.addEventListener("hashchange", DataSource.onHashChanged);
    return () =>
      window.removeEventListener("hashchange", DataSource.onHashChanged);
  }, [window.location.hash]);

  return (
    <Container fluid id={"hub-".concat(props.id)}>
      <DropdownFacet
        type="taxonomy_term--ph_region"
        id={sourceData.id.concat("-region")}
        label="Region"
        urlParam="ph_region"
        field="field_region"
        url="/jsonapi/taxonomy_term/ph_region?jsonapi_include=true"
        titleSubject="Opportunities"
        titleValuesToEnablePostfix={["All", "Global"]}
        titleConjunction="in"
        allOptionTitle="All"
      />

      <Container className="filter-horizontal py-3 py-5@m">
        <Row className="d-flex justify-content-md-center">
          <Col>
            <HorizontalMenuFacet
              url="/jsonapi/taxonomy_term/ph_focus?jsonapi_include=true"
              id={sourceData.id.concat("-field_focus")}
              type="taxonomy_term--ph_focus"
              label="Focus"
              urlParam="ph_focus"
              field="field_focus"
            />
          </Col>
          <Col>
            <HorizontalMenuFacet
              url="/jsonapi/taxonomy_term/ph_actions?jsonapi_include=true"
              id={sourceData.id.concat("-field_actions")}
              type="taxonomy_term--ph_actions"
              label="Actions"
              urlParam="ph_actions"
              field="field_actions"
            />
          </Col>
        </Row>
      </Container>

      <div id="philanthropy-hub-root">
        {sourceData.items.map((item, key) => {
          return <NodeOpportunityCardDisplay data={item} view_mode="card" />;
        })}
      </div>
    </Container>
  );
};

PhilanthropyHub.defaultProps = {
  source: PhilanthropyHubSource.getDefaultSource(),
  view_mode: "card",
};

export default PhilanthropyHub;
