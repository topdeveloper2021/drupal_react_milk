import React from "react";
import { Form, FormControl, Nav, Navbar } from "react-bootstrap";
import Loading from "../Loading";
import JSONApiUrl from "../../DataTypes/JSONApiUrl";

interface ListBundleBrowserProps {
  entityTypeId: string;
  bundle: string;
  bundleTypes?: Array<ListBundle>;
  url: JSONApiUrl;
}

interface ListBundleBrowserState {
  loading: boolean;
  loaded: boolean;
  entityTypeId: string;
  bundleTypes: Array<ListBundle>;
}

interface ListBundle {
  type: string;
  id: string;
  langcode: string;
  status: boolean;
  dependencies: Array<any>;
  drupal_internal__id: string;
  label: string;
  description: string;
  source: string;
  queue_thumbnail_downloads: boolean;
  new_revision: boolean;
  source_configuration: object;
  field_map: object;
}

class ListBundleBrowser extends React.Component<
  ListBundleBrowserProps,
  ListBundleBrowserState
> {
  static defaultProps = {
    loading: false,
    loaded: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading,
      loaded: props.loaded,
      entityTypeId: props.entityTypeId,
      bundleTypes: [],
    };
    this.navbarLinks = this.navbarLinks.bind(this);
  }

  componentDidMount() {
    if (!this.loading && !this.loaded) {
      const self = this;
      self.setState({
        loading: true,
      });
      fetch(
        `/jsonapi/${this.props.entityTypeId}_type/${this.props.entityTypeId}_type/?jsonapi_include=true`
      )
        .then((res) => res.json())
        .then((ajaxData) => {
          self.setState({
            loading: false,
            loaded: true,
            bundleTypes: ajaxData.data,
          });
        });
    }
  }

  render() {
    if (this.state.loaded) {
      return (
        <Navbar>
          <Navbar.Brand className="display-1 pr-2">
            {this.state.entityTypeId}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {this.navbarLinks(this.state.bundleTypes)}
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Filter"
                className="mr-sm-2"
              />
            </Form>
          </Navbar.Collapse>
        </Navbar>
      );
    } else if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <>
          <h1>No Data</h1>
        </>
      );
    }
  }

  navbarLinks(bundleTypes: Array<ListBundle>) {
    return bundleTypes.map((bundle: ListBundle, key: number) => {
      return (
        <>
          <Nav.Link key={key}>{bundle.label}</Nav.Link>
        </>
      );
    });
  }
}

export {
  ListBundleBrowser as default,
  ListBundleBrowserProps,
  ListBundleBrowserState,
  ListBundle,
};
