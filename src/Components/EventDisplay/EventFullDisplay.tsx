import React from "react";
import { Container } from "react-bootstrap";
import { EventDataFactory } from "./EventDataFactory";
import EntityComponentProps from "../../DataTypes/EntityComponentProps";
import { EventHero } from "./EventHero";
import Loading from "../Loading";
import {
  Event as EventDataObject,
  EventInterface,
} from "../../DataTypes/Event";
import ParagraphTabsDisplay from "../ParagraphTabsDisplay";
import ErrorBoundary from "../../Utility/ErrorBoundary";

if (String.ucWords === undefined) {
  String.prototype.ucWords = function () {
    const str = this.toLowerCase();
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function (s) {
      return s.toUpperCase();
    });
  };
}

export interface EventFullDisplayProps {
  data: EventInterface;
  view_mode: string;
  can_edit: boolean;
}

export interface EventFullDisplayState {
  data: EventInterface;
  view_mode: string;
  can_edit: boolean;
  loading: boolean;
  loaded: boolean;
  is_editing: boolean;
  schema: unknown;
}

export class EventFullDisplay extends React.Component<
  EventFullDisplayProps,
  EventFullDisplayState
> {
  constructor(props) {
    super(props);
    const DataObject = EventDataFactory(props.data);
    console.debug("EventFullDisplay => Constructor", props);
    this.state = {
      data: DataObject,
      view_mode: props.view_mode,
      can_edit: Boolean(props.can_edit),
      loading: false,
      loaded: DataObject.hasData(),
      is_editing: false,
      schema: {},
    };
    this.editButtonOnClickHandler = this.editButtonOnClickHandler.bind(this);
    this.getDataObject = this.getDataObject.bind(this);
  }

  getDataObject(): EventDataObject {
    let DataObject = this.state.data;
    if (DataObject.hasData === undefined) {
      DataObject = EventDataFactory(DataObject);
    }
    return DataObject;
  }

  componentDidMount() {
    const DataObject = this.getDataObject();
    const { loading, loaded } = this.state;
    if (!DataObject.hasData() && !loading && !loaded) {
      this.setState({ loading: true, loaded: false });
      const ecp = new EntityComponentProps(DataObject);
      ecp
        .getData(DataObject.getIncluded())
        .then((res) => res.json())
        .then((ajaxData) => {
          const resultData = EventDataFactory(ajaxData.data);
          this.setState({ data: resultData, loaded: true, loading: false });
        });
    }
  }

  editButtonOnClickHandler(evt: Event) {
    console.debug("editButtonOnClickHandler", evt.currentTarget.dataset);
  }

  /**
   * Main Render
   */
  render() {
    console.debug("EventFullDisplay => Render", this.state);
    const { data, can_edit, loading, loaded, is_editing } = this.state;

    if (loading === true) {
      return <Loading />;
    }
    if (loaded === true) {
      console.debug("Event should have data now:", data);
      return (
        <>
          <Container fluid={true} style={{ position: "relative" }}>
            <EventHero data={data.field_hero_image} can_edit={can_edit} />
            <ErrorBoundary>
              <ParagraphTabsDisplay
                content={data.field_content_tabs}
                can_edit={can_edit}
              />
            </ErrorBoundary>
          </Container>
        </>
      );
    }
    return <div data-prerender="true"></div>;
  }
}

export default EventFullDisplay;
