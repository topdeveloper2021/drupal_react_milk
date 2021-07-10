import React, { useState } from "react";
import Loading from "../Loading";
import { Nav, Navbar } from "react-bootstrap";
import Bundle, { BundleInterface } from "../../DataTypes/Bundle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTh } from "@fortawesome/free-solid-svg-icons";
import {
  faList as lightList,
  faTh as lightTile,
} from "@fortawesome/pro-light-svg-icons";

export interface BundleBrowserProps {
  entityTypeId: string;
  bundleId: string;
  list: Array<BundleInterface>;
  bundleClickHandler: any;
  viewClickHandler: any;
  view_mode: string;
}

export const BundleBrowser = (props: BundleBrowserProps) => {
  const {
    entityTypeId,
    bundleId,
    list,
    bundleClickHandler,
    viewClickHandler,
    view_mode,
  } = props;
  const startingPoint: Array<BundleInterface> = list ?? [];
  const [bundleList, setBundleList] = useState(startingPoint);
  console.debug("BundleList: ", bundleList);
  if (bundleList.length === 0) {
    fetch(
      `/jsonapi/${entityTypeId}_type/${entityTypeId}_type?jsonapi_include=true`
    )
      .then((res) => res.json())
      .then((ajaxData) => {
        const toSet =
          ajaxData.data?.map((item) => {
            return new Bundle(item);
          }) ?? [];
        setBundleList(toSet);
      });
    return <Loading />;
  }
  console.debug("Bundle Browser should have a list now", bundleList);
  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" className={"mb-4"}>
        <Navbar.Brand className={"pr-4"}>
          <h4>{entityTypeId}</h4>
        </Navbar.Brand>
        <Nav
          defaultActiveKey={"bundle-".concat(bundleId)}
          className="mr-auto"
          variant="pills"
          as={"ul"}
        >
          {bundleList.map((item: BundleInterface, key: number) => {
            console.debug("bundle--> Item List -> item", item);
            return (
              <Nav.Item key={key} as={"li"}>
                <Nav.Link
                  id={"bundle-".concat(item.drupal_internal__id)}
                  href={"#bundle-".concat(item.drupal_internal__id)}
                  eventKey={"bundle-".concat(item.drupal_internal__id)}
                  data-id={item.id}
                  data-type={item.type}
                  onClick={bundleClickHandler}
                >
                  {item.label}
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </Nav>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Filter list"
            aria-label="Filter List"
          />
        </form>
        <Nav>
          <Nav.Item>
            <Nav.Link
              eventKey="list"
              onClick={viewClickHandler}
              data-toggle="popover"
              data-placement="top"
              data-content="Show list as text"
              role="button"
              data-value="list"
            >
              <FontAwesomeIcon
                icon={view_mode === "tile" ? faList : lightList}
              />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="tile"
              onClick={viewClickHandler}
              data-toggle="popover"
              data-placement="top"
              data-content="Show list as cards"
              role="button"
              data-value="tile"
            >
              <FontAwesomeIcon icon={view_mode === "tile" ? faTh : lightTile} />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
};

export default BundleBrowser;
