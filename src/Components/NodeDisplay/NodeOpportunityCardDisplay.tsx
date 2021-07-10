import React, { useState } from "react";
import { Badge, Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import NodeOpportunity, {
  NodeOpportunityInterface,
} from "../../DataTypes/NodeOpportunity";
import { TaxonomyTermInterface } from "../../DataTypes/TaxonomyTerm";
import EntityComponentProps from "../../DataTypes/EntityComponentProps";

export interface NodeOpportunityCardProps {
  data: NodeOpportunityInterface;
  view_mode: string;
}

export const NodeOpportunityCardDisplay = (props: NodeOpportunityCardProps) => {
  const { data, view_mode } = props;
  // if you don't have data, go get it
  const DataObject = new NodeOpportunity(data);
  const [nodeData, setNodeData] = useState(DataObject);
  if (!DataObject.hasData()) {
    const ecp = new EntityComponentProps(DataObject);
    ecp
      .getData(DataObject.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const returnedData = new NodeOpportunity(ajaxData.data);
        setNodeData(returnedData);
      });
  }

  const clickHandler = (term) => {
    const params = new URLSearchParams(window.location.hash.replace("#", ""));
    const filter_param = term.type.split("_").slice(-1)[0];
    const newValue = term.machine_name;
    const currentValue = params?.get(filter_param)?.split(",") || [];
    if (!currentValue.includes(newValue)) {
      currentValue.push(newValue);
      params.set(filter_param, currentValue);
      window.location.hash = params;
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  };

  const getBadge = (props: TaxonomyTermInterface, key: number) => {
    if (!props.field_visibility) {
      return;
    }
    return (
      <Badge
        pill
        id={props.id}
        variant={"primary"}
        onClick={() => {
          clickHandler(props);
        }}
        pointer=""
        style={{
          background:
            props.field_tag_color && props.field_tag_color.color
              ? props.field_tag_color.color
              : false,
        }}
      >
        {props.name}
      </Badge>
    );
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );

  console.log("NodeOpportunityCard Data", nodeData);

  return (
    <Card key={nodeData.machine_name}>
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id="button-tooltip">
            <div
              dangerouslySetInnerHTML={{ __html: nodeData.field_body?.value }}
            ></div>
          </Tooltip>
        }
      >
        <Card.Body>
          <Card.Title>{nodeData.title}</Card.Title>

          {nodeData?.field_actions?.map &&
            nodeData?.field_actions?.map(getBadge)}
          {nodeData?.field_focus?.map && nodeData?.field_focus?.map(getBadge)}
          {nodeData?.field_terms?.map && nodeData?.field_terms?.map(getBadge)}
        </Card.Body>
      </OverlayTrigger>
      <Card.Footer className="text-right">
        <Button
          className="mr-sm-2"
          variant="outline"
          href={nodeData?.path?.alias ?? false}
        >
          <span>View more</span>
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default NodeOpportunityCardDisplay;
