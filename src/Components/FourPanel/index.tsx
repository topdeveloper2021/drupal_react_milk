import React from "react";
import EntityComponentBase, {
  EntityComponentState,
} from "../../DataTypes/EntityComponentBase";
import { EntityComponentPropsInterface } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import { Card, Col } from "react-bootstrap";
import moment from "moment";
import styled from "styled-components";

interface FourPanelViewObjectInterface {
  title: string;
  uuid: string;
  bundle: string;
  field_topics: string;
  changed: string;
  view_node: string;
  field_background_image: string;
}

interface FourPanelProps extends EntityComponentPropsInterface {
  items: Array<FourPanelViewObjectInterface>;
}

const StyledLink = styled.a`
  border: 1px solid orange;
`;

class FourPanel extends EntityComponentBase<
  FourPanelProps,
  EntityComponentState
> {
  componentDidMount() {
    const me = this;
    if (!this.state.loaded && !this.state.loading) {
      me.setState({ loading: true });
      //GET http://localhost:8080/api/v1.0/four-from-topics-taxonomy?_format=json
      fetch("/api/v1.0/four-from-topics-taxonomy?_format=json")
        .then((res) => res.json())
        .then((ajaxData: Array<FourPanelViewObjectInterface>) => {
          console.log("data is back from drupal. Setting state ", ajaxData);
          me.setState({
            loaded: true,
            loading: false,
            attributes: {
              items: ajaxData,
            },
          });
        });
    }
  }

  render() {
    if (this.state.loaded) {
      return this.state.attributes.items.map(
        (item: FourPanelViewObjectInterface, key: number) => {
          const created = moment(item.changed, moment.ISO_8601);
          return (
            <Col lg={3} sm={6} key={key}>
              <Card className="my-5">
                <Card.Img
                  id={"card-image-".concat(item.uuid)}
                  src={item.field_background_image}
                />
                <Card.Body style={{ minHeight: "150px" }}>
                  <Card.Title>
                    <StyledLink href={item.view_node}>{item.title}</StyledLink>
                  </Card.Title>
                </Card.Body>
                <Card.Footer>{created.format("MMMM D, YYYY")}</Card.Footer>
              </Card>
            </Col>
          );
        }
      );
    }
    return <Loading />;
  }
}

export default FourPanel;
