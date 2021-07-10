import React from "react";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import Paginator from "./Paginator";
import LinkList from "../../DataTypes/LinkList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JSONApiUrl from "../../DataTypes/JSONApiUrl";
import {
  faBars,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";

interface PodcastBrowserNavbarProps {
  links: LinkList;
  replaceURLClickHandler: any;
  changeUrlClickHandler: any;
  currentURL: JSONApiUrl;
}

const PodcastBrowserNavbar: React.FunctionComponent = (
  props: PodcastBrowserNavbarProps
) => {
  const currentUrl = props.currentURL.clone();
  const currentSortDirection = currentUrl.query.get(
    "sort[sort-name-episode][direction]"
  );
  console.debug("Current Sort Direction", currentSortDirection);
  const icon = currentSortDirection == "DESC" ? faSortDown : faSortUp;
  const sortPhrase =
    currentSortDirection == "DESC" ? "Sort Descending" : "Sort Ascending";
  const newSortDirection = currentSortDirection == "DESC" ? "ASC" : "DESC";

  return (
    <Navbar className={"navbar-light bg-light"} expand={"lg"}>
      <a className="navbar-brand" href="#">
        Podcasts
      </a>
      <Navbar.Toggle
        data-target="#podcast-browser-navbar"
        aria-controls="podcast-browser-navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <FontAwesomeIcon
          icon={faBars}
          size={"2x"}
          style={{
            fontSize: "1em",
            fontWeight: "lighter",
          }}
        />
      </Navbar.Toggle>
      <Navbar.Collapse
        style={{ position: "relative" }}
        className={"justify-content-end"}
      >
        <Nav className="mx-auto">
          <Paginator
            clickHandler={props.replaceURLClickHandler}
            links={props.links}
          />
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Filter" className="mr-sm-2" />
          <Button
            className="mr-sm-2"
            onClick={props.changeUrlClickHandler}
            variant="outline-success"
            data-jsonapi-query-property={"sort[sort-name-episode][direction]"}
            data-jsonapi-query-value={newSortDirection}
          >
            <span>{sortPhrase}</span>
            <FontAwesomeIcon
              icon={icon}
              size={"2x"}
              style={{
                fontSize: "1em",
                fontWeight: "lighter",
              }}
            >
              <h5>RE-SORT</h5>
            </FontAwesomeIcon>
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PodcastBrowserNavbar;
