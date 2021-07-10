import React, { useState } from "react";
import ParagraphProgramDay, {
  ParagraphProgramDayInterface,
} from "../../DataTypes/ParagraphProgramDay";
import Loading from "../Loading";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { NodeSessionInterface } from "../../DataTypes/NodeSession";
import NodeDisplayList from "../NodeDisplay/NodeDisplayList";
import ErrorDisplay from "../../Utility/ErrorDisplay";
import Listable, { ListableInterface } from "../../DataTypes/Listable";
import DateParts from "../../Utility/DateParts";

export interface ParagraphDisplayProgramDayProps {
  data: ParagraphProgramDayInterface;
  view_mode: string;
  key?: number;
  list: Array<NodeSessionInterface>;
}

export interface ParagraphDisplayProgramDayState {
  data: ParagraphProgramDay;
  list: Array<NodeSessionInterface>;
  errors: Array<Error>;
  loading: boolean;
  loaded: boolean;
}

export class ParagraphDisplayProgramDay extends React.Component<
  ParagraphDisplayProgramDayProps,
  ParagraphDisplayProgramDayState
> {
  static defaultProps = {
    list: [],
    data: {},
    errors: [],
    loaded: false,
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      list: props.list,
      loaded: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { data } = this.props;
    const { list, loading, loaded } = this.state;
    const DataObject = new ParagraphProgramDay(data);
    if (list.length === 0 && !loading && !loaded) {
      console.debug("List has no data... querying", this.state);
      const apiParams = new DrupalJsonApiParams();
      const eventDate = DataObject.getDateObject()
        .toISOString()
        .split("T")
        .shift();
      apiParams.addInclude(["field_livestream", "field_people", "field_event"]);
      apiParams.addFilter(
        "field_event.field_grid_event_id",
        DataObject.field_grid_event_id
      );
      apiParams.addFilter("field_start_end.value", eventDate, "STARTS_WITH");
      console.debug("Query Params:", apiParams.getQueryObject());
      apiParams.addSort("field_start_end.value", "asc");
      this.setState({ loading: true });
      fetch(
        "/jsonapi/node/session?jsonapi_include=true&".concat(
          apiParams.getQueryString()
        )
      )
        .then((res) => res.json())
        .then((ajaxData) => {
          console.debug("back from ajax", ajaxData);
          const toReturn = {
            errors: [],
            loading: false,
            loaded: true,
          };
          if (ajaxData.errors) {
            toReturn.errors.concat(
              ajaxData.errors.map((item) => {
                return new Error(item.detail);
              })
            );
          }
          if (ajaxData.data.length === 0) {
            toReturn.errors.push(Error("no session data"));
          }
          if (Array.isArray(ajaxData.data)) {
            toReturn.list = ajaxData.data;
          }
          this.setState(toReturn);
        })
        .catch((reason) => {
          const { errors } = this.state;
          errors.push(new Error(reason));
          this.setState({ errors: errors });
        });
    }
  }
  render() {
    const { data, key, view_mode } = this.props;
    const { list, errors } = this.state;
    const DataObject = new ParagraphProgramDay(data);
    console.debug("Data Object:", DataObject);
    if (list.length === 0) {
      return <Loading />;
    }

    if (errors.length) {
      return errors.map((item, key) => <ErrorDisplay error={item} key={key} />);
    }

    const listable = new Listable({
      id: "",
      items: list,
    });
    // TODO: make this a datatype
    const dateParts = DateParts(data.field_program_date);
    console.debug("date parts", dateParts);
    return (
      <div key={key}>
        <h3>
          <strong className="display-4">{dateParts.day}</strong>
          &nbsp;
          {dateParts.month}&nbsp;-&nbsp;
          <small className="text-muted">{dateParts.year}</small>
        </h3>
        <NodeDisplayList list={listable} view_mode={view_mode} />
      </div>
    );
  }
}

export default ParagraphDisplayProgramDay;
