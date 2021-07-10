import React from "react";
import Loading from "../Loading";
import { CardDeck, CardColumns, Container } from "react-bootstrap";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import EntityBrowserSource from "./EntityBrowserSource";
import EntityComponentFactory from "./EntityComponentFactory";
import BundleBrowser from "./BundleBrowser";

export interface EntityBrowserProps {
  source: EntityBrowserSource;
}

export interface EntityBrowserState {
  source: EntityBrowserSource;
  view_mode: string;
  loading: boolean;
  loaded: boolean;
}

export class EntityBrowser extends React.Component<
  EntityBrowserProps,
  EntityBrowserState
> {
  static defaultProps = {
    view_mode: "tile",
  };

  constructor(props) {
    super(props);
    const { source, view_mode } = props;
    if (!Array.isArray(source.items)) {
      source.items = [];
    }
    this.state = {
      source: new EntityBrowserSource(source),
      view_mode: view_mode,
      loading: false,
      loaded: false,
    };
    this.getItemList = this.getItemList.bind(this);
    this.viewOnClickHandler = this.viewOnClickHandler.bind(this);
    this.bundleNavOnClickHandler = this.bundleNavOnClickHandler.bind(this);
  }

  componentDidMount() {
    const { source } = this.state;
    if (!source.hasData()) {
      this.setState({ loading: true, loaded: false });
      source.refresh().then((sourceWithItems) => {
        const toSet = new EntityBrowserSource(sourceWithItems);
        this.setState({ loading: false, loaded: true, source: toSet });
      });
      return <Loading />;
    }
  }

  viewOnClickHandler(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this.setState({ view_mode: evt.currentTarget.dataset.value });
  }

  bundleNavOnClickHandler(evt) {
    if (evt) {
      evt.preventDefault();
    }
    console.debug("Click Event Handler:", evt);
    console.debug("BundleBrowserOnClickHandlerView", evt.currentTarget);
  }

  render() {
    const { source, loading } = this.state;
    if (loading === true) {
      return <Loading />;
    }
    return (
      <Container fluid={true}>
        <h2 className={"text-center visually-hidden"}>
          Browse {source.bundle}
        </h2>
        <ErrorBoundary>
          {source.bundle ? (
            <BundleBrowser
              bundleId={source.bundle}
              entityTypeId={source.entityTypeId}
              bundleClickHandler={this.bundleNavOnClickHandler}
              viewClickHandler={this.viewOnClickHandler}
            />
          ) : (
            ""
          )}
        </ErrorBoundary>
        <ErrorBoundary>
          <CardColumns className="text-align-center">
            {this.getItemList()}
          </CardColumns>
        </ErrorBoundary>
      </Container>
    );
  }

  getItemList() {
    const { source, view_mode } = this.state;
    if (source.items.length >= 1) {
      return source.items?.map((item, key) => {
        const Component = EntityComponentFactory(item);
        return <Component data={item} key={key} view_mode={view_mode} />;
      });
    }
    return [];
  }
}

export default EntityBrowser;
