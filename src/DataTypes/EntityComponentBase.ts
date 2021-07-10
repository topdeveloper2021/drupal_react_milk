/* eslint no-unused-vars: "off", react/no-unused-state: "off", @typescript-eslint/no-unused-vars: "off", @typescript-eslint/no-explicit-any: "off" */

import React from "react";
import { EntityComponentProps } from "./EntityComponentProps";

export interface EntityComponentState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  key: number;
  attributes: Record<string, unknown>;
}

export default abstract class EntityComponentBase extends React.Component<
  EntityComponentProps,
  EntityComponentState
> {
  ecp: EntityComponentProps;

  include?: string;

  constructor(props: EntityComponentProps) {
    super(props);
    this.ecp = new EntityComponentProps(props);
    this.state = {
      loading: false,
      loaded: this.ecp.hasData(),
      error: false,
      key: props.key,
      attributes: { ...props },
    };
    this.getDataForComponent = this.getDataForComponent.bind(this);
  }

  componentDidUpdate(
    prevProps: Readonly<Record<string, unknown>>,
    prevState: Readonly<Record<string, unknown>>,
    snapshot?: Record<string, unknown>
  ): void {
    const { loading, loaded, open } = this.state;
    if (loading === false && loaded === false && open === true) {
      // eslint-disable-next-line
      console.log("now, get data for component");
      this.getDataForComponent(this.include);
    }
  }

  getDataForComponent(include: string): void {
    // eslint-disable-next-line
    console.debug("get data for component firing!", this);
    // eslint-disable-next-line
    const me = this;
    this.setState({ loading: true });
    this.ecp
      .getData(include)
      .then((res) => res.json())
      .then((ajaxData) => {
        // eslint-disable-next-line
        console.debug("ajax data back from remote", ajaxData);
        me.setState({
          loading: false,
          loaded: true,
          attributes: ajaxData?.data,
        });
      });
  }

  render(): React.ReactNode {
    return "Override the render function to implement";
  }
}
